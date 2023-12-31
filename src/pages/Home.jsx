import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setcategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataPizza, setDataPizza] = React.useState([]);
  const dispath = useDispatch();
  const onClickCategories = (id) => {
    dispath(setcategoryId(id));
  };

  const search = searchValue ? `search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://657998921acd268f9af9769e.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&${search}&sortBy=${sortType.sort.replace('-', '')}&order=${
        sortType.sort.includes('-') ? 'asc' : 'desc'
      }`,
    )
      .then((data) => data.json())
      .then((res) => {
        setDataPizza(res);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => onClickCategories(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {dataPizza.map((obj) =>
          isLoading ? (
            <Skeleton />
          ) : (
            <Pizza
              key={obj.id}
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
