import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setcategoryId, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { filters } from '../components/Sort';
import { fetchPizza } from '../redux/slices/pizzaSlice';

const Home = () => {
  const items = useSelector((state) => state.pizza.items);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onClickCategories = (id) => {
    dispath(setcategoryId(id));
  };
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  console.log(11, items);
  const search = searchValue ? `search=${searchValue}` : '';
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const ssort = filters.find((obj) => obj.sort === params.sort);
      dispath(
        setFilters({
          ...params,
          ssort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  async function getPizza() {
    const sortBy = sortType.sort.replace('-', '');
    setIsLoading(true);
    try {
      dispath(
        fetchPizza({
          sortBy,
          categoryId,
          search,
          sortType,
        }),
      );
    } catch (error) {
      console.log(error);
      alert('err');
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizza();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        sortProperty: sortType.sort,
        categoryId,
      });
      navigate(`?${querryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => onClickCategories(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((obj) =>
          isLoading ? (
            <Skeleton />
          ) : (
            <Pizza
              key={obj.id}
              id={obj.id}
              title={obj.title}
              price={obj.price}
              imgUrl={obj.imageUrl}
              sizes={obj.sizes}
              types={obj.types}
            />
          ),
        )}
      </div>
      <Pagination />
    </div>
  );
};
export default Home;
