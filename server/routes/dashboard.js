// packages
var nodemailer = require('nodemailer');

// it model
var AP = require("../models/IT/accessPoints"),
    Asset = require("../models/IT/asset"),
    License = require("../models/IT/license"), 
    Consumable = require("../models/IT/expendable"), 
    SubUser = require("../models/IT/subuser"), 
    Assign = require("../models/IT/assign"); 

// middleware
var isAuthenticated = require('../middleware/auth').isAuthenticated,
    setRender = require('middleware-responder').setRender,
    setRedirect = require('middleware-responder').setRedirect,
    secrets = require('../config/secrets'),
    sendEmail = require('../middleware/send-email');


// controllers
var dashboard = require('../controllers/dashboard-controller');

module.exports = function (app, passport) {

  app.use('*', (req, res, next) => {
    var str = String(req.params[0]);
    var flair = str.replace("https://phantomam.com", " ");
    var foo = flair.replace("/", " ");
    var bar = foo.replace("/", " ");
    var blah = bar.replace("/", " ");
    res.locals.title = blah.replace("it", " "); 
  next();
  });
    
  // dashboard issue
  app.get('/dashboard/issue',
    setRender('dashboard/issue'),
    setRedirect({auth:'/login'}),
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
    
  // dashboard issue POST
  app.post('/dashboard/issue',
    setRender('dashboard/issue'),
    setRedirect({auth:'/login'}),
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
      var type = req.body.type;
      var issue = req.body.issue;
      var user = req.user.email;
      var message = issue;
      sendEmail(user, 'issues@phantomam.com', 'Dashboard Issue', 'Issue type: ' + type + 'Issue Message: ' + message);
      sendEmail('noreply@phanotmam.com', user, 'Dashboard Issue', 'Issue type: ' + type + 'Issue Message: ' + message + ' Thank you for reporting this issue. We follow up on every issue sent to us within 24 hours.');
      
    },
    dashboard.getDefault);
    
  // dashboard
  app.get('/dashboard',
    setRender('dashboard/index'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      
      SubUser.count({"author.id":req.user.id}, (err, subUserCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(subUserCount);
          res.locals.subUserCount = Count;
        }
      });
      
      Consumable.count({"author.id":req.user.id}, (err, ConsumableCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(ConsumableCount);
            res.locals.ConsumableCount = Count;
        }
      });
      
      License.count({"author.id":req.user.id}, (err, licenseCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(licenseCount);
          res.locals.licenseCount = Count;
        }
      });
      Assign.find({"author.id":req.user.id}, function(err, allAssign) {
        if(err){
          console.log(err);
        } else {
          res.locals.assigns = allAssign; // Set the data in locals
        }
      });
      Asset.find({"author.id":req.user.id}, function(err, allAsset) {
        if(err){
          console.log(err);
        } else {
          res.locals.assets = allAsset; // Set the data in locals
          next();
        }
      });
      var prefix = req.user.assetNumPre + "-";
      res.locals.prefix = prefix;
    },
    dashboard.getDefault);
   
  // post feedback  
  app.post('/dashboard/feedback'),
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
      var feature = req.body.feature;
      var message = feature;
      sendEmail('noreply@phantomam.com', 'feedback@phantomam.com', 'Dashboard Feedback', message);
    };
  
  // profile  
  app.get('/dashboard/profile',
    setRender('dashboard/profile'),
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
      req.user.profile.is_done_tour = true;
    },
    dashboard.getProfile);
    
  // billing
  app.get('/dashboard/billing',
    setRender('dashboard/billing'),
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
      res.locals.user = req.user;
      res.locals.coupon = req.user.isUsedCoupon;
      res.locals.key = secrets.stripeOptions.stripePubKey;
     
    },
    dashboard.getBilling);
    
  // show subuser
  app.get('/dashboard/user',
    setRender('dashboard/user'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      SubUser.find({"author.id":req.user.id}, function(err, allSubUser) {
            if(err){
                console.log(err);
            } else {
                res.locals.subusers = allSubUser; // Set the data in locals
                next();
            }
        });
    },
    dashboard.getDefault);
    
  //create subuser
  app.get('/dashboard/user/new',
    setRender('dashboard/userCreate'),
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
    
  //show single subuser
  app.get('/dashboard/user/:id',
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      SubUser.findById(req.params.id).exec(function(err, foundSubuser){
        if(err){
            console.log(err);
        } else {
            res.locals.foundSubuser =  foundSubuser;
        } 
        next();
      });
    },
    setRender('dashboard/singleUser'),
    dashboard.getDefault);
    
  //create subuser POST
  app.post('/dashboard/user/new',
    setRender('dashboard/userCreate'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      var name = req.body.name;
      var title = req.body.title;
      var email = req.body.email;
      var employeeNumber = req.body.employeeNumber;
      var phoneNumber = req.body.phoneNumber;
      var company = req.body.company;
      var department = req.body.department;
      var office = req.body.office;
      var notes = req.body.notes;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var newSubUser = {
          name: name,
          title: title,
          email: email,
          employeeNumber: employeeNumber,
          phoneNumber: phoneNumber,
          company: company,
          department: department,
          office: office,
          notes: notes,
          author:author
        };
      // Create a new access point and save to DB
      SubUser.create(newSubUser, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
          }
      });
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
    
  // delete subuser  
  app.delete('/dashboard/user/delete/:id',
    setRender('dashboard/user'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
       SubUser.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/dashboard/user");
      } else {
          res.redirect("/dashboard/user");
          next();
      }
    });
    },
    dashboard.getDefault);
    
  // show labels
  app.get('/dashboard/it/labels',
    setRender('dashboard/it/labels'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      Asset.find({"author.id": req.user.id}, function(err, allAsset) {
        if(err){
          console.log(err);
        } else {
          res.locals.assets = allAsset; // Set the data in locals
          next();
        }
      });
      var prefix = req.user.assetNumPre + "-";
      res.locals.prefix = prefix;
      res.locals.codeType = req.user.codeType;
      res.locals.perpage = req.user.perpage;
      res.locals.width = req.user.width;
      res.locals.length = req.user.length;
      res.locals.font = req.user.font;
      res.locals.textname = req.user.profile.name;
    },
    dashboard.getDefault);  
  
  // show reports
  app.get('/dashboard/reports',
    setRender('dashboard/reports'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
        if(err){
          console.log(err);
        } else {
          var Count = JSON.stringify(assetCount);
          res.locals.assetCount = Count;
        }
      });
      Assign.find({"author.id":req.user.id}, function(err, allAssign) {
        if(err){
          console.log(err);
        } else {
          res.locals.assigns = allAssign; // Set the data in locals
        }
      });
      Asset.find({"author.id":req.user.id}, function(err, allAsset) {
        if(err){
          console.log(err);
        } else {
          res.locals.assets = allAsset; // Set the data in locals
          next();
        }
      });
      var prefix = req.user.assetNumPre + "-";
      res.locals.prefix = prefix;
      
      
    },
    dashboard.getDefault);  
    
    
};