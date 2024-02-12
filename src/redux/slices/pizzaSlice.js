import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  status: 'loading',
};

export const fetchPizza = createAsyncThunk('pizza/fetchPizza', async function (params, thunkApi) {
  const { sortBy, categoryId, search, sortType } = params;
  const response = await axios.get(
    `https://657998921acd268f9af9769e.mockapi.io/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&${search}&sortBy=${sortBy}&order=${sortType.sort.includes('-') ? 'asc' : 'desc'}`,
  );
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
    builder.addCase(fetchPizza.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = 'failed';
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
