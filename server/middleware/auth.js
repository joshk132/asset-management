'use strict';
var User = require("../models/user"); 

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }

  res.redirect(req.redirect.auth);
};

exports.isUnauthenticated = function(req, res, next) {
  if (!req.isAuthenticated()){
    return next();
  }

  res.redirect(req.redirect.auth);
};

