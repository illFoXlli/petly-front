import { createSlice } from '@reduxjs/toolkit';

import {
  refreshUser,
  loginUser,
  logOutUser,
  registerUser,
  editUser,
} from './authOperation';

const userInitialState = {
  user: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    city: '',
    phone: '',
  },
  token: null,
  isLoading: false,
  error: null,
};

const pendingHandlerAuth = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const rejectedHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',

  initialState: userInitialState,

  reducers: {
    changeUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, pendingHandlerAuth);
    builder.addCase(registerUser.rejected, rejectedHandler);
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(loginUser.pending, pendingHandlerAuth);
    builder.addCase(loginUser.rejected, rejectedHandler);
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(logOutUser.pending, pendingHandlerAuth);
    builder.addCase(logOutUser.rejected, rejectedHandler);
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = {};
      state.token = null;
    });

    builder.addCase(refreshUser.pending, pendingHandlerAuth);
    builder.addCase(refreshUser.rejected, rejectedHandler);
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(editUser.pending, pendingHandlerAuth);
    builder.addCase(editUser.rejected, rejectedHandler);
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      // state.user = {};
      state.token = null;
    });
  },
});

export const { changeUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
