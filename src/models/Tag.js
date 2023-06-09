const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  tagId: {
    type: String
  },
  name: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Tag', TagSchema)