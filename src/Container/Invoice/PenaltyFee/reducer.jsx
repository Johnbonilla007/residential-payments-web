import { createSlice } from "@reduxjs/toolkit";

export const PenaltyFeeSlice = createSlice({
  name: "PenaltyFee",
  initialState: {
    penaltiesFee: [],
  },
  reducers: {
    setPenaltiesFee: (state, action) => {
      state.penaltiesFee = action.payload;
    },
  },
});

export const { setPenaltiesFee } = PenaltyFeeSlice.actions;
export default PenaltyFeeSlice.reducer;
