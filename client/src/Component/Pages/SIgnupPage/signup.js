import { getRequest, postRequest } from "../../API/API.js";

class signup {
  constructor() {
    this.passwordValidate = false;
    this.uniqueUsername = false;
    this.numberIsValid = false;
    this.emailVerified = false;
  }

  async passwordValidator(password) {
    if (password == null) {
      password = "empty";
    }
    const resp = await getRequest(null, `/verifyPassword/${password}`, null);

    if (resp.error) {
      const errorTag = document.getElementById("errorMessage");

      errorTag.innerHTML = resp.msg;
    }

    if (!resp.error) {
      const errorTag = document.getElementById("errorMessage");

      errorTag.innerHTML = "";
    }

    return resp.error;
  }

  async userNameUnique(username) {
    if (username == "") {
      username = "empty";
    }
    const resp = await getRequest(null, `/checkUserName/${username}`, null);

    if (!resp.uniqueUserFound) {
      this.uniqueUsername = true;
      return true;
    } else {
      return false;
    }
  }

  async emailValidator(email) {
    if (email == "") {
      email = "empty";
    }
    const resp = await getRequest(null, `/verifyEmail/${email}`, null);

    if (resp.error) {
      this.emailVerified = true;

      const getErrorTag = document.getElementById("emailError");
      getErrorTag.innerHTML = resp.msg;

      return true;
    } else {
      this.emailVerified = false;

      const getErrorTag = document.getElementById("emailError");
      getErrorTag.innerHTML = "";
      return false;
    }
  }

  async confirmPassword(password = "empty", confirmPassword) {
   

    if (password == null) {
      return false;
    }

    if (password == confirmPassword) {
      this.passwordValidate = true;
      return false;
    } else {
      return true;
    }
  }

  async registeredData(signUpData) {
    
    const res = await postRequest(signUpData, "/signUp");
    if (res.success) {
      return { success: true };
    } else {
      return { msg: "Signup failed", success: false };
    }
  }

  async mobileValidator(mobile) {
    const num = Number(mobile);

    if (isNaN(num)) {
      return true;
    } else {
      return false;
    }
  }
}

export default new signup();
