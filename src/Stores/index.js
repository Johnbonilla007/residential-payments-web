import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Container/Login/reducer";
import InvoiceReducer from "../Container/Invoice/reducer";
export default configureStore({
  reducer: {
    Login: LoginReducer,
    Invoice: InvoiceReducer,
  },
});
