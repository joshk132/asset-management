var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectorsSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  dateBought: {type: String},
  warrantyExpiration: {type: String},
  assetNumber: {type: Number},
  location: {type: String},
  cost: {type: Number},
  notes: {type: String},
  resolution: {type: String},
  author: {
   id: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
   },
     email: String
   }
});

module.exports = mongoose.model('Projector', projectorsSchema);