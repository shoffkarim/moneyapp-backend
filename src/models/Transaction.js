const mongoose = require('mongoose')
const Tag = require('./Tag')

const TransactionSchema = new mongoose.Schema({
  idFrom: {
    type: String,
  },
  idTo: {
    type: String
  },
  typeFrom: {
    type: String,
  },
  typeTo: {
    type: String
  },
  value: {
    type: Number
  },
  comment: {
    type: String
  },
  tags: [ Tag.schema ],
  date: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', TransactionSchema)