'use strict';

var express = require('express');
var compression = require('compression');
var swig = require('swig');
var subdomainOffset = process.env.SUBDOMAIN_OFFSET || 0;
var secrets = require('./config/secrets');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')({ session: session });
var mongoose = require('mongoose');
var passport = require('passport');
var methodOverride = require("method-override");
var bodyParser = require('body-parser');
var compress = require('compression')();
var lodash = require('lodash');
var expressValidator = require('express-validator');
var errorHandler = require('./middleware/error');
var viewHelper = require('./middleware/view-helper');
var flash = require('express-flash');
var cors = require('cors');
var corsOptions = {
  origin: '*'
};
var staticDir;

// setup db
mongoose.connect(secrets.db, {server:{poolSize: 1}});
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// express setup
var app = express();

// body parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set production status and staticDir
if (app.get('env') === 'dev') {
  app.locals.production = false;
  swig.setDefaults({ cache: false });
  staticDir = path.join(__dirname + '/../public');
} else {
  app.locals.production = true;
  swig.setDefaults({ cache: 'memory' });
  staticDir = path.join(__dirname + '/../public');
}

// This is where all the magic happens!
app.use(compression());
app.use(express.static(__dirname + "/public"));
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.locals._ = lodash;
app.use(methodOverride("_method"));
app.locals.stripePubKey = secrets.stripeOptions.stripePubKey;
app.set('view cache', true);
swig.setDefaults({ cache: false });
app.use(favicon(path.join(__dirname + '/../public/favicon.ico')));
app.use(logger('dev'));
app.use((req, res, next)=> {
  res.locals.currentUser = req.user;
  next();
});
app.use(compress);
app.use(expressValidator());
app.use(cookieParser());

app.use(express.static(staticDir));
if(app.get('env') !== 'production'){
  app.use('/styles', express.static(__dirname + '/../.tmp/styles'));
  // app.use('/', routes.styleguide);
}

// set session
app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60 // 1 hour
  },
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));

// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());

// other
app.use(flash());
app.use(cors(corsOptions));

var passportMiddleware = require('./middleware/passport');
passportMiddleware(passport);

// setup view helper
app.use(viewHelper);

//requiring routes
var authRoutes        = require("./routes/auth"),
    dashboardRoutes   = require("./routes/dashboard"),
    docs              = require("./routes/docs"),
    front             = require("./routes/front"),
    settings          = require("./routes/settings"),
    stripe            = require("./routes/stripe"),
    user              = require("./routes/user");
    
// route sets
authRoutes(app, passport);
dashboardRoutes(app, passport);
docs(app, passport);
front(app, passport);
settings(app, passport);
stripe(app, passport);
user(app, passport);

// dashboard IT routes
var assetRoutes = require("./routes/dashboardIT/asset"),
    assignRoutes = require("./routes/dashboardIT/assign"),
    checkinRoutes = require("./routes/dashboardIT/checkin"),
    expendableRoutes = require("./routes/dashboardIT/expendables"),
    licenseRoutes = require("./routes/dashboardIT/licenses"),
    manufacturerRoutes = require("./routes/dashboardIT/manufacturers"),
    modelRoutes = require("./routes/dashboardIT/models");

// dashboard IT  routes
assetRoutes(app, passport);
assignRoutes(app, passport);
checkinRoutes(app, passport);
expendableRoutes(app, passport);
licenseRoutes(app, passport);
manufacturerRoutes(app, passport);
modelRoutes(app, passport);

// catch 404 and forwarding to error handler
// put BELOW all other routes or all will be error 404
app.use(errorHandler.notFound);
//goes bloew 404 handler
/// error handlers
if (app.get('env') === 'development') {
  app.use(errorHandler.development);
} else {
  app.use(errorHandler.production);
}

module.exports = app;
