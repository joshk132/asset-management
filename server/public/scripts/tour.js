if(location.href == 'https://phantomam.com/dashboard'){
    (function(){
     
        var tour = new Tour({
            storage : false,
             steps: [
            {
              element: ".tour-step.tour-step-one",
              placement: "top",
              title: "Welcome to Phantom AM!",
              content: "This tour will guide you through some of the features we'd like to point out.",
            },
            {
              element: ".tour-step.tour-step-two",
              placement: "bottom",
              title: "Quick Tracker",
              content: "These four boxes show a quick look at what you have tracked so far.",
            },
            {
              element: ".tour-step.tour-step-three",
              placement: "right",
              title: "Add a manufacturer",
              content: "Start by adding a manufacturer.",
              
            },
            {
              element: ".tour-step.tour-step-four",
              title: "Title of my step",
              content: "Content of my step",
              path: "/dashboard/it/manufacturer/new"
            }
        ]
        });
     
        // Initialize the tour
        tour.init();
     
        // Start the tour
        tour.start();
     
    }());
}

if(location.href == 'https://phantomam.com/dashboard/it/manufacturer/new'){
    (function(){
 
        var tour = new Tour({
            storage : false,
             steps: [
            {
              element: ".tour-step.tour-step-five",
              placement: "auto right",
              title: "Save The Manufacturer",
              content: "Can't forget to save your work!"
            },
            {
              element: ".tour-step.tour-step-six",
              placement: "right",
              title: "Time For A Model!",
              content: "Got a manufacturer done, now create a model for quick asset creation.",
            },
            {
              element: ".tour-step.tour-step-seven",
              title: "Title of my step",
              content: "Content of my step",
              path: "/dashboard/it/model/new"
            },
        ]
        });
     
        // Initialize the tour
        tour.init();
     
        // Start the tour
        tour.start();
 
    }());
    
}

if(location.href == 'https://phantomam.com/dashboard/it/model/new'){
    (function(){
 
        var tour = new Tour({
            storage : false,
             steps: [
            {
              element: ".tour-step.tour-step-eight",
              placement: "auto right",
              title: "Select A Manufacturer",
              content: "Remember that manufacturer you create on the last page? Pick it!"
            },
            {
              element: ".tour-step.tour-step-nine",
              placement: "right",
              title: "Choose A Type Of Asset",
              content: "Once you figured out which asset type you want fill out the boxes you can.",
            },
            {
              element: ".tour-step.tour-step-ten",
              placement: "auto right",
              title: "Save The Model",
              content: "Can't forget to save your work!"
            },
            {
              element: ".tour-step.tour-step-eleven",
              title: "Title of my step",
              content: "Content of my step",
              path: "/dashboard/it/asset/new"
            },
        ]
        });
     
        // Initialize the tour
        tour.init();
     
        // Start the tour
        tour.start();
 
    }());
}

if(location.href == 'https://phantomam.com/dashboard/it/asset/new'){
    (function(){
 
        var tour = new Tour({
            storage : false,
             steps: [
            {
              element: ".tour-step.tour-step-twelve",
              placement: "auto right",
              title: "Select Your Model",
              content: "It's starting to come together!"
            },
            {
              element: ".tour-step.tour-step-thirteen",
              placement: "right",
              title: "Give An Asset Number",
              content: "We will assign an asset prefix later on.",
            },
            {
              element: ".tour-step.tour-step-fourteen",
              placement: "auto right",
              title: "Create The Asset",
              content: "Got that one done in no time at all."
            },
            {
              element: ".tour-step.tour-step-fifthteen",
              title: "Title of my step",
              content: "Content of my step",
              path: "/dashboard/it/asset"
            },
        ]
        });
     
        // Initialize the tour
        tour.init();
     
        // Start the tour
        tour.start();
 
    }());
}

if(location.href == 'https://phantomam.com/dashboard/it/asset'){
    (function(){
 
        var tour = new Tour({
            storage : false,
             steps: [
            {
              element: ".tour-step.tour-step-sixteen",
              placement: "auto right",
              title: "Your New Asset!",
              content: "Click on your new asset to see all about it."
            },
            {
              element: ".tour-step.tour-step-seventeen",
              orphan: true,
              placement: "botton",
              title: "Let's Fill Out Your Profile",
              content: "Customization is a core part of PhantomAM.",
            },
            {
              element: ".tour-step.tour-step-eighteen",
              title: "Title of my step",
              content: "Content of my step",
              path: "/dashboard/profile"
            },
        ]
        });
     
        // Initialize the tour
        tour.init();
     
        // Start the tour
        tour.start();
 
    }());
}

if(location.href == 'https://phantomam.com/dashboard/profile'){
    (function(){
 
        var tour = new Tour({
            storage : false,
             steps: [
            {
              element: ".tour-step.tour-step-ninteen",
              placement: "auto right",
              title: "Your Website",
              content: "Don't forget to inlcude http or https. It's critical. "
            },
            {
              element: ".tour-step.tour-step-twenty",
              orphan: true,
              placement: "botton",
              title: "Well Done!",
              content: "Your tour is complete! You have successfully created your first asset and customized your profile.",
            },
            {
              element: ".tour-step.tour-step-twenty-one",
              title: "Title of my step",
              content: "Content of my step",
              path: "/dashboard"
            },
        ]
        });
     
        // Initialize the tour
        tour.init();
     
        // Start the tour
        tour.start();
 
    }());
}