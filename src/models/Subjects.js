const mongoose = require('mongoose')
const SubjectItem = require('./SubjectItem')

const SubjectsSchema = new mongoose.Schema({
  incomes: [ SubjectItem.schema ],
  accounts: [ SubjectItem.schema ],
  expenses:  [ SubjectItem.schema ],
})

module.exports = mongoose.model('Subjects', SubjectsSchema)
