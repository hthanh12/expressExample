module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.STRING,
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
        tableName: 'user'
      }
      
    );
    User.associate = function (models) {
      // associations can be defined here
    };
    return User;
  };