import { createSlice } from "@reduxjs/toolkit";

export const VisitManagerSlice = createSlice({
  name: "VisitManager",
  initialState: {
    visits: [],
  },
  reducers: {
    setVisits: (state, action) => {
      state.visits = action.payload;
    },
  },
});

export const { setVisits } = VisitManagerSlice.actions;
export default VisitManagerSlice.reducer;
