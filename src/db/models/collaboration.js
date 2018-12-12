'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaboration = sequelize.define('Collaboration', {
    userId: DataTypes.INTEGER,
    wikiId: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});
  Collaboration.associate = function(models) {
    // associations can be defined here
    Collaboration.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Collaboration.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE",
    });

  };
  return Collaboration;
};
