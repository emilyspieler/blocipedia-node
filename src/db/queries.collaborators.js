const User = require("./models").User;
const Collaboration = require("./models").Collaboration;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;

module.exports = {

  getAllCollaborators(callback){
    return Collaboration.all()

    .then((collaborators) => {
      callback(null, collaborators);
    })
    .catch((err) => {
      callback(err);
    })
  },


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
      return Collaboration.findById(id)
  .then((collaboration) => {
    callback(null, collaboration);
  })
  .catch((err) => {
    callback(err);
  })
},

deleteCollaboration(id, callback){
     return Collaboration.destroy({
       where: { id }
     })
     .then((collaboration) => {
       callback(null, collaboration);
     })
     .catch((err) => {
       callback(err);
     })
   },

}
