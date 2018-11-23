const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const userController = require("../controllers/userController");

router.get("/users/sign_up", userController.signUp);
router.post("/users/signUp", userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", userController.signUp);
router.get("/users/sign_out", userController.signOut);

router.get("users/sign_up", function(req, res){
const msg = {
  to: 'emilyspieler1@gmail.com',
  from: 'no-reply@emilyspielerphotography.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
});


module.exports = router;
