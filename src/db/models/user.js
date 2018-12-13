'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "must be a valid email" }
     }
   },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    role: {
     type: DataTypes.INTEGER,
     allowNull: false,
     defaultValue: 0
   }
  }, {});
  User.associate = function(models) {
    // associations can be defined here

    User.hasMany(models.Wiki, {
      foreignKey: "userId",
      as: "wikis"
    });

    User.hasMany(models.Collaborator, {
      foreignKey: "userId",
      as: "collaborations"
    });

  };
  User.prototype.isAdmin = function() {
     return this.role === 2;
   };
  User.prototype.isPremium = function() {
      return this.role === 1;
    };
  User.prototype.isStandard = function() {
      return this.role === 0;
      };
  User.prototype.isCollaborator = function(wiki) {
      console.log(wiki.collaborators)
      };
//wiki.collaborators is undefined

  return User;
};
