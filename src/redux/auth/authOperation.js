import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://petly-bc26.cyclic.app/';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const registerUser = createAsyncThunk(
  'auth/registerUser ',
  async (user, thunkApi) => {
    try {
      const response = await axios.post('/api/users/signup', user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      // console.log({
      //   error: error.response.data.details.message,
      //   massege: error.response.data.message,
      // });
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.data?.message || error.response.data?.details[0].message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkApi) => {
    try {
      const response = await axios.post('/api/users/login', user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, thunkApi) => {
    try {
      const response = await axios.post('/api/users/logout');
      clearAuthHeader();
      console.log('LOGOUT', response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;

    setAuthHeader(persistedToken);

    if (persistedToken === null) {
      return thunkApi.rejectWithValue(null);
    }

    try {
      const response = await axios.get('/api/usersinfo');
      console.log('getUser', response.data);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const editUser = createAsyncThunk(
  'auth/editUser',
  async (user, thunkApi) => {
    try {
      // console.log(user);
      const response = await axios.patch(`/api/usersinfo/update`, user);
      console.log('editUser', response.data);
      // setAuthHeader(response.data.token);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.status);
    }
  }
);
