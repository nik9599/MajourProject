const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const tokenGeanerator = (email,password)=>{
 const option={
    expiresIn : '30m'
 }   
 const payload = {
    email,password
 }
 return jwt.sign(payload,process.env.SECRET_KEY,option);
}


module.exports = tokenGeanerator;