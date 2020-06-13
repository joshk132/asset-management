var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var stripeCustomer = require('./plugins/stripe-customer');
var secrets = require('../config/secrets');
var timestamps = require('mongoose-timestamp');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,

  profile: {
    name: { type: String, default: 'Company Name' },
    location: { type: String, default: 'Location' },
    website: { type: String, default: 'Your Website' },
    picture: { type: String, default: '' },
    is_done_email: { type: Boolean, default: 'false'},
    isUsedCoupon: { type: Boolean, default: 'false'},
    is_done_tour: { type: Boolean, default: 'false'}
  },
  // asset prefix
  assetNumPre: { type: String, default: 'Pre' }, // use for new asset assetNumber prefix
  // notifcation settings
  newsletterEmail: { type: Boolean, default: 'true'},
  lowerLimitEmail: { type: Boolean, default: 'true'},
  featuresEmail: { type: Boolean, default: 'true'},
  stockEmail: { type: Boolean, default: 'true'},
  assetOut180: { type: Boolean, default: 'true'},
  lowerLimit: { type: Boolean, default: 'true'},
  //bar code type
  codeType: { type: String, defaultStatus: 'code128'},
  
  // label settings
  perpage: { type: String, default: '1'}, 
  width: { type: Number, default: 1}, 
  length: { type: Number, default: 75}, 
  font: { type: Number, default: 20}, 
  name: { type: Boolean, default: 'true'}, 
  assetnumber: { type: Boolean, default: 'true'}, 
  
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

var stripeOptions = secrets.stripeOptions;

userSchema.plugin(timestamps);
userSchema.plugin(stripeCustomer, stripeOptions);

/**
 * Hash the password for security.
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Validate user's password.
 * Used by Passport-Local Strategy for password validation.
 */

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Get URL to a user's gravatar.
 * Used in Navbar and Account Management page.
 */

userSchema.methods.gravatar = function(size) {
  if (!size) size = 200;

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }

  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('User', userSchema);
