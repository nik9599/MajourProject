import { jwtDecode } from "jwt-decode";
import { decreaseQuantityInDatabase } from "./productUpdate.js";

export const getExpireTime = () => {
  // Retrieve JWT token from sessionStorage
  const storedReduxState = sessionStorage.getItem("reduxState");

  // Check if the token is available
  if (storedReduxState) {
    // Decode the JWT token to extract the expiration time
    const jwtToken = JSON.parse(storedReduxState);
    const tokenPayload = jwtDecode(jwtToken.login.token);

    // Get the expiration time from the token payload
    const expirationTime = tokenPayload.exp;

    // Convert expiration time from seconds to milliseconds
    const expirationTimeMs = expirationTime * 1000;

    // Calculate the remaining time until expiration
    const currentTimeMs = new Date().getTime();
    const timeUntilExpirationMs = expirationTimeMs - currentTimeMs;

    // Call decreaseQuantityInDatabase 2 minutes before token expiration
    const twoMinutesBeforeExpirationMs = timeUntilExpirationMs - 2 * 60 * 1000;
    setTimeout(() => {
      decreaseQuantityInDatabase(); // Call decreaseQuantityInDatabase 2 minutes before expiration
    }, twoMinutesBeforeExpirationMs);

    // Clear local and session storage when token expires
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      console.log("Local and session storage cleared after token expiration");
    }, timeUntilExpirationMs);
  } else {
    console.error("reduxState is not available in sessionStorage");
  }
};
