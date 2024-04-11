const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

// TODO: connect to mongoose


mongoose.connect('mongodb://0.0.0.0/ecommerce')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  accountType: {
    type: String,
    enums: [ 'seller', 'buyer' ],
    default: 'buyer'
  },
  wishlist: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  } ],

})

userSchema.plugin(plm)

module.exports = mongoose.model('user', userSchema)

