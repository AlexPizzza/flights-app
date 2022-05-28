import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['signIn/fulfilled']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
