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
var Assign = require("../../models/IT/assign"),
    Checkin = require("../../models/IT/checkin"),
    Asset = require("../../models/IT/asset"); 

module.exports = function (app, passport) {
  
    // checkin asset
  app.get('/dashboard/it/checkin',
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
        var prefix = req.user.assetNumPre + "-";
      res.locals.prefix = prefix;
        next();
      });
      
      
    },
    setRender('dashboard/it/checkin'),
    dashboard.getDefault);
  
  // checkin asset POST
  app.post('/dashboard/it/checkin',
    setRender('dashboard/it/checkin'),
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
    var assign = req.body.assignSel;
      var outdate = req.body.outdate;
      var checkinDate = req.body.checkinDate;
      var notes = req.body.notes;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var newCheckin = {
          assign: assign,
          outdate: outdate,
          checkinDate: checkinDate,
          notes: notes, 
          author: author,
        };
      // Create a new checkin and save to DB
      Checkin.create(newCheckin, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
            console.log("Checked in asset");
          }
      }).then(
        Assign.findByIdAndRemove(assign, function(err){
          if(err){
            console.log(err);
          } else {
            console.log("Removed assign");
          }
        }));
    next();
    },
    dashboard.getDefault);
    
};