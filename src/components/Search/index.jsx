import React from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';
import { debounce } from 'lodash';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const ref = React.useRef();
  function clear() {
    setValue('');
    setSearchValue('');
    ref.current.focus();
  }

  const updateSearch = React.useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearch(e.target.value);
  };
  return (
    <div className={styles.search}>
      <input
        ref={ref}
        value={value}
        onChange={onChangeInput}
        className={styles.root}
        placeholder="Поиск....."
      />
      {value && (
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
