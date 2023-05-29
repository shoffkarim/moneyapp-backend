const mongoose = require('mongoose')

const SubjectItemSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    value: {
      type: Number,
    }
})

module.exports = mongoose.model('SubjectItem', SubjectItemSchema)