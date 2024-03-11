import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/loginSlice/loginSlice.js";
import stateSlice from "../slice/stateSlice/stateSlice.js";

export const store = configureStore({
  reducer: { login: loginReducer, state: stateSlice },
});
