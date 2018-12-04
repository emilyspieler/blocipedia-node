const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");

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
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },

  newPrivate(req, res, next){
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("wikis/newPrivate");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },

  create(req, res, next){
    const authorized = new Authorizer(req.user).create();

    if(authorized) {
      let newWiki = {
        title: req.body.title,
        description: req.body.description,
        private: false,
        userId: req.user.id
      };
   wikiQueries.addWiki(newWiki, (err, wiki) => {
     if(err){
       res.redirect(500, "wikis/new");
     } else {
       res.redirect(303, `/wikis/${wiki.id}`);
     }
   });
 } else {

// #3
   req.flash("notice", "You are not authorized to do that.");
   res.redirect("/wikis");
 }
},

  // this will create a wiki that is private (private = true)
  createPrivate(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    if(authorized) {
      let newWiki = {
        title: req.body.title,
        description: req.body.description,
        private: true,
        userId: req.user.id
      };
      wikiQueries.addPrivateWiki(newWiki, (err, wiki) => {
        if(err){
          res.redirect(500, "wikis/newPrivate");
        } else {
          res.redirect(303, `/wikis/${wiki.id}`);
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
              res.render("wikis/show", {wiki});
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
   //when they click on this private should change to true
   wikiQueries.updateWiki(req, req.body, (err, wiki) => {

     if(err || wiki == null){
       console.log("you have an error");
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
   //when they click on this private should change to false
   wikiQueries.updateWiki(req, req.body, (err, wiki) => {

     if(err || wiki == null){
       console.log("there is an error");
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
    }
}
