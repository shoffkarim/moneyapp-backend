const mongoose = require('mongoose')
const Tag = require('./Tag')

const TransactionSchema = new mongoose.Schema({
  date: {
    type: String
  },
  idFrom: {
    type: String,
  },
  idTo: {
    type: String
  },
  value: {
    type: Number
  },
  comment: {
    type: String
  },
  tags: [ Tag.schema ]
})

module.exports = mongoose.model('Transaction', TransactionSchema)