var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mobilePhonesSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  dateBought: {type: String},
  cost: {type: Number},
  lifeExpectancy: [],
  warrantyExpiration: {type: String},
  assetNumber: {type: Number},
  notes: {type: String},
  phoneNumber: {type: String},
  os: {type: String},
  simNumber: {type: String},
  MACAdress: {type: String},
  user: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('MobilePhone', mobilePhonesSchema);