// packages
var moment = require('moment');
    moment().format();
   
// models
var User = require("../models/user"),
  Asset = require("../models/IT/asset");
   
    
// middleware
var isAuthenticated = require('../middleware/auth').isAuthenticated,
  setRender = require('middleware-responder').setRender,
  setRedirect = require('middleware-responder').setRedirect,
  sendEmail = require('../middleware/send-email');

// controllers
var dashboard = require('../controllers/dashboard-controller');


module.exports = function (app, passport) {
// user stuff  

  // settings index
  app.get('/dashboard/settings',
    setRender('dashboard/settings'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
    },
    dashboard.getDefault);
  
  // get notifications  
  app.get('/dashboard/settings/notifications',
    setRender('dashboard/settings/notifications'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
      res.locals.newsletterEmail = req.user.newsletterEmail;
      res.locals.lowerLimitEmail = req.user.lowerLimitEmail;
      res.locals.featuresEmail = req.user.featuresEmail;
      res.locals.assetOut180 = req.user.assetOut180;
      res.locals.lowerLimit = req.user.lowerLimit;
      res.locals.stockEmail = req.user.stockEmail;
    },
    dashboard.getDefault);
  
  // put notifications  
  app.put('/dashboard/settings/notifications',
    setRedirect({auth: '/login', success: '/dashboard/settings/notifications', failure: '/dashboard/settings/notifications'}),
    isAuthenticated,
    (req, res) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      User.findById(req.user.id, function(err, user) {
        if (err) return (err);
        user.newsletterEmail = req.body.newsletterEmail || false;
        user.lowerLimitEmail = req.body.lowerLimitEmail || false;
        user.featuresEmail = req.body.featuresEmail || false;
        user.stockEmail = req.body.stockEmail || true;
        user.assetOut180 = req.body.assetOut180 || false;
        user.lowerLimit = req.body.lowerLimit || false;
        user.save(function(err) {
        if (err) return (err);
          req.flash('success', { msg: 'Notification Settings Updated.' });
          res.redirect(req.redirect.success);
        });
      });
    });
  
  // get barcodes  
  app.get('/dashboard/settings/barcodes',
    setRender('dashboard/settings/barcodes'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
      res.locals.codeType = req.user.codeType;
      res.locals.test = 'example';
    },
    dashboard.getDefault);
  
  // post barcodes  
  app.post('/dashboard/settings/barcodes',
    setRedirect({auth: '/login', success: '/dashboard/settings/barcodes', failure: '/dashboard/settings/barcodes'}),
    isAuthenticated,
    (req, res) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      User.findById(req.user.id, function(err, user) {
        if (err) return (err);
        user.codeType = req.body.codeType;
        user.save(function(err) {
        if (err) return (err);
          req.flash('success', { msg: 'Bar Code Settings Updated.' });
          res.redirect(req.redirect.success);
        });
      });
      res.locals.codeType = req.user.codeType;
      res.locals.test = 'example';
    });
  
  // get labels  
  app.get('/dashboard/settings/labels',
    setRender('dashboard/settings/labels'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
      res.locals.perpage = req.user.perpage;
      res.locals.width = req.user.width;
      res.locals.length = req.user.length;
      res.locals.font = req.user.font;
      res.locals.name = req.user.name;
      res.locals.assetnumber = req.user.assetnumber;
    },
    dashboard.getDefault);  
  
  // post labels  
  app.post('/dashboard/settings/labels',
    setRedirect({auth: '/login', success: '/dashboard/settings/labels', failure: '/dashboard/settings/labels'}),
    isAuthenticated,
    (req, res) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      User.findById(req.user.id, function(err, user) {
        if (err) return (err);
        user.perpage = req.body.codeType;
        user.width = req.body.width;
        user.length = req.body.length;
        user.font = req.body.font;
        user.name = req.body.name;
        user.assetnumber = req.body.assetnumber;
        user.save(function(err) {
        if (err) return (err);
          req.flash('success', { msg: 'Label Settings Updated.' });
          res.redirect(req.redirect.success);
        });
      });
    });
  
  // get ldap  
  app.get('/dashboard/settings/ldap',
    setRender('dashboard/settings/ldap'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
    },
    dashboard.getDefault);
  
  // get backups  
  app.get('/dashboard/settings/backups',
    setRender('dashboard/settings/backups'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
    },
    dashboard.getDefault);
  
  // get asset numer  
  app.get('/dashboard/settings/assetNumber',
    setRender('dashboard/settings/assetNumbers'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
      res.locals.prefix = req.user.assetNumPre;
    },
    dashboard.getDefault);   
  
  // put asset number
  app.put('/dashboard/settings/assetNumber',
    setRedirect({auth: '/login', success: '/dashboard/settings/assetNumber', failure: '/dashboard/settings/assetNumber'}),
    isAuthenticated,
    (req, res) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      User.findById(req.user.id, function(err, user) {
      if (err) return (err);
      user.assetNumPre = req.body.prefix || 'pre';
      user.save(function(err) {
        if (err) return (err);
          req.flash('success', { msg: 'Asset Number Prefix updated.' });
          res.redirect(req.redirect.success);
      });
    });
      
    res.locals.prefix = req.user.assetNumPre;
    });
  
  // security  
  app.get('/dashboard/settings/security',
    setRender('dashboard/settings/security'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
    },
    dashboard.getDefault);
  
  // delete account  
  app.get('/dashboard/settings/deleteAccount',
    setRender('dashboard/settings/delete'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
          next();
        }
      });
    },
    dashboard.getDefault);
  
  // post feedback  
  app.post('/settings/delete/feedback'),
    setRender('dashboard/settings/delete'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      var name = req.body.name;
      var reason = req.body.reason;
      var explanation = req.body.explanation;
      var message = name + "" + reason + "" + explanation;
      sendEmail('noreply@phantomam.com', 'feedback@phantomam.com', 'User Deleted their account here is their feedback', message);
    };
    
};