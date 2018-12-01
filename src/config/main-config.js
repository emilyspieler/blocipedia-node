require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const passportConfig = require("./passport-config");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const async = require('async');
const sgMail = require('@sendgrid/mail');
const expressValidator = require("express-validator");
const hbs = require("hbs");
const express = require("express");
const stripe = require("stripe")("sk_test_u9RZqAdKph7uY9gbKbNg89V1");

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());
    app.use(session({
     secret: process.env.cookieSecret,
     resave: false,
     saveUninitialized: false,
     cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
   }));
   app.use(flash());
   passportConfig.init(app);

   app.use((req,res,next) => {
     res.locals.currentUser = req.user;
     next();
   })

   app.get('/paysuccess', function(req, res){
     res.render('static/paysuccess', {
     });
   });

   app.get('/charge', function(req, res){
     res.render('static/charge', {
     });
   });

   app.post('/charge', function(req, res){
     res.render('static/charge', {
     });
    });
}
}
