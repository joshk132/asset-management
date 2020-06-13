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
var License = require("../../models/IT/license"),
    SubUser = require("../../models/IT/subuser"),
    Asset = require("../../models/IT/asset");


module.exports = function (app, passport) {
  
  // show license
  app.get('/dashboard/it/license',
    setRender('dashboard/it/license'),
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
      License.find({"author.id":req.user.id}, function(err, allLicense) {
        if(err){
          console.log(err);
        } else {
          res.locals.licenses = allLicense; // Set the data in locals
          next();
        }
      });
    },
    dashboard.getDefault);
    
  //create license
  app.get('/dashboard/it/license/new',
    setRender('dashboard/it/licenseCreate'),
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
    
  //create license POST
  app.post('/dashboard/it/license/new',
    setRedirect({auth: '/login', success: '/dashboard/it/license/new', failure: '/dashboard/it/license/new'}),
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
      var productKey = req.body.productKey;
      var creator = req.body.creator;
      var licensedtoPerson = req.body.licensedtoPerson;
      var licensedtoEmail = req.body.licensedtoEmail;
      var cost = req.body.cost;
      var bought = moment(req.body.bought);
      var warrantyMonths = req.body.expiration;
      var expiration = moment(bought).add(warrantyMonths, "month");
      var ponumber = req.body.ponumber;
      var notes = req.body.notes;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var newLicense = {
          name,
          productKey,
          creator,
          licensedtoPerson,
          licensedtoEmail,
          cost,
          bought,
          expiration,
          ponumber,
          notes,
          author
        };
      // Create a new asset and save to DB
      License.create(newLicense, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
            req.flash('success', { msg: 'License has been created.' });
          //res.redirect(req.redirect.success);
          }
      });
      });
  
  // show single license  
  app.get('/dashboard/it/license/:id',
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
    License.findById(req.params.id).exec(function(err, foundLicense){
        if(err){
            console.log(err);
        } else {
            res.locals.foundLicense =  foundLicense;
        } 
        next();
    });
    },
    setRender('dashboard/it/singleAsset'),
    dashboard.getDefault);
    
  // delete license  
  app.delete('/dashboard/it/license/delete/:id',
    setRender('dashboard/it/license'),
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
       License.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/dashboard/it/license");
      } else {
          res.redirect("/dashboard/it/license");
      }
    });
    },
    dashboard.getDefault);
    
    
    // update single license
  app.put('/dashboard/it/license/:id',
    setRedirect({auth: '/login', success: '/dashboard/it/license', failure: '/dashboard/it/license'}),
    isAuthenticated,
    (req, res) => {
    License.findById(req.params.id, (err, license) => {
        if (err) console.log(err);
        
        license.name = req.body.name;
        license.productKey = req.body.productKey;
        license.creator = req.body.creator;
        license.licensedtoPerson = req.body.licensedtoPerson;
        license.licensedtoEmail = req.body.licensedtoEmail;
        license.cost = req.body.cost;
        license.bought = moment(req.body.bought);
        license.warrantyMonths = req.body.expiration;
        license.expiration = moment(license.bought).add(license.warrantyMonths, "month");
        license.ponumber = req.body.ponumber;
        license.notes = req.body.notes;
        
        license.save(() => {
            if (err) return (err);
          req.flash('success', { msg: 'License has been updated.' });
          res.redirect(req.redirect.success);
        });
        });
    });

  // update asset
  app.get('/dashboard/it/license/update/:id',
    setRender('dashboard/it/licenseUpdate'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
      License.findById(req.params.id, (err, License) => {
            if(err){
                console.log(err);
            }
            res.locals.License = License;
            res.locals.licenseID = req.params.id;
        
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
    
};