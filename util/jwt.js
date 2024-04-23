const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const tojwt = promisify(jwt.sign);
const vertify = promisify(jwt.verify)
const {uuid} = require('../config/config.default')

module.exports.vertifyToken = async (req,res,next) =>{
  let token =req.headers.authorization
  token = token? token.split("Bearer ")[1]:null
  if(!token){
    res.status(402).json({error:'请传入token'})
    return
  }
  try{
    let userinfo = await vertify(token,uuid)
    req.user = userinfo
    next()
  }catch(error){
    res.status('402').json({error:'无效的token'})
    return
  }
  next()
}

module.exports.createToken = async (userinfo) => {
  let token = await tojwt(
    { userinfo }, 
    uuid, 
    {
      expiresIn: 60 * 60,
    }
  );

  return token
};
