import { createSlice } from "@reduxjs/toolkit";

export const InvoiceSlice = createSlice({
  name: "Invoice",
  initialState: {
    residentials: [],
    residences: [],
    filterResidential: "",
    filterResidences: "",
    residentialSelected: {},
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
    setResidentialSelected: (state, action) => {
      state.residentialSelected = action.payload;
    },
  },
});

export const {
  setResidentials,
  setFilterResidential,
  setResidences,
  setFilterResidences,
  setResidentialSelected,
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
