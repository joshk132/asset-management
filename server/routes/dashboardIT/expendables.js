// packages
var moment = require('moment'); 
    moment().format();
     
// middleware
var isAuthenticated = require('../../middleware/auth').isAuthenticated,
  setRender = require('middleware-responder').setRender,
  setRedirect = require('middleware-responder').setRedirect,
  sendEmail = require('../../middleware/send-email');

// controllers
var dashboard = require('../../controllers/dashboard-controller');

// IT Model imports
var Expendable = require("../../models/IT/expendable"),
    SubUser = require("../../models/IT/subuser"),
    Checkout = require("../../models/IT/checkout"),
    Asset = require("../../models/IT/asset"),
    Manufacturer = require("../../models/IT/manufacturer");


module.exports = function (app, passport) {
  
    // show consumable
  app.get('/dashboard/it/expendable',
    setRender('dashboard/it/consumable'),
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
      Expendable.find({"author.id":req.user.id}, (err, allConsumable) => {
        if(err){
          console.log(err);
        } else {
          res.locals.consumables = allConsumable; // Set the data in locals
          next();
        }
      });
    },
    dashboard.getDefault);
  
  // create expendable
  app.get('/dashboard/it/expendable/new',
    setRender('dashboard/it/consumablerCreate'),
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
                res.locals.allManufacturers = allManufacturer; // Set the data in locals
            }
            next();
        });
    },
    dashboard.getDefault);
    
  // create expendable POST
  app.post('/dashboard/it/expendable/new',
    setRender('dashboard/it/consumablerCreate'),
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
      var name = req.body.name;
      var manufacturer = req.body.manufacturer;
      var category = req.body.category;
      var cost = req.body.cost;
      var bought = req.body.bought;
      var ponumber = req.body.ponumber;
      var quantity = req.body.quantity;
      var lowerLimit = req.body.lowerLimit;
      var notes = req.body.notes;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var newConsumable = {
          name: name,
          manufacturer: manufacturer,
          category: category,
          cost: cost,
          bought: bought,
          ponumber: ponumber,
          quantity: quantity,
          lowerLimit: lowerLimit,
          notes: notes,
          author: author
        };
      // Create a new asset and save to DB
      Expendable.create(newConsumable, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
            console.log("Create expendable");
          }
      });
      next();
    },
    dashboard.getDefault);
  
  // show single expendable  
  app.get('/dashboard/it/expendable/:id',
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
    res.locals.expendableID = req.params.id;  
    Expendable.findById(req.params.id).exec(function(err, foundExpendable){
        if(err){
            console.log(err);
        } else {
            res.locals.foundExpendable =  foundExpendable;
        } 
        next();
    });
    },
    setRender('dashboard/it/singleExpendable'),
    dashboard.getDefault);
  
  // checkout expendable  
  app.get('/dashboard/it/expendable/checkout/:id',
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
      res.locals.requestID = req.params.id;
      SubUser.find({"author.id":req.user.id}, function(err, allSubUser) {
        if(err){
          console.log(err);
        } else {
          res.locals.subusers = allSubUser; // Set the data in locals
          next();
        }
      });
    },
    setRender('dashboard/it/checkoutExpendable'),
    dashboard.getDefault); 
  
  // update expendable count  
  app.put('/dashboard/it/expendable/checkout',
    setRedirect({auth: '/login', success: '/dashboard/it/expendable', failure: '/dashboard/it/expendable'}),
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
      Expendable.findById(req.body.requestID, function(err, expendable) {
      if (err) return (err);
      expendable.quantity = expendable.quantity - req.body.checkoutNum;
      expendable.save(function(err) {
        if (err) return (err);
          req.flash('success', { msg: 'Expendable checked out.' });
          res.redirect(req.redirect.success);
      });
      if(req.user.stockEmail == true){
        if(expendable.quantity < expendable.lowerLimit) {
          var message = expendable.name + ' is low on stock. You might want to order some more or update your inventory levels.';
          sendEmail('noreply@phantomam.com', req.user.email, 'Stock is low!', message);
        }
      }
      });
      var subuser = req.body.subuser;
      var quantity = req.body.quantity;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      var newCheckout = {
          subuser: subuser,
          quantity: quantity,
          author: author,
        };
      Checkout.create(newCheckout, function(err, newlyCreated){
           if(err){
               console.log(err);
           } else {
             console.log("Created Checkout");
           }
       });
    }); 
     
  // update expendable quantity POST
  app.post('/dashboard/it/expendable/:id',
    setRedirect({auth: '/login', success: '/dashboard/it/expendable', failure: '/dashboard/it/expendable'}),
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
      Expendable.findById(req.params.id, function(err, expendable) {
        if (err) return (err);
        var quantity = Number(expendable.quantity);
        var order = Number(req.body.order);
        expendable.quantity = quantity + order;
        expendable.save(function(err) {
          if (err) return (err);
            req.flash('success', { msg: 'Expendable checked out.' });
            res.redirect(req.redirect.success);
        });
      });
    });
   
  // delete expendable  
  app.delete('/dashboard/it/expendable/delete/:id',
    setRender('dashboard/it/expendable'),
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
       Expendable.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/dashboard/it/expendable");
      } else {
          res.redirect("/dashboard/it/expendable");
      }
    });
    },
    dashboard.getDefault);
    
};