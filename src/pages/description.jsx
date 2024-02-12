import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const Description = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  console.log(pizza);
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://657998921acd268f9af9769e.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert(error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{id}</h2>

      <p>{pizza.title}</p>
      <h4>{pizza.price}</h4>
    </div>
  );
};
export { Description };
