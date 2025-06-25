// src/features/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login:(state)=>{
        state.isAuthenticated=true;
    },
    logOut:(state)=>{
        state.isAuthenticated=false;
    }
  },
});

export const {login ,logOut} = authSlice.actions;
export default authSlice.reducer;
