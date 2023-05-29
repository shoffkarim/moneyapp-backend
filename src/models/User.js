const mongoose = require('mongoose')
const SubjectItem = require('./SubjectItem')
const Total = require('./Total')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  incomes: [ SubjectItem.schema ],
  accounts: [ SubjectItem.schema ],
  expenses:  [ SubjectItem.schema ],
  total: {
    type: Total.schema
  }
})

module.exports = mongoose.model('User', UserSchema)