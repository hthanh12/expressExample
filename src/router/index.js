 
'use strict';

const fs = require('fs');
const modules = ['user']
const router = require('express').Router();

module.exports = (app) => {
    for (let module of modules) {
        app.use(`/`, require(`./${module}`)(router));
    }
};