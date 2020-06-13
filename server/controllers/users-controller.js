'use strict';

var User = require('../models/user');
var crypto = require('crypto');
var sendEmail = require('../middleware/send-email');
var Token = require("../models/token");
// show user page

exports.getProfile = function(req, res, next){
  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  if (errorFlash.length) {
    error = errorFlash[0];
  }
  res.render(req.render, {user: req.user, form: form, error: error});
};

// Updates generic profile information

exports.postProfile = function(req, res, next){
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('name', 'Name is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect(req.redirect.failure);
  }

  if(req.body.email != req.user.email){
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if(err){
        console.log(err);
      }
      if (existingUser) {
        req.flash('errors', { msg: 'An account with that email address already exists.' });
        return res.redirect(req.redirect.failure);
      } else {
        User.findById(req.user.id, function(err, user) {
          if (err) return next(err);
          user.email = req.body.email || '';
          user.profile.name = req.body.name || '';
          user.profile.gender = req.body.gender || '';
          user.profile.location = req.body.location || '';
          user.profile.website = req.body.website || '';

          user.save(function(err) {
            if (err) return next(err);
            user.updateStripeEmail(function(err){
              if (err) return next(err);
              req.flash('success', { msg: 'Profile information updated.' });
              res.redirect(req.redirect.success);
            });
          });
        });
      }
    });
  } else {
    User.findById(req.user.id, function(err, user) {
      if (err) return next(err);
      user.profile.name = req.body.name || '';
      user.profile.gender = req.body.gender || '';
      user.profile.location = req.body.location || '';
      user.profile.website = req.body.website || '';

      user.save(function(err) {
        if (err) return next(err);
        user.updateStripeEmail(function(err){
          if (err) return next(err);
          req.flash('success', { msg: 'Profile information updated.' });
          res.redirect(req.redirect.success);
        });
      });
    });
  }
};

// Removes account

exports.deleteAccount = function(req, res, next){
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.remove(function (err, user) {
      if (err) return next(err);
      user.cancelStripe(function(err){
        if (err) return next(err);

        req.logout();
        req.flash('info', { msg: 'Your account has been deleted.' });
        res.redirect(req.redirect.success);
      });
    });
  });
};

// Adds or updates a users card.

exports.postBilling = function(req, res, next){
var stripeToken = req.body.stripeToken;
// var stripeToken = token.id;
  if(!stripeToken){
    req.flash('errors', { msg: 'Please provide a valid card.' });
    return res.redirect(req.redirect.failure);
  }

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.setCard(stripeToken, function (err) {
      if (err) {
        if(err.code && err.code == 'card_declined'){
          req.flash('errors', { msg: 'Your card was declined. Please provide a valid card.' });
          return res.redirect(req.redirect.failure);
        }
        req.flash('errors', { msg: 'An unexpected error occurred.' });
        return res.redirect(req.redirect.failure);
      }
      req.flash('success', { msg: 'Billing has been updated.' });
      res.redirect(req.redirect.success);
    });
  });

};

exports.postPlan = function(req, res, next){
  var plan = req.body.plan;
  var coupon = req.body.coupon;
  if (coupon) {
    req.user.isUsedCoupon = true;
  }
  var stripeToken = null;
  if(plan){
    plan = plan.toLowerCase();
  }

  if(req.user.stripe.plan == plan){
    req.flash('info', {msg: 'The selected plan is the same as the current plan.'});
    return res.redirect(req.redirect.success);
  }
  
  if(req.body.stripeToken){
    stripeToken = req.body.stripeToken;
  }
  if(plan != 'silver'){
    if(!req.user.stripe.last4 && !req.body.stripeToken){
      req.flash('errors', {msg: 'Please add a card to your account before choosing a plan.'});
      return res.redirect(req.redirect.failure);
    }
  }
  
  

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.setPlan(plan, coupon, stripeToken, function (err) {
      var msg;
    
      if (err) {
        if(err.code && err.code == 'card_declined'){
          msg = 'Your card was declined. Please provide a valid card.';
        } else if(err && err.message) {
          msg = err.message;
        } else {
          msg = 'An unexpected error occurred.';
        }

        req.flash('errors', { msg:  msg});
        return res.redirect(req.redirect.failure);
      }
      req.flash('success', { msg: 'Plan has been updated.' });
      res.redirect(req.redirect.success);
    });
  });
};

// POST /confirmation
exports.confirmationPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('token', 'Token cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
 
    // Check for validation errors    
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);
 
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                req.flash('success', { msg: 'Your account has been verified.' });
                res.redirect(req.redirect.success);
            });
        });
    });
};

exports.resendTokenPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
 
    // Check for validation errors    
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);
 
    User.findOne({ email: req.body.email }, function (err, user) {
      if(err) throw err;
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            sendEmail('"Phantom Asset Management" noreply@phantomam.com', user.email, 'Account Verification Token', 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n');
        });
 
    });
};

exports.postCoupon = function(req, res, next){
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

  });
};