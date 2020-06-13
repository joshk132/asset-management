// packages
var express = require("express"),
    nodemailer = require('nodemailer');
// models
var Asset = require("../models/IT/asset");

// middleware
var setRender = require('middleware-responder').setRender,
    setRedirect = require('middleware-responder').setRedirect,
    secrets = require('../config/secrets'),
    sendEmail = require('../middleware/send-email');

// controllers
var main = require('../controllers/main-controller');

module.exports = function (app, passport) {
// asset count for sidebar
  app.use('*', (req, res, next) => {
    if(!req.user == null){
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
       if(err){
          console.log(err);
          res.status(500).send(err);
        } else {
          req.Count = JSON.stringify(assetCount);
          next();
        }
      });
    } else {
      next();
    }   
  });

  // homepage and dashboard
  app.get('/',
    setRender('front/index'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - Simple asset management';
      next();
    },
    main.getHome);
    
    // about 
  app.get('/about',
    setRender('front/about'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - About Us';
      next();
    },
    main.getHome);
  
  // contact
  app.get('/contact',
    setRender('front/contact'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - Contact';
      next();
    },
    main.getHome);
    
  // contact POST
  app.post('/contact',
    setRender('front/contact'),
    setRedirect({auth: '/dashboard'}),
    (req, res) =>{
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var messagepre = req.body.message;
      var message = firstname + " " + lastname + " " + messagepre;
      var newUserEmail = req.body.email;
      sendEmail('"Contact Page" noreply@phantomam.com', newUserEmail, 'New Contact Email', message);
    });
  
  // faqs
  app.get('/faqs',
    setRender('front/faqs'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - FAQs';
      next();
    },
    main.getHome);
  
  // features
  app.get('/features',
    setRender('front/features'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - Features';
      next();
    },
    main.getHome);
    
    // pricing
  app.get('/pricing',
    setRender('front/pricing'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - Pricing';
      next();
    },
    main.getHome);
    
    // privacy-policy
  app.get('/privacy-policy',
    setRender('front/privacy-policy'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - Privacy Policy';
      next();
    },
    main.getHome);
    
  // eula
  app.get('/eula',
    setRender('front/eula'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - EULA';
      next();
    },
    main.getHome);
  
  // terms and conditions
  app.get('/terms-and-conditions',
    setRender('front/termsandconditions'),
    (req, res, next) => {
      res.locals.title = 'PhantomAM - Terms and Conditions';
      next();
    },
    main.getHome);
  
};