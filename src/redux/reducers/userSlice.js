import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "../../services";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userData: {},
};
export const reloadInfo = createAsyncThunk(
  "user/reloadInfo",
  async (_, thunkApi) => {
    const userData = thunkApi.getState().user.userData;
    const res = await userServices.getUserById(userData._id);

    return res.dataUser;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, payload) => {
      const payloadDoc = payload.payload;
      state.isLoggedIn = true;
      state.userData = { ...payloadDoc };
    },
    toggleLogin: (state, payload) => {
      const payloadDoc = payload.payload;
      state.userData = state.isLoggedIn == true ? {} : { ...payloadDoc };
      state.isLoggedIn = !state.isLoggedIn;
    },
    reload: (state, payload) => {
      const payloadDoc = payload.payload;
      state.userData = state.isLoggedIn !== true ? {} : { ...payloadDoc };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reloadInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reloadInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = {
          _id: action.payload._id,
          email: action.payload.email,
          type: action.payload.type,
          fullName: action.payload.fullName,
          avatar: action.payload.avatar,
          emailVerified: action.payload.emailVerified,
        };
      })
      .addCase(reloadInfo.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch user data.";
      });
  },
});

export default userSlice;
