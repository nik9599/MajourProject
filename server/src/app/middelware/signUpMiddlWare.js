const emailValidator = require("../../utils/emailValidator");
const constant = require("../../utils/constant.js");
const passwordValidator = require("../../utils/passwordValidator.js");

const signUpMidelware = (req, res, next) => {
  const { mobile, email, password } = req.body;

  //----------checking the email----------------------

  if (!emailValidator(email)) {
    return res
      .status(400)
      .json({ msg: constant.INVALID_EMAIL, success: false });
  }

  //-----------checking password----------------------

  if (password == "") {
    return res.status(400).json({ msg: "Password Missing", success: false });
  }

  const passwordValidationResult = passwordValidator(password);

  if (!passwordValidationResult.success == false) {
    return res
      .status(400)
      .json({ msg: passwordValidationResult.msg, success: false });
  }

  //-----------checking mobile length----------------------

  if (mobile.length < 10) {
    return res
      .status(400)
      .json({ msg: "please enter the valid number", success: false });
  }

  next();
};

module.exports = signUpMidelware;
