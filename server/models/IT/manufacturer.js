var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manufacturerSchema = new Schema({
  manufacturer: {type: String},
  industry: {type: String},
  URL: {type: String},
  supportURL: {type: String},
  contactEmail: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);