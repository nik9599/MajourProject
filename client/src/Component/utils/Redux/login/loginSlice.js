import { createSlice } from "@reduxjs/toolkit";

// Load initial state from local storage if available
const initialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {
      login: {
        username: "",
        token: "",
        userId: "",
        isLogedIn: false,
      },
    };

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      const { username, token, isLogedIn, userId } = action.payload;

      state.login = {
        ...state.login,
        username,
        token,
        isLogedIn,
        userId,
      };

      // Save state to local storage after each update
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    logOutUser: (state) => {
      state.login = initialState.login;

      // Clear local storage when user logs out
      localStorage.removeItem("reduxState");
    },
  },
});

export const { LoginUser, logOutUser } = loginSlice.actions;
export default loginSlice.reducer;
