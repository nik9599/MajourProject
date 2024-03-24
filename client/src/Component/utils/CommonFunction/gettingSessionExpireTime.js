// import { jwtDecode } from "jwt-decode";
// import { decreaseQuantityInDatabase } from "./productUpdate.js";

// export const getExpireTime = () => {
//   // Retrieve JWT token from sessionStorage
//   const storedReduxState = sessionStorage.getItem("reduxState");

//   // Check if the token is available
//   if (storedReduxState) {
//     // Decode the JWT token to extract the expiration time
//     const jwtToken = JSON.parse(storedReduxState);
//     const tokenPayload = jwtDecode(jwtToken.login.token);

//     // Get the expiration time from the token payload
//     const expirationTime = tokenPayload.exp;

//     // Convert expiration time from seconds to milliseconds
//     const expirationTimeMs = expirationTime * 1000;

//     // Calculate the remaining time until expiration
//     const currentTimeMs = new Date().getTime();
//     const timeUntilExpirationMs = expirationTimeMs - currentTimeMs;

//     // Call decreaseQuantityInDatabase 2 minutes before token expiration
//     const twoMinutesBeforeExpirationMs = timeUntilExpirationMs - 2 * 60 * 1000;
//     setTimeout(() => {
//       decreaseQuantityInDatabase(); // Call decreaseQuantityInDatabase 2 minutes before expiration
//     }, twoMinutesBeforeExpirationMs);

//     // Clear local and session storage when token expires
//     setTimeout(() => {
//       localStorage.clear();
//       sessionStorage.clear();
//       console.log("Local and session storage cleared after token expiration");
//     }, timeUntilExpirationMs);
//   } else {
//     console.error("reduxState is not available in sessionStorage");
//   }
// };
import { jwtDecode } from "jwt-decode";
import { decreaseQuantityInDatabase } from "./productUpdate.js";

let timerId; // Variable to hold the timer ID

export const startTimer = () => {
  // If timer is already running, clear it before starting a new one
  if (timerId) {
    clearTimeout(timerId);
  }

  // Start a new timer for 15 minutes (900000 milliseconds)
  timerId = setTimeout(() => {
    decreaseQuantityInDatabase(); // Release hold quantity if transaction is not completed
    console.log("Hold quantity released due to timeout");
  }, 15 * 60 * 1000); // 15 minutes in milliseconds
};

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

    // Call startTimer when user adds the first item to the cart
    if (timeUntilExpirationMs > 15 * 60 * 1000) {
      startTimer(); // Start timer if token expiration time is greater than 15 minutes
    }

    // Convert remaining time to hours and minutes
    const hoursRemaining = Math.floor(timeUntilExpirationMs / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeUntilExpirationMs % (1000 * 60 * 60)) / (1000 * 60));

    console.log(`Time until expiration: ${hoursRemaining} hours ${minutesRemaining} minutes`);

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
