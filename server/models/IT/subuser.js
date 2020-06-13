var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subUserSchema = new Schema({
  name: {type: String},
  title: {type: String},
  email: {type: String},
  employeeNumber: {type: Number},
  phoneNumber: {type: String},
  company: {type: String},
  department: {type: String},
  office: {type: String},
  notes: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('SubUser', subUserSchema);