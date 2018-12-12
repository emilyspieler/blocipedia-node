const wikiQueries = require("../db/queries.wikis.js");
const userQueries = require("../db/queries.users.js");
const collaborationQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;
const Wiki = require("../db/models").Wiki;
const User = require("../db/models").User;

module.exports = {
  index(req, res, next){
    collaborationQueries.getAllCollaborators((err, collaborations) => {
        if(err){
          res.redirect(500, "/");
        } else {
          res.render("collaborations/index", {collaborations});
        }
      })
  },

  new(req, res, next){

  const authorized = new Authorizer(req.user).new();

     if(authorized) {
       res.render("collaborations/new", {wikiId: req.params.wikiId});

    } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect(`/wikis/${wiki.Id}/collaborations/${collaboration.id}`);
     }
  },

  create(req, res, next){
    //verifies that collaborator is actually a user already registered.
       User.findOne({where: {email: req.body.email}})
          .then(user => {


      if (user) {
       let newCollaboration= {
         email: req.body.email,
         userId: req.user.id,
         wikiId: req.params.wikiId
       };

       collaborationQueries.addCollaboration(newCollaboration, (err, collaboration) => {
         if(err){
           res.redirect(500, "/collaborations/new");
         } else {
           res.render("collaborations/show",
             {collaboration});
           }
       });
         } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/wikis");
        }
      })
     },

  show(req, res, next){
       collaborationQueries.getCollaboration(req.params.id, (err, collaboration) => {
         if(err || collaboration == null){

      res.redirect(404, "/");
    } else {
      res.render("collaborations/show", {collaboration});
    }
  });
},

destroy(req, res, next){

 collaborationQueries.deleteCollaboration(req.params.id, (err, collaboration) => {
   if(err){
     res.redirect(err, `/wikis/${req.params.wikiId}/collaborations/${req.params.id}`)
   } else {
     res.redirect(303, `/wikis/${req.params.wikiId}/collaborations/`)
   }
 });
},

}
