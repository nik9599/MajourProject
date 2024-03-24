import { getRequest } from "../../API/API";

export const decreaseQuantityInDatabase = async (cartItems, token) => {
  console.log(cartItems);
  let allRequestsSuccessful = true; // Flag to track if all requests are successful
  try {
    // Iterate over each item in the cart
    for (const item of cartItems) {
      // Create an array to store the decrease requests for the current item
      const decreaseRequests = [];

      // Make a decrease request for each unit of the item
      for (let i = 0; i < item.product_qantity; i++) {
        decreaseRequests.push(
          getRequest(null, `/decreaseQuantity/${item.product_id}`, token)
        );
      }

      // Await all decrease requests concurrently
      const decreaseResponses = await Promise.all(decreaseRequests);

      // Handle the response from the server for each decrease request
      decreaseResponses.forEach((response, index) => {
        if (response.success) {
          console.log(
            `Decreased quantity for item ${item.product_id} in the database`
          );
          window.localStorage.clear()
        } else {
          console.error(
            `Failed to decrease quantity for item ${item.product_id}: ${response.msg}`
          );
          allRequestsSuccessful = false; // Set flag to false if any request fails
        }
      });
    }
  } catch (error) {
    console.error(
      "An error occurred while decreasing quantity in the database:",
      error
    );
    allRequestsSuccessful = false; // Set flag to false in case of an error
  }

  return allRequestsSuccessful; // Return the flag indicating success or failure
};
