var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = new Schema({
  name: {type: String},
  productKey: {type: String},
  creator: {type: String},
  licensedtoPerson: {type: String},
  licensedtoEmail: {type: String},
  cost: {type: Number},
  bought: {type: String},
  expiration: {type: String},
  ponumber: {type: Number},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('License', assetSchema);