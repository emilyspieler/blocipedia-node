module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const wikiRoutes = require("../routes/wiki");
    const collaborationsRoutes = require("../routes/collaborations");
    const logger = require('morgan');
    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(wikiRoutes);
    app.use(collaborationsRoutes);
    app.use(logger('dev'));

  }
}
