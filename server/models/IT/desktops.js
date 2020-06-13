var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var desktopsSchema = new Schema({
  name: {type: String},
  type: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  cpu: [],
  ram: [],
  gpu: [],
  vram: [],
  numDrive: {type: Number},
  sizeDrive: [],
  typeDrive: [],
  dateBought: {type: String},
  cost: {type: Number},
  lifeExpectancy: [],
  usbPorts: [],
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Desktop', desktopsSchema);