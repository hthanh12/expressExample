const Parameter = require("parameter");
const reponse = require("../utils/response");

const parameter = new Parameter();

exports.validateLogin = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    let data = {
      username: username,
      password: password,
    };
    const rule = {
      username: "string",
      password: "password",
    };

    let error = parameter.validate(rule, data);
    if (error) return reponse.badRequest(res, { error });
    await next();
  } catch (error) {
    return reponse.error(res, { error });
  }
};



exports.validateCreate = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    let data = {
      username: username,
      password: password,
    };
    const rule = {
      username: "string",
      password: "password",
    };

    let error = parameter.validate(rule, data);
    if (error) return reponse.badRequest(res, { error });
    await next();
  } catch (error) {
    return reponse.error(res, { error });
  }
};

exports.validateChangepassword = async (req, res, next) => {
  try {
    let { passwordOld, passwordNew } = req.body;

    let data = {
      passwordOld: passwordOld,
      passwordNew: passwordNew,
    };
    const rule = {
      passwordOld: "password",
      passwordNew: "password",
    };

    let error = parameter.validate(rule, data);
    if (error) return reponse.badRequest(res, { error });
    await next();
  } catch (error) {
    return reponse.error(res, { error });
  }
};
