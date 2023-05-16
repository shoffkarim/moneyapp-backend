const { Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  incomes: [
    {
      name: {type: String, required: true},
      icon: {type: String, required: true},
      color: {type: String, required: true},
      value: {type: Number, required: true}
    }
  ],
  accounts: [
    {
      name: {type: String, required: true},
      icon: {type: String, required: true},
      color: {type: String, required: true},
      value: {type: Number, required: true}
    }
  ],
  expenses: [
    {
      name: {type: String, required: true},
      icon: {type: String, required: true},
      color: {type: String, required: true},
      value: {type: Number, required: true}
    }
  ],
  total: {
    expenses: {type: Number, required: true, default: 0},
    incomes: {type: Number, required: true, default: 0},
    balance: {type: Number, required: true, default: 0},
  }
})

module.exports = model('Data', schema)