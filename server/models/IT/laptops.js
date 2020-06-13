var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var laptopsSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  cpu: [],
  ram: [],
  gpu: [],
  vram: [],
  sizeDrive: [],
  typeDrive: [],
  cost: {type: Number},
  lifeExpectancy: [],
  usbPorts: [],
  notes: {type: String},
  user: {type: String},
  standAlone: {type: Boolean},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Laptop', laptopsSchema);