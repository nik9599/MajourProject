import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login:{
  username: "",
  email: "",
  userId: "",}
};

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      const { username, email, userId } = action.payload;
      state.login ={
        ...state.login,
        username,
        email,
        userId,
      };
    },

    LogOutUser: (state, action) => {
        state.login = initialState.login
    },
  },
});

export const {LogOutUser,LoginUser} = loginSlice.actions;

export default loginSlice.reducer;