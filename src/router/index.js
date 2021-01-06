 
'use strict';

const fs = require('fs');
const router = require('express').Router();

// const modules = ['user']
// module.exports = (app) => {
//     for (let module of modules) {
//         app.use(`/`, require(`./${module}`)(router));
//     }
// };


module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        let name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
};