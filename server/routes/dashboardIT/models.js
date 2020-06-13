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
    Switch = require("../../models/IT/switches"),   
    Server = require("../../models/IT/servers"),   
    Tablet = require("../../models/IT/tablets"),  
    Custom = require("../../models/IT/custom"),
    Asset = require("../../models/IT/asset"),
    Manufacturer = require("../../models/IT/manufacturer");

module.exports = function (app, passport) {



// show model  
  app.get('/dashboard/it/model',
    setRender('dashboard/it/model'),
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
                console.log("Reached if");
                console.log(err);
                
            } else {
                res.locals.laptops = allLaptop; // Set the data in locals
            }
        });
        
        MobilePhone.find({"author.id":req.user.id}, function(err, allMobilePhone) {
            if(err){
                console.log("Reached if");
                console.log(err);
                
            } else {
                res.locals.mobilephones = allMobilePhone; // Set the data in locals
                
            }
        });
        
        Monitor.find({"author.id":req.user.id}, function(err, allMonitor) {
            if(err){
                console.log("Reached if");
                console.log(err);
                
            } else {
                res.locals.monitors = allMonitor; // Set the data in locals
                
            }
        });
        
        Printer.find({"author.id":req.user.id}, function(err, allPrinter) {
            if(err){
                console.log("Reached if");
                console.log(err);
                
            } else {
                res.locals.printers = allPrinter; // Set the data in locals
                
            }
        });
        
        Projector.find({"author.id":req.user.id}, function(err, allProjector) {
            if(err){
                console.log("Reached if");
                console.log(err);
                
            } else {
                res.locals.projectors = allProjector; // Set the data in locals
                
            }
        });
        
        Router.find({"author.id":req.user.id}, function(err, allRouter) {
            if(err){
                console.log("Reached if");
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
                console.log("Reached if");
                console.log(err);
                
            } else {
                res.locals.switches = allSwitch; // Set the data in locals
                
            }
        });
        
        Tablet.find({"author.id":req.user.id}, function(err, allTablet) {
            if(err){
                console.log("Reached if");
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
                next();
            }
        });
       
    },
    dashboard.getDefault);
  
  // create model
  app.get('/dashboard/it/model/new',
    setRender('dashboard/it/modelCreate'),
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

    // create model POST
  app.post('/dashboard/it/model/new',
    setRender('dashboard/it/modelCreate'),
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
      var type = req.body.type;
      var manufacturer = req.body.manufacturer;
      var name = req.body.name;
      var model = req.body.model;
      var notes = req.body.notes;
      var signout = req.body.signout;
      var range = req.body.range;
      var bands = req.body.bands;
      var channel = req.body.channels;
      var poe = req.body.poe;
      var cableType = req.body.cableType;
      var cost = req.body.cost;
      var cpu = req.body.cpu;
      var ram = req.body.ram;
      var gpu = req.body.gpu;
      var vram = req.body.vram;
      var numDrive = req.body.numDrive;
      var sizeDrive = req.body.sizeDrive;
      var typeDrive = req.body.typeDrive;
      var lifeExpectancy = req.body.life;
      var usbPorts = req.body.usbPorts;
      var os = req.body.os;
      var resolution = req.body.resolution;
      var panelType = req.body.panelType;
      var speed = req.body.speed;
      var numPorts = req.body.numPorts;
      var custom = req.body.custom;
      var serveNname = req.body.serveNname;
      var cpuNum = req.body.cpuNum;
      var driveCap = req.body.driveCap;
      var driveNum = req.body.driveNum;
      var author = {
        id: req.user._id,
        email: req.user.email
      };
      
    if(type=="aps"){
      var newAccessPoint = {
          type: type,
          name: name,
          manufacturer: manufacturer,
          model: model,
          range: range, 
          bands: bands,
          channel: channel,
          poe: poe,
          cost: cost,
          notes: notes,
          signout: signout,
          author:author
        };
      // Create a new access point and save to DB
      AP.create(newAccessPoint, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
            console.log("Created AP");
          }
      });
    }
    
    if(type=="cables"){
      var newCable = {
        name: name,
        type: type,
        cableType: cableType,
        cost: cost,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new cable and save to DB
    Cable.create(newCable, function(err, newlyCreated){
        if(err){
          console.log(err);
        } else {
          console.log("Created Cable");
        }
    });
    }
      
    if(type=="deskPhones"){
      var newDeskPhone = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        cost: cost,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new desk phone and save to DB
    DeskPhone.create(newDeskPhone, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="desktops"){
      var newDesktop = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        notes: notes,
        signout: signout,
        cpu: cpu,
        ram: ram,
        gpu: gpu,
        vram: vram,
        numDrive: numDrive,
        sizeDrive: sizeDrive,
        typeDrive: typeDrive,
        lifeExpectancy: lifeExpectancy,
        usbPorts: usbPorts,
        cost: cost,
        author:author
      };
    // Create a new campground and save to DB
    Desktop.create(newDesktop, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="laptops"){
      var newLaptop = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        notes: notes,
        signout: signout,
        cpu: cpu,
        ram: ram,
        gpu: gpu,
        vram: vram,
        sizeDrive: sizeDrive,
        typeDrive: typeDrive,
        cost: cost,
        lifeExpectancy: lifeExpectancy,
        usbPorts: usbPorts,
        author:author
      };
    // Create a new campground and save to DB
    Laptop.create(newLaptop, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="mobilePhones"){
      var newMobilePhone = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        lifeExpectancy: lifeExpectancy,
        cost: cost,
        notes: notes,
        signout: signout,
        os: os,
        author:author
      };
    // Create a new campground and save to DB
    MobilePhone.create(newMobilePhone, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="monitors"){
      var newMonitor = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        cost: cost,
        lifeExpectancy: lifeExpectancy,
        resolution: resolution,
        panelType: panelType,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new campground and save to DB
    Monitor.create(newMonitor, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="printers"){
      var newPrinter = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        cost: cost,
        lifeExpectancy: lifeExpectancy,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new campground and save to DB
    Printer.create(newPrinter, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="projectors"){
      var newProjector = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        resolution: resolution,
        cost: cost,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new campground and save to DB
    Projector.create(newProjector, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="routers"){
      var newRouter = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        speed: speed,
        lifeExpectancy: lifeExpectancy,
        poe: poe,
        cost: cost,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new campground and save to DB
    app.create(newRouter, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    }); 
    }
    
    if(type=="servers"){
      var newServer = {
          name: name,
          manufacturer: manufacturer,
          model: model,
          type: type,
          cpu: cpu,
          cpuNum: cpuNum, 
          ram: ram,
          driveNum: driveNum,
          driveCap: driveCap,
          cost: cost,
          notes: notes,
          signout: signout,
          author:author
        };
      // Create a new access point and save to DB
      Server.create(newServer, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
          }
      });
    }
    
    if(type=="switches"){
      var newSwitch = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        speed: speed,
        lifeExpectancy: lifeExpectancy,
        poe: poe,
        numPorts: numPorts,
        cost: cost,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new campground and save to DB
    Switch.create(newSwitch, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
    }
    
    if(type=="tablets"){
      var newTablet = {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        lifeExpectancy: lifeExpectancy,
        ram: ram,
        resolution: resolution,
        cost: cost,
        notes: notes,
        signout: signout,
        author:author
      };
    // Create a new campground and save to DB
    Tablet.create(newTablet, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    }); 
    }
    
    if(type=="other"){
      var newCustom= {
        name: name,
        type: type,
        manufacturer: manufacturer,
        model: model,
        cost: cost,
        custom1: custom[0],
        custom2: custom[1],
        custom3: custom[2],
        custom4: custom[3],
        custom5: custom[4],
        author:author
      };
    // Create a new campground and save to DB
    Custom.create(newCustom, function(err, newlyCreated){
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
    });
    
    next();
    },
    dashboard.getDefault);  
    
    // show single model  
  app.get('/dashboard/it/model/:id',
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
    AP.findById(req.params.id).exec(function(err, foundAP){
        if(err){
            console.log(err);
        } else {
            res.locals.foundAP =  foundAP;
        } 
    });
    
    Cable.findById(req.params.id).exec(function(err, foundCable){
        if(err){
            console.log(err);
        } else {
            res.locals.foundCable =  foundCable;
        } 
    });
    
    DeskPhone.findById(req.params.id).exec(function(err, foundDeskPhone){
        if(err){
            console.log(err);
        } else {
            res.locals.foundDeskPhone =  foundDeskPhone;
        } 
    });
    
    Desktop.findById(req.params.id).exec(function(err, foundDesktop){
        if(err){
            console.log(err);
        } else {
            res.locals.foundDesktop =  foundDesktop;
        } 
    });
    
    Laptop.findById(req.params.id).exec(function(err, foundLaptop){
        if(err){
            console.log(err);
        } else {
            res.locals.foundLaptop =  foundLaptop;
        } 
    });
    
    MobilePhone.findById(req.params.id).exec(function(err, foundMobilePhone){
        if(err){
            console.log(err);
        } else {
            res.locals.foundMobilePhone =  foundMobilePhone;
        } 
    });
    
    Monitor.findById(req.params.id).exec(function(err, foundMonitor){
        if(err){
            console.log(err);
        } else {
            res.locals.foundMonitor =  foundMonitor;
        } 
    });
    
    Printer.findById(req.params.id).exec(function(err, foundPrinter){
        if(err){
            console.log(err);
        } else {
            res.locals.Printer =  Printer;
        } 
    });

    Projector.findById(req.params.id).exec(function(err, foundProjector){
        if(err){
            console.log(err);
        } else {
            res.locals.foundProjector =  foundProjector;
        } 
    });
    
    Router.findById(req.params.id).exec(function(err, foundRouter){
        if(err){
            console.log(err);
        } else {
            res.locals.foundRouter =  foundRouter;
        } 
    });
    
    Server.findById(req.params.id).exec(function(err, foundServer){
        if(err){
            console.log(err);
        } else {
            res.locals.foundAP =  foundServer;
        } 
    });
    
    Switch.findById(req.params.id).exec(function(err, foundSwitch){
        if(err){
            console.log(err);
        } else {
            res.locals.foundSwitch =  foundSwitch;
        } 
    });
    
    Tablet.findById(req.params.id).exec(function(err, foundTablet){
        if(err){
            console.log(err);
        } else {
            res.locals.foundTablet =  foundTablet;
        } 
    });
    
    Custom.findById(req.params.id).exec(function(err, foundCustom){
        if(err){
            console.log(err);
        } else {
            res.locals.foundCustom =  foundCustom;
        } 
        next();
    });
    },
    setRender('dashboard/it/singleModel'),
    dashboard.getDefault);
    
  // delete model  
  app.delete('/dashboard/it/model/delete/:id',
    // setRender('dashboard/it/model'),
    // setRedirect({auth: '/login', success: '/dashboard/it/model'}),
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
      AP.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Cable.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      DeskPhone.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Desktop.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Laptop.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      MobilePhone.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Monitor.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Printer.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Projector.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Router.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Switch.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Tablet.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      });
      Custom.findByIdAndRemove(req.params.id, function(err){
      if(err){
          
      } else {
          
      }
      res.redirect("/dashboard/it/model");
      });
      // next();
    },
    dashboard.getDefault);
    
};