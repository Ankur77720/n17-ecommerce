const mongoose = require('mongoose')

// TODO: connect to mongoose

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

module.exports = mongoose.model('user', userSchema)

