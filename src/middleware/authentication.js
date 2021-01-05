const config = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../model");
const response = require("../utils/response");

exports.isLogged = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return response.unauthorized(res, { message: "Unauthorized" });
    let tokenInfo;
    await new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt_secret, (err, decoded) => {
        console.log(decoded);
        if (err) {
          console.log(err);
          return response.unauthorized(res, { error: "Token is invalid" });
        }
        console.log("verify token done");
        tokenInfo = decoded;
        resolve(tokenInfo);
      });
    });
    let user = await User.findByPk(tokenInfo.id);
    if (!user) return response.notFound(res, { error: "Not found user" });
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    return response.error(res, { error });
  }
};
