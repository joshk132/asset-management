var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkoutSchema = new Schema({
  subuser: {type: String},
  quantity: {type: String},
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      email: String
   }
});

module.exports = mongoose.model('Checkout', checkoutSchema);