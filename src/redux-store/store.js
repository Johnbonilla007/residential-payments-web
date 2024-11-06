import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Container/Login/reducer";

export default configureStore({
  reducer: {
    Login: LoginReducer,
  },
});
