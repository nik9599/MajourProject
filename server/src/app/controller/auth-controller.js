const { InsertUser, isEmailExist, getUser } = require("../Query/query.js");
const db = require("../../database/database.js");
const bcrypt = require("bcrypt");
const constant = require("../../utils/constant.js");
const token = require("../../utils/tokenGeneration.js");

const signUpUser = async (req, res) => {
  let { username, email, password } = req.body;

  //-----------------checking if email is already exist or not----------------------------
  const checkEmail = [email];

  db.pool.query(isEmailExist, checkEmail, (err, result) => {
    if (err) {
      console.log(`Error while executing query: ${err.message}`);
      return res
        .status(500)
        .send({ msg: constant.SERVER_ERROR, success: false });
    }

    const emailCount = result.rows[0].email_count; // Extract the email count from the result

    console.log(`Checking if email exists or not => ${emailCount}`);

    if (emailCount > 0) {
      return res
        .status(500)
        .send({ msg: constant.EMAIL_ALREADY_EXIST, success: false });
    }

    //------------------------if email is not exist then we signup the user to system----------
    const values = [username, email, password];

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(`Error while hashing password: ${err.message}`);
        return res
          .status(500)
          .send({ msg: constant.SERVER_ERROR, success: false });
      }

      // Use the hashed password in the query
      values[2] = hash;

      // Insert the user into the database
      db.pool.query(InsertUser, values, (err, result) => {
        if (err) {
          console.log(`Error while executing query: ${err.message}`);
          return res
            .status(500)
            .send({ msg: constant.USER_SIGNUP_ERROR, success: false });
        }

        console.log("User inserted successfully");
        return res
          .status(200)
          .send({ msg: constant.USER_SIGNUP, success: true });
      });
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.params;

  //-----------------------fetching user detail from email---------------------------------

  const value = [email];

  db.pool.query(getUser, value, (err, result) => {
    if (err) {
      console.log(`Error  => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    }

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: constant.INVALID_EMAIL,
        success: false,
      });
    }

    //-------------------------comparing hash password with user input password------------

    const dbpassword = result.rows[0].password;
    const userID = result.rows[0].userid;
    bcrypt.compare(password, dbpassword, (err, result) => {
      if (err) {
        console.log(`Error  => ${err.message}`);
        return res
          .status(500)
          .json({ msg: constant.USER_SIGNUP_ERROR, success: false });
      } else if (result) {
        return res.status(200).json({
          msg: constant.USER_SIGNIN,
          userID: userID,
          token: token(email, password),
          email: email,
          success: true,
        });
      } else {
        return res.status(404).json({
          msg: constant.INVALID_PASSWORD,
          success: false,
        });
      }
    });
  });
};

module.exports = {
  signUpUser,
  loginUser,
};
