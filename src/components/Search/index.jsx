import React from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

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
          alt="clear"
        />
      )}
    </div>
  );
};
export default Search;
