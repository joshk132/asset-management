var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deskPhonesSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  cost: {type: Number},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('DeskPhone', deskPhonesSchema);