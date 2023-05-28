const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  history: [{
    from: String,
    to: String,
    sum: Number
  }]
})

module.exports = mongoose.model('Client', ClientSchema)