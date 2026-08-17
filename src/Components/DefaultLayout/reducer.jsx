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
    setShowMenuOnMobile: (state, action) => {
      state.showMenuOnMobile = action.payload;
    },
  },
});

export const { setShowSideBar, setShowMenuOnMobile } =
  DefaultLayoutSlice.actions;
export default DefaultLayoutSlice.reducer;
