const mongoose = require('mongoose')
const Subjects = require('./Subjects')
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
  subjects: {
    type: Subjects.schema
  },
  total: {
    type: Total.schema
  }
})

module.exports = mongoose.model('User', UserSchema)