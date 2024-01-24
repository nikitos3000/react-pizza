import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  items: [],
};

export const fetchPizza = createAsyncThunk('pizza/fetchPizza', async function (params) {
  const { sortBy, categoryId, search, sortType } = params;
  const response = await axios.get(
    `https://657998921acd268f9af9769e.mockapi.io/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&${search}&sortBy=${sortBy}&order=${sortType.sort.includes('-') ? 'asc' : 'desc'}`,
  );
  console.log(response.data);
  return response.data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      console.log(state);
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      console.log(state);
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      console.log(state);
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
