// packages

    
// middleware
var setRedirect = require('middleware-responder').setRedirect,
    isAuthenticated = require('../middleware/auth').isAuthenticated;

// controllers
var users = require('../controllers/users-controller'),
    passwords = require('../controllers/passwords-controller');

module.exports = function (app, passport) {
// user api stuff
  app.post('/user',
    setRedirect({auth: '/login', success: '/dashboard/profile', failure: '/dashboard/profile'}),
    isAuthenticated,
    users.postProfile);
  app.post('/user/billing',
    setRedirect({auth: '/login', success: '/dashboard/billing', failure: '/dashboard/billing'}),
    isAuthenticated,
    users.postBilling);
  app.post('/user/plan',
    setRedirect({auth: '/login', success: '/dashboard/billing', failure: '/dashboard/billing'}),
    isAuthenticated,
    users.postPlan);
  app.post('/user/password',
    setRedirect({auth: '/login', success: '/dashboard/settings', failure: '/dashboard/settings'}),
    isAuthenticated,
    passwords.postNewPassword);
  app.post('/user/delete',
    setRedirect({auth: '/login', success: '/'}),
    isAuthenticated,
    users.deleteAccount);

};