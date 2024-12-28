import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Container/Login/reducer";
import InvoiceReducer from "../Container/Invoice/reducer";
import DefaultLayoutReducer from "../Components/DefaultLayout/reducer";
import PenaltyFeeReducer from "../Container/Invoice/PenaltyFee/reducer";
import VisitManagerReducer from "../Container/Residentials/VisitsManager/reducer";

export default configureStore({
  reducer: {
    Login: LoginReducer,
    Invoice: InvoiceReducer,
    DefaultLayout: DefaultLayoutReducer,
    PenaltyFee: PenaltyFeeReducer,
    VisitManager: VisitManagerReducer,
  },
});
