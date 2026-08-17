import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    userInfo: undefined,
    authenticate: false,
    permission: {}
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
  },
});

export const { setUserInfo, setAuthenticate, setPermission } = LoginSlice.actions;
export default LoginSlice.reducer;
