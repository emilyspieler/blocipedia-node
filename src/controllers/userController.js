const passport = require("passport");
const userQueries = require("../db/queries.users.js");
const sgMail = require('@sendgrid/mail');

module.exports = {

  signUp(req, res, next){
    res.render("users/signup");
  },

   create(req, res, next){
     let newUser = {
       email: req.body.email, //form not sending body
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };

     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
     const msg = {
       to: 'emilyspieler1@gmail.com',
       from: 'test@example.com',
       subject: 'Sending with SendGrid is Fun',
       text: 'and easy to do anywhere, even with Node.js',
       html: '<strong>and easy to do anywhere, even with Node.js</strong>',
     };
     console.log(process.env.SENDGRID_API_KEY)
     sgMail.send(msg);

     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/");
       } else {


         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       }
     });
   },

  signInForm(req, res, next){
     res.render("users/sign_in");
   },

   signIn(req, res, next){
     passport.authenticate("local")(req, res, function () {
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   }
}
