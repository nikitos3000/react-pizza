import React from 'react';
import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  function clear() {
    setSearchValue('');
  }
  return (
    <div className={styles.search}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.root}
        placeholder="Поиск....."
      />
      {searchValue && (
        <img
          onClick={clear}
          width={17}
          height={17}
          className={styles.clear}
          src="/img/krest.png"
          alt=""
        />
      )}
    </div>
  );
};
export default Search;
