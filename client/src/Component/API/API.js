import axios from "axios";
const baseUrl = "http://localhost:8080/api/v1";

//---------------------------funcation for making all the get request-------------------------------

export const getRequest = async (param = null, url, token = null) => {

    console.log(`param data ${url} `);

  try {
    let response;
    if (token != null && param == null) {
      response = await axios.get(baseUrl.concat(url), {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },
      });

      return response.data;
    }
    if (token != null && param != null) {
      response = await axios.get(baseUrl.concat(url), {
        params: {
          email:param.email,
          password:param.password
        },
        headers: {
          authorization: `Bearer ${token} `,
          // Other headers if needed
        },
      });

      return response.data;
    }

    if (token == null && param == null) {
      response = await axios.get(baseUrl.concat(url));

      return response.data;
    }
  } catch (error) {
    if (
      (error.response && error.response.status === 500) ||
      error.response.status === 404
    ) {
      // Handle the 500 status code from the server
      const errorMessage = error.response.data.msg; // Access the error message from the server response
      return { success: false, msg: errorMessage };
    } else {
      // Handle other errors (e.g., network error)
      console.error(error);
      return {
        success: false,
        message: "An error occurred while processing your request",
      };
    }
  }
};

//-------------------------------------------funcation for making all the post request--------------------

export const postRequest = async (data, url, token = null) => {
  try {
    let response;

    if (token === null) {
      response = await axios.post(baseUrl.concat(url), data);
    } else {
      response = await axios.post(baseUrl.concat(url), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return response.data;
  } catch (error) {
    if (
      (error.response && error.response.status === 500) ||
      error.response.status === 400
    ) {
      // Handle the 500 status code from the server
      const errorMessage = error.response.data.msg; // Access the error message from the server response
      return { success: false, msg: errorMessage };
    } else {
      // Handle other errors (e.g., network error)
      console.error(error);
      return {
        success: false,
        message: "An error occurred while processing your request",
      };
    }
  }
};

export const putRequest = async (data, url, token) => {
  const response = await axios.put(baseUrl.concat(url), data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
