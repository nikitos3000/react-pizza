import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setcategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setcategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
