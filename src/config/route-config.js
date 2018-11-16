module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const logger = require('morgan');
    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(logger('dev'));
  }
}
