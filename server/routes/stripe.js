// packages
var express = require("express"),
    nodemailer = require('nodemailer');

// config
var secrets = require('../config/secrets');

// middleware
var sendEmail = require('../middleware/send-email');

// models
var User = require("../models/user"); 

// html templates
var outputReminderTrial = '<h4>Remindner to finish signing up for Phantom Asset Management</h4><p>This is just a friendly email to let you know that you have not yet entered your payment info for Phantom Asset Management yet. We encourage you to do this soon as you have 3 days remaining in your trial. Don\'t want you unable to keep track of everything.</p><p>Go to the Phantom Asset Management Billing <a href=\"https://www.phantomam.com/dashboard/billing\">dashboard</a> now!</p><p>If you have any questions or concerns please reach out to us at any time, and we will be right on solving those for you.</p><p>You can find us at our support page <a href=\"https://www.phantomam.com/support\">here</a></p><p>Cheers,</p><p>Josh Kirby</p><p>CEO / Founder</p>';

module.exports = function (app, passport) {
// use this url to receive stripe webhook events
  app.post('/stripe/events', (req, res) =>{
    console.log("Stripe event type: ", req.body.type);
    if(req.body.type == "customer.subscription.trial_will_end"){
      User.findOne({"stripe.customerId": req.body.data.object.customer}, function(err, result) {
        if(err){
          console.log(err);
        }
        if(!result.stripe.last4){
          var newUserEmail = result.email;
          var message = outputReminderTrial;
          sendEmail('"Phantom Asset Management" noreply@phantomam.com', newUserEmail, 'Three days left before your trial ends', message);
        }
      });
    }
    if(req.body.type == "customer.subscription.updated"){
      User.findOne({"stripe.customerId": req.body.data.object.customer}, function(err, result) {
        if(err){
          console.log(err);
        }
        
        if(req.body.data.object.status == "active"){
          User.stripe.is_active = true;
        }else {
          User.stripe.is_active = false;
        }
        
        if(req.body.data.object.status == "trialing"){
          User.stripe.is_trial = true;
        } else {
          User.stripe.is_trial = false;
        }
        
        if(req.body.data.object.status == "past_due"){
          User.stripe.is_trial = false;
          User.stripe.is_active = false;
        }
        
        if(req.body.data.object.status == "canceled"){
          User.stripe.is_trial = false;
          User.stripe.is_active = false;
        } 
        
        if(req.body.data.object.status == "unpaid"){
          User.stripe.is_trial = false;
          User.stripe.is_active = false;
        } 
        });
    }
    res.status(200).end();
  });

};