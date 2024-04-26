import { getRequest, postRequest } from "../../API/API.js";

class signup {
  constructor() {
    this.passwordValidate = false;
    this.uniqueUsername = false;
    this.numberIsValid = false;
    this.emailVerified = false;
  }

  async passwordValidator(password) {
    if (password == "") {
      password = "empty";
    }
    const resp = await getRequest(null, `/verifyPassword/${password}`, null);

    if (resp.validPassword) {
      return true;
    } else {
      return false;
    }
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

    if (!resp.uniqueEmail) {
      this.emailVerified = true;
      return true;
    } else {
      this.emailVerified = false;
      return false;
    }
  }

  async confirmPassword(password, confirmPassword) {
    if (password === confirmPassword) {
      this.passwordValidate = true;
      return true;
    } else {
      return false;
    }
  }

  async registeredData(signUpData) {
    console.log(signUpData);
    const res = await postRequest(signUpData, "/signUp");
    if (res.success) {
      return {success :true};
    } else {
      return { msg: "Signup failed", success: false };
    }
  }
}

export default new signup();
