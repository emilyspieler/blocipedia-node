const express = require("express");
var morgan = require('morgan')
const app = express();

const routeConfig = require("./config/route-config.js");

routeConfig.init(app);

module.exports = app;
