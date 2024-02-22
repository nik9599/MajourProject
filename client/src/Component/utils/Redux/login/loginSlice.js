import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    username: "",
    token: "",
    userId: "",
    isLogedIn: false,
    isProfileCompleted: false,
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      const { username, token, isLogedIn, isProfileCompleted, userId } =
        action.payload;

      state.login = {
        username,
        token,
        isLogedIn,
        isProfileCompleted,
        userId,
      };
    },
    logOutUser: (state) => {
      state.login = initialState.login;
    },
  },
});

export const { LoginUser, logOutUser } = loginSlice.action;
export default loginSlice.reducer;