import React from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories.tsx";
import Sort from "../components/Sort.tsx";
import Pizza from "../components/Pizza/index.tsx";
import Skeleton from "../components/Pizza/Skeleton.tsx";
import Pagination from "../components/Pagination/index.tsx";
import { setcategoryId, setFilters } from "../redux/slices/filterSlice.ts";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { filters } from "../components/Sort.tsx";
import { fetchPizza } from "../redux/slices/pizzaSlice.ts";
import { RootState, useAppDispath } from "../redux/store.ts";

const Home: React.FC = () => {
  const searchValue = useSelector((state: RootState) => state.filter.search);
  const items = useSelector((state: RootState) => state.pizza.items);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector(
    (state: {
      filter: {
        sort;
      };
    }) => state.filter.sort
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const dispath = useAppDispath();
  const navigate = useNavigate();
  const onClickCategories = React.useCallback((id: number) => {
    dispath(setcategoryId(id));
  }, []);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const search = searchValue ? `search=${searchValue}` : "";
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const ssort = filters.find((obj) => obj.sort === params.sort);
      dispath(
        setFilters({
          ...params,
          ssort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  async function getPizza() {
    const sortBy = sortType.sort.replace("-", "");
    setIsLoading(true);
    try {
      dispath(
        fetchPizza({
          sortBy,
          categoryId,
          search,
          sortType,
        })
      );
    } catch (error) {
      console.log(error);
      alert("err");
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
        <Categories value={categoryId} onClickCategory={onClickCategories} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((obj: any) =>
          isLoading ? (
            <Skeleton />
          ) : (
            <Pizza
              id={obj.id}
              title={obj.title}
              price={obj.price}
              imgUrl={obj.imageUrl}
              sizes={obj.sizes}
              types={obj.types}
            />
          )
        )}
      </div>
      <Pagination />
    </div>
  );
};
export default Home;
