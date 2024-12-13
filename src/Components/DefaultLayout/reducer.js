import { createSlice } from "@reduxjs/toolkit";

export const DefaultLayoutSlice = createSlice({
  name: "DefaultLayout",
  initialState: {
    showSideBar: false,
  },
  reducers: {
    setShowSideBar: (state, action) => {
      state.showSideBar = action.payload;
    },
  },
});

export const { setShowSideBar } = DefaultLayoutSlice.actions;
export default DefaultLayoutSlice.reducer;
