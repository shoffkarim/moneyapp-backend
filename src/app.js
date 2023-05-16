const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv");

dotenv.config();
const app = express()
const PORT = process.env.SERVER_PORT || 5000
// app.use(cors)
app.use(express.json({extended: true}))
// app.use('/api/auth', require('./routes/auth.router'))
app.use('/api', require('./routes/start.router'))
app.use('/api', require('./routes/data.router'))

async function start() {

  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => console.log(`App started on ${PORT}`))

  } catch (error) {
    console.log('Server error', error)
    process.exit(1)
  }
}

start()