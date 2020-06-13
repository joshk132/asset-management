var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkinSchema = new Schema({
  assign: {type: String},
  outdate: {type: String},
  checkinDate: {type: String},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Checkin', checkinSchema);