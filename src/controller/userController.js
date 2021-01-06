const { User } = require("../model");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");


exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ where: { username } });

    if (!user) return response.notFound(res, { error: "Not found user" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return response.unauthorized(res, { error: "Wrong password" });
    let token = jwt.sign({ id: user.id }, config.jwt_secret);

    delete user.dataValues.password;
    return response.success(res, { data: { token, user } });
    
  } catch (error) {
    return response.error(res, { error });
  }
};

exports.create = async (req, res) => {
  try {
    let { password, username } = req.body;
    let hashPwd = await bcrypt.hash(password, 256);

    let user = await User.findOne({ where: { username: username } });

    if (user) return response.conflict(res, { error: "Username already exists" });

    let createUser = await User.create({
      username,
      password: hashPwd,
    });

    return response.created(res, { data: createUser });
  } catch (error) {
    return response.error(res, { error });
  }
};

exports.checkToken = async (req, res) => {
  try {
    let user = req.user;
    delete user.dataValues.password;
    if (!user) return response.notFound(res, { error: "Not found user" });

    return response.success(res, { data: user });
  } catch (error) {
    return response.error(res, { error });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let user = req.user;
    let { passwordOld, passwordNew } = req.body;
    // check password
    const match = await bcrypt.compare(passwordOld, user.dataValues.password);
    if (!match) return response.unauthorized(res, { error: "Wrong password" });

    let hashPwd = await bcrypt.hash(passwordNew, 256);

    // update database
    const userUpdate = await User.update({password: hashPwd},{ where: { id: user.id }});
    // delete field sensitive information
    delete user.dataValues.password;
   
    return response.success(res, { data: "Change password success" });
  } catch (error) {
    return response.error(res, { error });
  }
};
