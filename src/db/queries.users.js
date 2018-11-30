const User = require("./models").User;
const Downgrade = require("./models").Downgrade;
const bcrypt = require("bcryptjs");

module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  createDowngrade(newDowngrade, callback){

    return Downgrade.create({
      name: newDowngrade.name,
      email: newDowngrade.email,
      description: newDowngrade.description
    })
    .then((downgrade) => {
      callback(null, downgrade);
    })
    .catch((err) => {
      callback(err);
    })
  }

}
