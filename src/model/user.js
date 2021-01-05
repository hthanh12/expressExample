module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true
        },
        password: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: false,
        tableName: 'users',
      }
      
    );
    User.associate = function (models) {
      // associations can be defined here
    };
    return User;
  };