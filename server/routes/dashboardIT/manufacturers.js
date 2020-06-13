// packages
var moment = require('moment');
    moment().format();
  
// middleware
var isAuthenticated = require('../../middleware/auth').isAuthenticated,
  setRender = require('middleware-responder').setRender,
  setRedirect = require('middleware-responder').setRedirect;

// controllers
var dashboard = require('../../controllers/dashboard-controller');

// IT Model imports
var Manufacturer = require("../../models/IT/manufacturer");
var Asset = require("../../models/IT/asset");
   

module.exports = function (app, passport) {
  
  // show manufacturer
  app.get('/dashboard/it/manufacturer',
    setRender('dashboard/it/manufacturer'),
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
      Manufacturer.find({"author.id":req.user.id}, function(err, allManufacturer) {
            if(err){
                console.log(err);
            } else {
                res.locals.manufacturers = allManufacturer; // Set the data in locals
                next();
            }
        });
    },
    dashboard.getDefault);
    
  //create manufacturer
  app.get('/dashboard/it/manufacturer/new',
    setRender('dashboard/it/manufacturerCreate'),
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
       next();
    },
    dashboard.getDefault);
    
    //create manufacturer POST
  app.post('/dashboard/it/manufacturer/new',
    setRender('dashboard/it/manufacturerCreate'),
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
      var manufacturer = req.body.manufacturer;
      var URL = req.body.URL;
      var supportURL = req.body.supportURL;
      var contactEmail = req.body.contactEmail;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var newManufacturer = {
          manufacturer: manufacturer,
          URL: URL,
          supportURL: supportURL,
          contactEmail: contactEmail,
          author:author
        };
      // Create a new access point and save to DB
      Manufacturer.create(newManufacturer, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
            console.log("Created Manufacturer");
          }
      });
      next();
    },
    dashboard.getDefault);
    
  // delete manufacturer  
  app.delete('/dashboard/it/manufacturer/delete/:id',
    setRender('dashboard/it/manufacturer'),
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
       Manufacturer.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/dashboard/it/manufacturer");
      } else {
          res.redirect("/dashboard/it/manufacturer");
      }
    });
    },
    dashboard.getDefault);
    
  // show single license  
  app.get('/dashboard/it/manufacturer/:id',
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
    Manufacturer.findById(req.params.id).exec(function(err, foundManufacturer){
        if(err){
            console.log(err);
        } else {
            res.locals.foundManufacturer =  foundManufacturer;
        } 
        next();
    });
    },
    setRender('dashboard/it/singleManufacturer'),
    dashboard.getDefault);  
    
};