var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = new Schema({
  model: {type: String},
  assetNumber: {type: String},
  status: {type: String},
  serial: {type: String},
  bought: {type: String},
  warranty: {type: String},
  method: {type: String},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Asset', assetSchema);