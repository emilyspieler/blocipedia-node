const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;

module.exports = {
  index(req, res, next){
    wikiQueries.getAllWikis((err, wikis) => {
        if(err){
          res.redirect(500, "/");
        } else {
          res.render("wikis/index", {wikis});
        }
      })
  },

  new(req, res, next){
    res.render("wikis/new", {id: req.params.id});
  },

  create(req, res, next){
    const authorized = new Authorizer(req.user).create();

    if(authorized) {
    const options = {
      title: req.body.title,
      description: req.body.description,
      userId: req.params.id
    }
    if (req.body.private) {
      options.private = true;
    }


      wikiQueries.addWiki(options, (err, wiki) => {

        if(err){
          res.redirect(500, "wikis/new");

        } else {


        console.log(req.body);
        var description = markdown.toHTML(wiki.description);
          res.render("wikis/show",
            {wiki: wiki, htmlDescription: description});
          }
        });
        } else {

        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/wikis");
 }
},

 show(req, res, next){

    wikiQueries.getWiki(req.params.id, (err, wiki) => {

      if(err || wiki == null){
        res.redirect(404, "/");
      } else {

        var description = markdown.toHTML(wiki.description);
         res.render("wikis/show",
          {wiki: wiki, htmlDescription: description});

            }
          });
        },

        destroy(req, res, next){

         wikiQueries.deleteWiki(req, (err, wiki) => {
           if(err){
             res.redirect(err, `/wikis/${req.params.id}`)
           } else {
             res.redirect(303, "/wikis")
           }
         });
       },

edit(req, res, next){

   wikiQueries.getWiki(req.params.id, (err, wiki) => {
     if(err || wiki == null){
       res.redirect(404, "/");
     } else {

       const authorized = new Authorizer(req.user, wiki).edit();

       if(authorized){
         res.render("wikis/edit", {wiki});
       } else {
         req.flash("You are not authorized to do that.")
         res.redirect(`/wikis/${req.params.id}`)
       }
     }
   });
 },

 makePrivate(req, res, next){

   wikiQueries.updateWiki(req, req.body, (err, wiki) => {

     if(err || wiki == null){
       res.redirect(401, `/wikis/${req.params.id}`);
        } else {

        const authorized = new Authorizer(req.user, wiki).edit();

          if(authorized){

          wiki.private = true;
          wiki.save();

          req.flash("Your wiki is now private");
          res.redirect(`/wikis/${req.params.id}`);
        }
        }
      });
 },

 makePublic(req, res, next){

   wikiQueries.updateWiki(req, req.body, (err, wiki) => {

     if(err || wiki == null){
       res.redirect(401, `/wikis/${req.params.id}`);
        } else {

        const authorized = new Authorizer(req.user, wiki).edit();

          if(authorized){

          wiki.private = false;
          wiki.save();

          req.flash("Your wiki is now public");
          res.redirect(`/wikis/${req.params.id}`);
        }
       }
    });
 },

 update(req, res, next){

   wikiQueries.updateWiki(req, req.body, (err, wiki) => {

     if(err || wiki == null){
       res.redirect(401, `/wikis/${req.params.id}/edit`);
        } else {
          res.redirect(`/wikis/${req.params.id}`);
        }
      });
    },



//needs to have updateCollaberator function added
    updateCollaborator(req, res, next) {
      wikiQueries.updateWikiCollaborator(req, req.body, (err, wiki) => {

        if(err || wiki == null){
          console.log(err);
          res.redirect(401, `/wikis/${req.params.id}/edit`);
           } else {
             res.redirect(`/wikis/${req.params.id}/edit/updateCollaborator`);
           }
         });
    },

//needs to have updateCollaberatorRemove function added
    updateCollaboratorRemove(req, res, next) {
        wikiQueries.updateWikiCollaboratorRemove(req, req.body, (err, wiki) => {
      if(err || wiki == null){
        console.log(err);
        res.redirect(401, `/wikis/${req.params.id}/edit`);
         } else {
           res.redirect(`/wikis/${req.params.id}/edit/updateCollaboratorRemove`);
         }
       });
    }
}
