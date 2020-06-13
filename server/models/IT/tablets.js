var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tabletsSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  dateBought: {type: String},
  cost: {type: Number},
  lifeExpectancy: {type: String},
  warrantyExpiration: {type: String},
  assetNumber: {type: Number},
  location: {type: String},
  notes: {type: String},
  ram: {type: String},
  resolution: {type: String},
  user: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Tablet', tabletsSchema);