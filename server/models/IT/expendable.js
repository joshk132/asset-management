var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consumableSchema = new Schema({
  name: {type: String},
  manufacturer: {type: String},
  category: {type: String},
  cost: {type: Number},
  bought: {type: String},
  ponumber: {type: Number},
  quantity: {type: Number},
  lowerLimit: {type: Number},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Consumable', consumableSchema);