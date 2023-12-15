import React from 'react';

function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((r, i) => (
          <li onClick={() => onClickCategory(i)} key={i} className={value === i ? 'active' : ''}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
