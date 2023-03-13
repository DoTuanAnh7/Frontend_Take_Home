import {createSlice} from '@reduxjs/toolkit';
import {login, register, updateUser, getUser} from './actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      loading: false,
      result: {},
      error: undefined,
    },

    register: {
      loading: false,
      result: {},
      error: undefined,
    },

    updateUser: {
      loading: false,
      result: {},
      error: undefined,
    },

    getUser: {
      loading: false,
      result: {},
      error: undefined,
    },
  },
  reducers: {},
  extraReducers: {
    //login
    [login.pending]: (state, action) => {
      state.login.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.login.loading = false;
      state.login.result = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },

    //register
    [register.pending]: (state, action) => {
      state.register.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.register.loading = false;
      state.register.result = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.register.loading = false;
      state.register.error = action.payload;
    },

    //update user

    [updateUser.pending]: (state, action) => {
      state.updateUser.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateUser.loading = false;
      state.updateUser.result = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.updateUser.loading = false;
      state.updateUser.error = action.payload;
    },

    //update user
    [getUser.pending]: (state, action) => {
      state.getUser.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.getUser.loading = false;
      state.getUser.result = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.getUser.loading = false;
      state.getUser.error = action.payload;
    },
  },
});

export const auth = state => state.auth;

export default authSlice.reducer;
