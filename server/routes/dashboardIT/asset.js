// packages
var moment = require('moment'),
    _ =require("lodash");
    moment().format();
    
  
// middleware
var isAuthenticated = require('../../middleware/auth').isAuthenticated,
  setRender = require('middleware-responder').setRender,
  setRedirect = require('middleware-responder').setRedirect;

// controllers
var dashboard = require('../../controllers/dashboard-controller');

// IT Model imports
var AP = require("../../models/IT/accessPoints"),  
    Cable = require("../../models/IT/cables"), 
    DeskPhone = require("../../models/IT/deskPhones"),   
    Desktop = require("../../models/IT/desktops"),
    Laptop = require("../../models/IT/laptops"), 
    MobilePhone = require("../../models/IT/mobilePhones"),
    Monitor = require("../../models/IT/monitors"),
    Printer = require("../../models/IT/printers"),   
    Projector = require("../../models/IT/projectors"),   
    Router = require("../../models/IT/routers"),
    Server = require("../../models/IT/servers"),   
    Switch = require("../../models/IT/switches"),   
    Tablet = require("../../models/IT/tablets"),  
    Custom = require("../../models/IT/custom"),
    Asset = require("../../models/IT/asset"),
    SubUser = require("../../models/IT/subuser"),
    Assign = require("../../models/IT/assign");

module.exports = function (app, passport) {
    
   // create asset
  app.get('/dashboard/it/asset/new',
    setRender('dashboard/it/assetCreate'),
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
        AP.find({"author.id":req.user.id}, function(err, allAP) {
            if(err){
                console.log(err);
            } else {
                res.locals.aps = allAP; // Set the data in locals
            }
        });
        Cable.find({"author.id":req.user.id}, function(err, allCable) {
            if(err){
                console.log(err);
            } else {
                res.locals.cables = allCable; // Set the data in locals
                
            }
        });
        DeskPhone.find({"author.id":req.user.id}, function(err, allDeskPhone) {
            if(err){
                console.log(err);
            } else {
                res.locals.deskPhones = allDeskPhone; // Set the data in locals
            }
        });
        Desktop.find({"author.id":req.user.id}, function(err, allDesktop) {
            if(err){
                console.log(err);
            } else {
                res.locals.desktops = allDesktop; // Set the data in locals
            }
        });
        Laptop.find({"author.id":req.user.id}, function(err, allLaptop) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.laptops = allLaptop; // Set the data in locals
            }
        });
        MobilePhone.find({"author.id":req.user.id}, function(err, allMobilePhone) {
            if(err){
                console.log(err);
            } else {
                res.locals.mobilephones = allMobilePhone; // Set the data in locals
            }
        });
        Monitor.find({"author.id":req.user.id}, function(err, allMonitor) {
            if(err){
                console.log(err);
            } else {
                res.locals.monitors = allMonitor; // Set the data in locals
            }
        });
        Printer.find({"author.id":req.user.id}, function(err, allPrinter) {
            if(err){
                console.log(err);
            } else {
                res.locals.printers = allPrinter; // Set the data in locals
            }
        });
        Projector.find({"author.id":req.user.id}, function(err, allProjector) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.projectors = allProjector; // Set the data in locals
            }
        });
        Router.find({"author.id":req.user.id}, function(err, allRouter) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.routers = allRouter; // Set the data in locals
            }
        });
        Server.find({"author.id":req.user.id}, function(err, allServer) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.servers = allServer; // Set the data in locals
            }
        });
        Switch.find({"author.id":req.user.id}, function(err, allSwitch) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.switches = allSwitch; // Set the data in locals
            }
        });
        Tablet.find({"author.id":req.user.id}, function(err, allTablet) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.tablets = allTablet; // Set the data in locals
            }
        });
        Custom.find({"author.id":req.user.id}, function(err, allCustom) {
            if(err){
                console.log(err);
            } else {
                res.locals.customs = allCustom; // Set the data in locals
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
    
  // create asset POST
  app.post('/dashboard/it/asset/new',
    setRender('dashboard/it/assetCreate'),
    setRedirect({auth: '/login', success: '/dashboard/it/asset/new', failure: '/dashboard/it/asset/new'}),
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
        var model = req.body.model;
        var assetNumber = req.body.assetNumber;
        var status = req.body.status;
        var serial = req.body.serial;
        var bought = moment(req.body.bought);
        var warrantyMonths = req.body.warranty;
        var warranty = moment(bought).add(warrantyMonths, "month");
        var method = req.body.method;
        var notes = req.body.notes;
        var author = {
        id: req.user._id,
        email: req.user.email
      };
        var newAsset = {
          model: model,
          assetNumber: assetNumber,
          status: status,
          serial: serial,
          bought: bought,
          warranty: warranty,
          method: method,
          notes: notes,
          author: author
        };
        req.user.assetCount = assetNumber;
      // Create a new asset and save to DB
        Asset.create(newAsset, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
          }
      });
        if(status == "ready"){
        var subuser = req.body.subuser;
        var D = req.body.checkoutDate;
        var checkoutDate= D.toString();
        var asset = req.body.assetNumber;
        var newAssign = {
          subuser: subuser,
          asset: asset,
          checkoutDate: checkoutDate,
          notes: notes, 
          author: author,
        };
        // Create a new access point and save to DB
        Assign.create(newAssign, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
          }
        });
      }
        Asset.count({"author.id":req.user.id}, (err, assetCount)=>{
            if(err){
              console.log(err);
            } else {
              var Count = JSON.stringify(assetCount +1);
              var combined = req.user.assetNumPre + '-' + Count;
              res.locals.assetCount = combined;
            }
        });
        AP.find({"author.id":req.user.id}, function(err, allAP) {
            if(err){
                console.log(err);
            } else {
                res.locals.aps = allAP; // Set the data in locals
            }
        });
        Cable.find({"author.id":req.user.id}, function(err, allCable) {
            if(err){
                console.log(err);
            } else {
                res.locals.cables = allCable; // Set the data in locals
                
            }
        });
        DeskPhone.find({"author.id":req.user.id}, function(err, allDeskPhone) {
            if(err){
                console.log(err);
            } else {
                res.locals.deskPhones = allDeskPhone; // Set the data in locals
            }
        });
        Desktop.find({"author.id":req.user.id}, function(err, allDesktop) {
            if(err){
                console.log(err);
            } else {
                res.locals.desktops = allDesktop; // Set the data in locals
            }
        });
        Laptop.find({"author.id":req.user.id}, function(err, allLaptop) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.laptops = allLaptop; // Set the data in locals
            }
        });
        MobilePhone.find({"author.id":req.user.id}, function(err, allMobilePhone) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.mobilephones = allMobilePhone; // Set the data in locals
            }
        });
        Monitor.find({"author.id":req.user.id}, function(err, allMonitor) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.monitors = allMonitor; // Set the data in locals
            }
        });
        Printer.find({"author.id":req.user.id}, function(err, allPrinter) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.printers = allPrinter; // Set the data in locals
            }
        });
        Projector.find({"author.id":req.user.id}, function(err, allProjector) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.projectors = allProjector; // Set the data in locals
            }
        });
        Router.find({"author.id":req.user.id}, function(err, allRouter) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.routers = allRouter; // Set the data in locals
            }
        });
        Switch.find({"author.id":req.user.id}, function(err, allSwitch) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.switches = allSwitch; // Set the data in locals
            }
        });
        Tablet.find({"author.id":req.user.id}, function(err, allTablet) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.tablets = allTablet; // Set the data in locals
            }
        });
        Custom.find({"author.id":req.user.id}, function(err, allCustom) {
            if(err){
                console.log(err);
            } else {
                res.locals.customs = allCustom; // Set the data in locals
            }
        });
        SubUser.find({"author.id":req.user.id}, function(err, allSubUser) {
            if(err){
                console.log(err);
            } else {
                res.locals.subusers = allSubUser; // Set the data in locals
            }
        });
        res.locals.codeType = req.user.codeType;
          res.redirect(req.redirect.success);
        });
   
   // show asset
  app.get('/dashboard/it/asset',
    setRender('dashboard/it/asset'),
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
    },
    dashboard.getDefault);  
  
  // show single asset  
  app.get('/dashboard/it/asset/:id',
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
        Asset.findById(req.params.id).exec(function(err, foundAsset){
            if(err){
                console.log(err);
            } else {
                res.locals.foundAsset =  foundAsset;
            } 
            var prefix = req.user.assetNumPre + "-";
            res.locals.prefix = prefix;
            res.locals.codeType = req.user.codeType;
            res.locals.test = prefix + foundAsset.assetNumber + '-' + foundAsset.model;
            console.log(foundAsset);
            next();
        });
    },
    setRender('dashboard/it/singleAsset'),
    dashboard.getDefault);
  
  // delete asset  
  app.delete('/dashboard/it/asset/delete/:id',
    setRender('dashboard/it/asset'),
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
       Asset.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/dashboard/it/asset");
      } else {
          res.redirect("/dashboard/it/asset");
      }
    });
    },
    dashboard.getDefault); 
    
  // update asset
  app.get('/dashboard/it/asset/update/:id',
    setRender('dashboard/it/assetUpdate'),
    setRedirect({auth: '/login'}),
    isAuthenticated,
    (req, res, next) => {
        
        
        Asset.findById(req.params.id , (err, asset) => {
            if (err) console.log(err);
           console.log(asset.model) ;
        });
        
        AP.find({"author.id":req.user.id}, function(err, allAP) {
            if(err){
                console.log(err);
            } else {
                res.locals.aps = allAP; // Set the data in locals
            }
        });
        Cable.find({"author.id":req.user.id}, function(err, allCable) {
            if(err){
                console.log(err);
            } else {
                res.locals.cables = allCable; // Set the data in locals
                
            }
        });
        DeskPhone.find({"author.id":req.user.id}, function(err, allDeskPhone) {
            if(err){
                console.log(err);
            } else {
                res.locals.deskPhones = allDeskPhone; // Set the data in locals
            }
        });
        Desktop.find({"author.id":req.user.id}, function(err, allDesktop) {
            if(err){
                console.log(err);
            } else {
                res.locals.desktops = allDesktop; // Set the data in locals
            }
        });
        Laptop.find({"author.id":req.user.id}, function(err, allLaptop) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.laptops = allLaptop; // Set the data in locals
            }
        });
        MobilePhone.find({"author.id":req.user.id}, function(err, allMobilePhone) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.mobilephones = allMobilePhone; // Set the data in locals
            }
        });
        Monitor.find({"author.id":req.user.id}, function(err, allMonitor) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.monitors = allMonitor; // Set the data in locals
            }
        });
        Printer.find({"author.id":req.user.id}, function(err, allPrinter) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.printers = allPrinter; // Set the data in locals
            }
        });
        Projector.find({"author.id":req.user.id}, function(err, allProjector) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.projectors = allProjector; // Set the data in locals
            }
        });
        Router.find({"author.id":req.user.id}, function(err, allRouter) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.routers = allRouter; // Set the data in locals
            }
        });
        Server.find({"author.id":req.user.id}, function(err, allServer) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.servers = allServer; // Set the data in locals
            }
        });
        Switch.find({"author.id":req.user.id}, function(err, allSwitch) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.switches = allSwitch; // Set the data in locals
            }
        });
        Tablet.find({"author.id":req.user.id}, function(err, allTablet) {
            if(err){
                
                console.log(err);
            } else {
                res.locals.tablets = allTablet; // Set the data in locals
            }
        });
        Custom.find({"author.id":req.user.id}, function(err, allCustom) {
            if(err){
                console.log(err);
            } else {
                res.locals.customs = allCustom; // Set the data in locals
            }
        });
        SubUser.find({"author.id":req.user.id}, function(err, allSubUser) {
            if(err){
                console.log(err);
            } else {
                res.locals.subusers = allSubUser; // Set the data in locals
                
            }
        });
        Asset.findById(req.params.id, (err, foundAsset) => {
            if(err){
                console.log(err);
            }
            res.locals.foundAsset = foundAsset;
            res.locals.assetID = req.params.id;
            next();
        });
    },
    dashboard.getDefault);
    
  // update single asset
  app.put('/dashboard/it/asset/update/:id',
    setRedirect({auth: '/login', success: '/dashboard/it/asset', failure: '/dashboard/it/asset'}),
    isAuthenticated,
    (req, res) => {
    Asset.findById(req.params.id, (err, asset) => {
        if (err) console.log(err);
        
        asset.model = req.body.model;
        asset.assetNumber = req.body.assetNumber;
        asset.status = req.body.status;
        asset.serial = req.body.serial;
        asset.bought = req.body.bought;
        asset.warranty = req.body.warranty;
        asset.method = req.body.method;
        asset.notes = req.body.notes;
        
        asset.save(() => {
            if (err) return (err);
          req.flash('success', { msg: 'Asset has been updated.' });
          res.redirect(req.redirect.success);
        });
        });
    });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};