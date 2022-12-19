// import { createSlice } from '@reduxjs/toolkit';

// import { getUserPet, addUserPet, deleteUserPet } from './petsOperations';
import { createSlice } from '@reduxjs/toolkit';

import { getNews } from './newsOperations';

const newsState = {
  news: [],
  isLoading: false,
  error: null,
};

const pendingHandler = state => {
  state.isLoading = true;
  state.error = null;
};

const rejectedHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const newsSlice = createSlice({
  name: 'news',
  initialState: newsState,
  extraReducers: builder => {
    builder.addCase(getNews.pending, pendingHandler);
    builder.addCase(getNews.rejected, rejectedHandler);
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.news = action.payload;
    });
  },
});

export const newsReducer = newsSlice.reducer;