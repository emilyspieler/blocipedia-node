'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    userId: DataTypes.INTEGER,
    wikiId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {});
  Collaborator.associate = function(models) {
    // associations can be defined here
    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE",
    });
  };
  return Collaborator;
};
