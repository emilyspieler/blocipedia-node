const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");

module.exports = {
  index(req, res, next){
    wikiQueries.getAllWikis((err, wikis) => {
      console.log(err);
        if(err){
          res.redirect(500, "/");
        } else {
          res.render("wikis/index", {wikis});
        }
      })
  },

  new(req, res, next){
// #2
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },

  create(req, res, next){

// #1
 const authorized = new Authorizer(req.user).create();

// #2
 if(authorized) {
   let newWiki = {
     title: req.body.title,
     description: req.body.description
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

     // #1
         wikiQueries.deleteWiki(req, (err, wiki) => {
           if(err){
             res.redirect(err, `/wikis/${req.params.id}`)
           } else {
             res.redirect(303, "/wikis")
           }
         });
       },

    edit(req, res, next){

 // #1
     wikiQueries.getWiki(req.params.id, (err, wiki) => {
       if(err || wiki == null){
         res.redirect(404, "/");
       } else {

 // #2
         const authorized = new Authorizer(req.user, wiki).edit();

 // #3
         if(authorized){
           res.render("wikis/edit", {wiki});
         } else {
           req.flash("You are not authorized to do that.")
           res.redirect(`/wikis/${req.params.id}`)
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
