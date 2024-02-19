const constant = require("./constant");

const passwordValidator = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < 8) {
    return { msg: constant.PASSWORD_TOO_SHORT, success: false };
  }

  if (!passwordRegex.test(password)) {
    return {msg :constant.INVALID_PASSWORD , success:false}
  }
  return true;
};

module.exports = passwordValidator
