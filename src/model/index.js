const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('postgres', 'root', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432'
});




sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
})

fs.readdirSync(__dirname)
    .filter(file => (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
