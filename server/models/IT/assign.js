var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignSchema = new Schema({
  assetID: {type: String},
  subuser: {type: String},
  subuserID: {type: String},
  asset: Number,
  checkoutDate: {type: String},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Assign', assignSchema);