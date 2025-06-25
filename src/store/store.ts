// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSice"
import userReducer from "../features/user/userSlice"



export const store = configureStore({
  reducer: {
    auth:authReducer,
    user:userReducer
  },
});

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
