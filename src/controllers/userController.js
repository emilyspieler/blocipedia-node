const passport = require("passport");

module.exports = {
  signUp(req, res, next){
    res.render("users/signup");
  }
}
