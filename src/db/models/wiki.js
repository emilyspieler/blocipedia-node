'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.hasMany(models.User, {
      foreignKey: "userId",
      as: "users"
    });
  };
  return Wiki;
};
