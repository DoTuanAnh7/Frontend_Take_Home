import {createAsyncThunk} from '@reduxjs/toolkit';
import Config from '../../../config';
import {getApi, postApi} from '../api';
import {GET_PRODUCTS, ADD_PRODUCTS} from './types';

const apiUrl = Config.API_URL;

export const getProducts = createAsyncThunk(
  GET_PRODUCTS,
  async (params: any, {rejectWithValue}) => {
    try {
      const endpoint = `${apiUrl}/products`;
      const {data} = await getApi(endpoint, params.data);
      if (params.onResponse) {
        params.onResponse(data);
      }
      return data;
    } catch (err) {
      const {data} = err.response;
      if (params.onError) {
        params.onError(data);
      }
      return rejectWithValue(data);
    }
  },
);

export const addProduct = createAsyncThunk(
  ADD_PRODUCTS,
  async (params: any, {rejectWithValue}) => {
    console.log('params', params);
    
    try {
      const endpoint = `${apiUrl}/products`;
      const {data} = await postApi(endpoint, params.data);
      if (params.onResponse) {
        params.onResponse(data);
      }
      return data;
    } catch (err) {
      const {data} = err.response;
      if (params.onError) {
        params.onError(data);
      }
      return rejectWithValue(data);
    }
  },
);
