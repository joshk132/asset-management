var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessPointsSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  IPAdress: {type: String},
  MACAdress: {type: String},
  range: {type: Number()},
  bands: {type: String},
  channel: {type: Number},
  dateBought: {type: String},
  PoE: {type: Boolean},
  assetNumber: {type: Number},
  warrantyExpiration: {type: String},
  location: {type: String},
  notes: {type: String},
  cost: {type: Number},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('AP', accessPointsSchema);