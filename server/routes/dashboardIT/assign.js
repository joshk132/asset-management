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
var Asset = require("../../models/IT/asset"),
    SubUser = require("../../models/IT/subuser"),
    Assign = require("../../models/IT/assign");

module.exports = function (app, passport) {
  
  // assign asset
  app.get('/dashboard/it/assign',
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
    setRender('dashboard/it/assign'),
    dashboard.getDefault);
  
  // assign asset POST
  app.post('/dashboard/it/assign',
    setRender('dashboard/it/assign'),
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
      var subuserID = req.body.subuser;
      var assetbody = req.body.asset;
      var D = req.body.checkoutDate;
      var notes = req.body.notes;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var checkoutDate= D.toString();
      Asset.findById(assetbody, function (err, foundAsset) {
        var asset = foundAsset.assetNumber;
        if (err) console.log(err);
        SubUser.findById(subuserID, function (err, foundSubUser) {
          if (err) console.log(err);
          var subuser = foundSubUser.name;
          var newAssign = {
            assetID: assetbody,
            subuser: subuser,
            subuserID: subuserID,
            asset: asset,
            checkoutDate: checkoutDate,
            notes: notes, 
            author: author,
          };
         //Create a new assign and save to DB
         Assign.create(newAssign, function(err, newlyCreated){
             if(err){
                 console.log(err);
             } else {
               console.log("Created Assign");
             }
         });
        });
      });
    next();
    },
    dashboard.getDefault); 
    
  // assigned asset show all
  app.get('/dashboard/it/assigned',
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
      Assign.find({"author.id":req.user.id}, function(err, allSubUser) {
        if(err){
          console.log(err);
        } else {
          res.locals.assigneds = allSubUser; // Set the data in locals
          
        }
        next();
      });
    },
    setRender('dashboard/it/assigned'),
    dashboard.getDefault);
    
};