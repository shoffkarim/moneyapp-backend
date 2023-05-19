const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDb = require('./config/db')


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDb()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))


function start() {
  app.listen(PORT, () => console.log(`App started on ${PORT}`))
}

start()