const User = require("./models").User;
const Collaboration = require("./models").Collaboration;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;

module.exports = {

addCollaboration(newCollaboration, callback){
      return Collaboration.create(newCollaboration)
      .then((collaboration) => {
        callback(null, collaboration);
      })
      .catch((err) => {
        callback(err);
      })
    },

    getCollaboration(id, callback){
      return Collaboration.findById(id, {
        include: [
            {model: User }
    ]
  })
  .then((collaboration) => {
    callback(null, collaboration);
  })
  .catch((err) => {
    callback(err);
  })
},

}
