'use strict';
module.exports = (sequelize, DataTypes) => {
  const collaboration = sequelize.define('collaboration', {
    userId: DataTypes.STRING,
    createAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  collaboration.associate = function(models) {
    // associations can be defined here
    collaboration.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return collaboration;
};
