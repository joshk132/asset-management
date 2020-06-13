var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cablesSchema = new Schema({
  name: {type: String},
  type: {type: String},
  cableType: {type: String},
  cost: {type: Number},
  notes: {type: String},
  signout: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Cable', cablesSchema);