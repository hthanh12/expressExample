"use strict";

const dotenv = require("dotenv");

dotenv.config();
const env = process.env.NODE_ENV || "development";

//console.log(process)

const configs = {
  base: {
    env,
    rootUrl: process.env.ROOT_URL || "http://localhost:7070",
    name: process.env.APP_NAME || "testing",
    host: process.env.APP_HOST || "0.0.0.0",
    port: process.env.APP_PORT || 7070,
    secret: process.env.APP_SECRET || "secretKey",
    version: process.env.APP_VERSION || "v1",
    utc: 7,
    language: "en", 
    jwt_expiration: "1d",
    jwt_secret: "secretKey",
  },
};

// const envConfig = require(`./${env}`)
// callback hell
let envConfig;
if (env === "production") {
  envConfig = require("./production");
} else {
  envConfig = require("./development");
}

const config = Object.assign(configs.base, envConfig);

module.exports = config;