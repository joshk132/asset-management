var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  cost: {type: Number},
  model: {type: String},
  custom1: {type: String},  
  custom2: {type: String},  
  custom3: {type: String},  
  custom4: {type: String},  
  custom5: {type: String},  
  assetNumber: {type: Number},  
  notes: {type: String},
  signout: {type: Boolean},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Custom', customSchema);