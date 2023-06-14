import { createSlice } from "@reduxjs/toolkit";

const imgSlice = createSlice({
  name: "img",
  initialState: [],
  reducers: {
    addImage(state, action) {
      state.push(action.payload);
    },
    removeImage(state, action) {
      return state.filter((img) => img !== action.payload);
    },
  },
});

export default imgSlice;
