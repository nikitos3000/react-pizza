import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice.ts";

type TypeFilters = {
  name: string;
  sort: string;
};

export const filters: TypeFilters[] = [
  { name: "популярности ↓", sort: "rating" },
  { name: "цене ↓", sort: "price" },
  { name: "алфавиту ↓", sort: "title" },
  { name: "популярности ↑", sort: "-rating" },
  { name: "цене ↑", sort: "-price" },
  { name: "алфавиту ↑", sort: "-title" },
];

function Sort() {
  const dispath = useDispatch();
  const value = useSelector(
    (state: {
      filter: {
        sort: {
          name: string;
          sort: string;
        };
      };
    }) => state.filter.sort
  );
  const [sorts, setSorts] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const onClickSort = () => {
    setSorts(!sorts);
  };

  const selectFilter = (obj: TypeFilters) => {
    dispath(setSort(obj));
    setSorts(false);
  };

  React.useEffect(() => {
    const clickOutside = (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setSorts(false);
      }
    };
    document.body.addEventListener("click", clickOutside);

    return () => document.body.removeEventListener("click", clickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onClickSort}>{value.name}</span>
      </div>
      {sorts && (
        <div className="sort__popup">
          <ul>
            {filters.map((obj, i) => (
              <li
                key={i}
                onClick={() => selectFilter(obj)}
                className={value.sort === obj.sort ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Sort;
