module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const wikiRoutes = require("../routes/wiki");
    const logger = require('morgan');

    if(process.env.NODE_ENV === "test") {
         const mockAuth = require("../../spec/support/mock-auth.js");
         mockAuth.fakeIt(app);
       }

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(wikiRoutes);
    app.use(logger('dev'));

  }
}
