import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import pizzas from '../assets/pizza.json';

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  console.log(2);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((obj) =>
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
    </div>
  );
};
export default Home;
