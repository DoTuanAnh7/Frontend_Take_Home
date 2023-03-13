import {createSlice} from '@reduxjs/toolkit';
import {getProducts, addProduct} from './actions';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {
      loading: false,
      result: {},
      error: undefined,
    },

    addProduct: {
      loading: false,
      result: {},
      error: undefined,
    },
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state: any, action) => {
      state.product.loading = true;
    },
    [getProducts.fulfilled]: (state: any, action) => {
      state.product.loading = false;
      state.product.result = action.payload;
    },
    [getProducts.rejected]: (state: any, action) => {
      state.product.loading = false;
      state.product.error = action.payload;
    },

    [addProduct.pending]: (state: any, action) => {
      state.addProduct.loading = true;
    },
    [addProduct.fulfilled]: (state: any, action) => {
      state.addProduct.loading = false;
      state.addProduct.result = action.payload;
    },
    [addProduct.rejected]: (state: any, action) => {
      state.addProduct.loading = false;
      state.addProduct.error = action.payload;
    },
  },
});

export const product = (state: any) => state.product;

export default productSlice.reducer;
