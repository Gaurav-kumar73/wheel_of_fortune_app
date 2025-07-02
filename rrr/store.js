import { configureStore } from '@reduxjs/toolkit';

// import your slices here
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // add other reducers here
  },
});