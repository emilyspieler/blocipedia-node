'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaboration = sequelize.define('Collaboration', {
    userId: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Collaboration.associate = function(models) {
    // associations can be defined here
    Collaboration.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Collaboration;
};
