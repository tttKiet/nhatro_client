import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, payload) => {
      state.isLoggedIn = true;
      state.userData = payload;
    },
    toggleLogin: (state, payload) => {
      state.userData = state.isLoggedIn == true ? {} : payload;
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export default userSlice;
