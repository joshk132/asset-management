var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var switchesSchema = new Schema({
  name: {type: String},
  type: {type: String},
  IPAdress: {type: String},
  MACAdress: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  speed: {type: String},
  dateBought: {type: String},
  lifeExpectancy: {type: String},
  numPorts: {type: Number},
  PoE: {type: Boolean},
  cost: {type: Number},
  assetNumber: {type: Number},
  warrantyExpiration: {type: String},
  location: {type: String},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Switch', switchesSchema);