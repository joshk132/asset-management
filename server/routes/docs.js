// packages


// middleware
var setRender = require('middleware-responder').setRender;

// controllers
var main = require('../controllers/main-controller');

module.exports = function (app, passport) {
// docs
  app.get('/docs',
    setRender('docs/index'),
    main.getHome);

};