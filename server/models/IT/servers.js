var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
  name: {type: String},
  manufacturer: {type: String},
  model: {type: String},
  cpu: {type: String},
  cpuNum: {type: Number},
  cost: {type: Number},
  ram: {type: String},
  driveNum: {type: Number},
  driveCap: {type: Number},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Server', serverSchema);