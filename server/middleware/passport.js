var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var sendEmail = require('./send-email');
var crypto = require('crypto');
var Token = require("../models/token");
module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // login
  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({ 'email' :  email },
        function(err, user) {
          if (err) return done(err);
          if (!user){
            return done(null, false, req.flash('error', 'User not found'));
          }
          user.comparePassword(password, function(err, isMatch) {
            if(err){
              console.log(err);
            }
            if (isMatch) {
              // Make sure the user has been verified
              if (!user.isVerified) return done (null, false, req.flash('error', 'Your account has not been verified.' ));
              var time = 14 * 24 * 3600000;
              req.session.cookie.maxAge = time; //2 weeks
              req.session.cookie.expires = new Date(Date.now() + time);
              req.session.touch();
              return done(null, user, req.flash('success', 'Successfully logged in.'));
            } else {
              return done(null, false, req.flash('error', 'Invalid Password'));
            }
            
          });
        }
      );
    })
  );

  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      var findOrCreateUser = function(){
        User.findOne({ email: req.body.email }, function(err, existingUser) {
          if(err){
            console.log(err);
          }
          if (existingUser) {
            req.flash('form', {
              email: req.body.email
            });
            return done(null, false, req.flash('error', 'An account with that email address already exists.'));
          }
          // edit this portion to accept other properties when creating a user.
          var user = new User({
            email: req.body.email,
            password: req.body.password // user schema pre save task hashes this password
          });

          user.save(function(err) {
            if (err) return done(err, false, req.flash('error', 'Error saving user.'));
            
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
            if (err) return done(null, false, req.flash('error', err.message));
            var email = req.body.email;
            // Send the email
            var message = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\/' + email + '\n';
            sendEmail('"Phantom Asset Management" noreply@phantomam.com', user.email, 'Account Verification Token', message);
            });
            var time = 14 * 24 * 3600000;
            req.session.cookie.maxAge = time; //2 weeks
            req.session.cookie.expires = new Date(Date.now() + time);
            req.session.touch();
            return done(null, user, req.flash('success', 'A verification email has been sent to ' + user.email + '.'));
          });
        });
      };

      process.nextTick(findOrCreateUser);

    })
  );
};
