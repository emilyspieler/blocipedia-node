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
   },

   upgrade(req, res, next){
     res.render("users/upgrade");
   },

   downgrade(req, res, next){
     res.render("users/downgrade");
   },

   paymentProcess(req, res){
     var token = req.body.stripeToken;
     var chargeAmount = req.body.chargeAmount;
     var charge = stripe.charges.create({
       amount: chargeAmount,
       currency: "usd",
       source: token
     },
     function (err, charge) {
       if(err & err.type === "StripeCardError"){
         console.log("your card was declined");
       }
      });
     res.redirect('/paymentsuccess');

     // way 1
     User.role = 1
     User.save().then(() => {})


   },

   downgradeForm(req, res, next){
      let newDowngrade = {
         name: req.body.name, //form not sending body
         email: req.body.email,
         description: req.body.description
       };

       sgMail.setApiKey(process.env.SENDGRID_API_KEY);
       const msg = {
         to: 'emilyspieler1@gmail.com',
         from: 'test@example.com',
         subject:  'this is the subject',
         text: 'Please refund their credit card',
         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
       };
          console.log(process.env.SENDGRID_API_KEY)
          sgMail.send(msg).then( () => {
            console.log("Successfully Sent Mail!");
          })
          .catch( error => {
            console.error(error.toString());
          });

       userQueries.createDowngrade(newDowngrade, (err, user) => {
         if(err){
           req.flash("error", err);
           console.log(err);
           res.redirect("/");
         } else {

           passport.authenticate("local")(req, res, () => {
             req.flash("notice", "You've successfully Downgraded!");
             res.redirect("/");
           })
         }
       });
     },

    upgradeUpdate(req, res, next){
      User.update(
    {role: req.params.role},
    {where: req.params.userId}
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated)
  })
  .catch(next)
 }

}
