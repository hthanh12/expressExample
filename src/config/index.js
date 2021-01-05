"use strict";

require('dotenv').config()
//console.log(process)

const config = {
    env: process.env.NODE_ENV,
    rootUrl: process.env.ROOT_URL,
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    secret: process.env.APP_SECRET,
    version: process.env.APP_VERSION,
    utc: 7,
    language: "en", 
    jwt_expiration: process.env.JWT_EXPIRATION,
    jwt_secret: process.env.JWT_SECRET,
};

module.exports = config;