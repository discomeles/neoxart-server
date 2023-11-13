const config = require('./utils/config')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const dataRouter = require('./routes/dataroute')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const NoteData = require('./models/data')
const mongoose = require('mongoose')

// --- Error handling ---
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// --- Logger ---
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body, ["title"])
  })

// --- MongoDB connection ---
console.log('connecting to', config.mongo_base_url)

mongoose.connect(config.mongo_url)
  .then(result => {
    console.log("Connected to Mongo Atlas")
  })
  .catch((error) => {
    console.log("Failed to connect to Mongo Atlas. Reason:",error.message)
  })

app.use('/api/data', dataRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app