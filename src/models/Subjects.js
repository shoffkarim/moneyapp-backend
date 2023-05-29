const mongoose = require('mongoose')
const SubjectItem = require('./SubjectItem')

const SubjectsSchema = new mongoose.Schema({

})

module.exports = mongoose.model('Subjects', SubjectsSchema)
