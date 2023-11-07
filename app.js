const config = require('./utils/config')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const dataRouter = require('./routes/dataroute')
const NoteData = require('./models/data')
const mongoose = require('mongoose')

// --- Error handling ---
const errorHandler = (error, request, response, next) => {
  console.error(err.message)

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

// morgan.token('body', (req) => {
//   return JSON.stringify(req.body, ["name","number"])
//   })

// --- MongoDB connection ---
mongoose.connect(config.mongo_url)
  .then(result => {
    console.log("Connected to Mongo Atlas")
  })
  .catch((error) => {
    console.log("Failed to connect to Mongo Atlas. Reason:",error.message)
  })

app.use('/api/data', dataRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app