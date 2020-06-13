// packages
var nodemailer = require('nodemailer');

// middleware
var setRender = require('middleware-responder').setRender,
    setRedirect = require('middleware-responder').setRedirect,
    isUnauthenticated = require('../middleware/auth').isUnauthenticated,
    isAuthenticated = require('../middleware/auth').isAuthenticated,
    secrets = require('../config/secrets'),
    sendEmail = require('../middleware/send-email');

// models 
var User = require("../models/user");

// controllers
var main = require('../controllers/main-controller'),
    registrations = require('../controllers/registrations-controller'),
    passwords = require('../controllers/passwords-controller'),
    sessions = require('../controllers/sessions-controller'),
    users = require('../controllers/users-controller'),
    dashboard = require('../controllers/dashboard-controller');
    
// html templates
// var output = '<h4>We\'re super excited to have you onboard with us, we know you will love us unconditionally like that sweet puppy of yours. We like to keep things simple and easy, that\'s why we don\'t have any fancy styling or pictures in our welcoming email to you.</h4><p>To get you started on the right path, we have included some links to our documentation of helpful tutorials and articles.</p><p>These resources will teach you the basics of:</p><ul><li><a href"https://www.phantomam.com">First Link</a></li><li><a href"https://www.phantomam.com">Second Link</a></li><li><a href"https://www.phantomam.com">Third Link</a></li></ul><p>We are only sending you the most valuable information, so you can make the most of our service.</p><p>Go to the Phantom Asset Management <a href="https://www.phantomam.com">dashboard</a> now!</p><p>If you have any questions or concerns please reach out to us at any time, and we will be right on solving those for you.</p><p>You can find us at our support page <a href="https://www.phantomam.com/contact">here</a></p><p>Cheers,</p><p>Josh Kirby</p><p>CEO / Founder</p>';
// without 3 links to docs
var output = '<h4>We\'re super excited to have you onboard with us, we know you will love us unconditionally like that sweet puppy of yours. We like to keep things simple and easy, that\'s why we don\'t have any fancy styling or pictures in our welcoming email to you.</h4><p>To get you started on the right path, we have included some links to our documentation of helpful tutorials and articles.</p><p>Go to the Phantom Asset Management <a href="https://www.phantomam.com/dashboard/billing">dashboard</a> now to select your plan!</p><p>If you have any questions or concerns please reach out to us at any time, and we will be right on solving those for you.</p><p>You can find us at our support page <a href="https://www.phantomam.com/contact">here</a></p><p>Cheers,</p><p>Josh Kirby</p><p>CEO / Founder</p>';
module.exports = function (app, passport) {
// login  
  app.get('/login',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('login'),
    main.getHome);

  // sessions
  app.post('/login',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/login'}),
    isUnauthenticated,
    sessions.postLogin);
  app.get('/logout',
    setRedirect({auth: '/login', success: '/login'}),
    isAuthenticated,
    sessions.logout);

  // registrations with plan
  app.get('/signup/:plan',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('signup'),
    registrations.getSignup);
    
  // registrations
  app.get('/signup',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('signup'),
    registrations.getSignup);
    
  app.post('/signup',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup'}),
    isUnauthenticated,
    registrations.postSignup,
    (req, res) =>{
      var newUserEmail = req.body.email;
      var message = output;
      var hear = req.body.hear;
      User.findOne({ 'email' :  req.body.email },
        function(err, user) {
          if (err) return (err);
          if (!user){
            sendEmail('"Phantom Asset Management" noreply@phantomam.com', newUserEmail, 'Get the most out of your free trial', message);
            if(hear != ''){
              sendEmail('"Phantom Asset Management" noreply@phantomam.com', 'contact@phantomam.com', 'Heard about your from', 'User email: ' +newUserEmail + ', heard about you from,  ' + hear);
            }
          }
        }
      );
    });

  // forgot password
  app.get('/forgot',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('forgot'),
    passwords.getForgotPassword);
    
  app.post('/forgot',
    setRedirect({auth: '/dashboard', success: '/forgot', failure: '/forgot'}),
    isUnauthenticated,
    passwords.postForgotPassword);
    
  // reset tokens
  app.get('/reset/:token',
    setRedirect({auth: '/dashboard', failure: '/forgot'}),
    isUnauthenticated,
    setRender('reset'),
    passwords.getToken);
    
  app.post('/reset/:token',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: 'back'}),
    isUnauthenticated,
    passwords.postToken);
  
  // confirmation
  app.get('/confirmation/:token/:email',
    setRender('confirmation'),
    (req, res, next)=>{
      res.locals.token = req.params.token;
      res.locals.email = req.params.email;
      next();
    },main.getHome);
    
  app.post('/confirmation',
    setRedirect({success: '/dashboard', failure: '/resend'}),
    users.confirmationPost);

  // confirmation resend token
  app.get('/resend',
    setRender('tokenResend'),
    (req, res, next)=>{
      next();
    },main.getHome);
  
  app.post('/resend', 
    setRedirect({success: '/confirmation', failure: '/login'}),
    users.resendTokenPost);




};