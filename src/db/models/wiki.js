'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

  Wiki.hasMany(models.Collaboration, {
    foreignKey: "wikiId",
    as: "collaborations",
  });
};

Wiki.prototype._isCollaborator= function() {
    return this.collaborations === 1;
    };

  return Wiki;
};
