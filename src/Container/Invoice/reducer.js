import { createSlice } from "@reduxjs/toolkit";

export const InvoiceSlice = createSlice({
  name: "Invoice",
  initialState: {
    residentials: [],
    residences: [],
    filterResidential: "",
    filterResidences: "",
  },
  reducers: {
    setResidentials: (state, action) => {
      state.residentials = action.payload;
    },
    setResidences: (state, action) => {
      state.residences = action.payload;
    },
    setFilterResidential: (state, action) => {
      state.filterResidential = action.payload;
    },
    setFilterResidences: (state, action) => {
      state.filterResidences = action.payload;
    },
  },
});

export const { setResidentials, setFilterResidential, setResidences, setFilterResidences } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
