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
    // if (res.err === 0) {
    //   console.log("-------: res ", res);
    //   thunkApi.dispatch(
    //     userSlice.actions.reload({
    //       _id: res.userData._id,
    //       email: res.userData.email,
    //       type: res.userData.type,
    //       fullName: res.userData.fullName,
    //       avatar: res.userData.avatar,
    //     })
    //   );
    // }

    console.log("-------: res ", res.dataUser);

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
        console.log("pending: ", state);
      })
      .addCase(reloadInfo.fulfilled, (state, action) => {
        console.log("action: ", action);
        console.log("state: ", state);
        console.log("payload: ", action.payload);
        state.isLoading = false;
        state.userData = {
          _id: action.payload._id,
          email: action.payload.email,
          type: action.payload.type,
          fullName: action.payload.fullName,
          avatar: action.payload.avatar,
        };
      })
      .addCase(reloadInfo.rejected, (state) => {
        state.isLoading = false;
        console.log("rejected: ", state);
        state.error = "Failed to fetch user data.";
      });
  },
});

export default userSlice;
