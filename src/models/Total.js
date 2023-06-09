const mongoose = require('mongoose')

const TotalSchema = new mongoose.Schema({
  incomes: {
    type: Number,
  },
  accounts: {
    type: Number,
  },
  expenses: {
    type: Number,
  }
}, { timestamps: true })

module.exports = mongoose.model('Total', TotalSchema)