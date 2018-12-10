const wikiQueries = require("../db/queries.wikis.js");
const userQueries = require("../db/queries.users.js");
const collaborationQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;
const Wiki = require("../db/models").Wiki;

module.exports = {

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

      const authorized = new Authorizer(req.user).create();

      if(authorized) {
       let newCollaboration= {
         email: req.body.email,
         userId: req.user.id,
         wikiId: req.params.wikiId
       };
       collaborationQueries.addCollaboration(newCollaboration, (err, collaboration) => {
         if(err){
           console.log(err);
           res.redirect(500, "/collaborations/new");
         } else {
           res.redirect(303, `/wikis/${newCollaboration.wikiId}/collaborations/${collaboration.id}`);
         }
       });
         } else {

        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/wikis");
      }
     },

     show(req, res, next){
       collaborationQueries.getCollaboration(req.params.id, (err, collaboration) => {
         if(err || collaboration == null){
      res.redirect(404, "/");
    } else {
      res.render("collaborations/show");
    }
  });
},


// opens file
   updateCollaborator(req, res, next) {
     wikiQueries.getWiki(req.params.id, (err, wiki) => {
       if(err || wiki == null){
         res.redirect(404, "/");
       } else {

         const authorized = new Authorizer(req.user, wiki).edit();

         if(authorized){
           res.render("wikis/updateCollaborator", {wiki});
         } else {
           req.flash("You are not authorized to do that.")
           res.redirect(`/wikis/${req.params.id}`)
         }
       }
     });
    },

// opens file
    updateCollaboratorRemove(req, res, next) {
      wikiQueries.getWiki(req.params.id, (err, wiki) => {
        if(err || wiki == null){
          res.redirect(404, "/");
        } else {

          const authorized = new Authorizer(req.user, wiki).edit();

          if(authorized){
            res.render("wikis/updateCollaboratorRemove", {wiki});
          } else {
            req.flash("You are not authorized to do that.")
            res.redirect(`/wikis/${req.params.id}`)
          }
        }
      });
      }
}
