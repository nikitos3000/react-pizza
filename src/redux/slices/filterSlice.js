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
  },
});

export const { setcategoryId } = filterSlice.actions;

export default filterSlice.reducer;
