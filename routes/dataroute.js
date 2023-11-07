const express = require('express')
const dataRouter = express.Router()
const NoteData = require('../models/data')

// --- Get all notes ---
dataRouter.get('/api/data', (request, response) => {
    NoteData.find({}).then(data => {
      response.json(data)
    })  
  })
  
  // --- Get note by id ---
  dataRouter.get('/api/data/:id', (request,response,next) => {
    NoteData.findById(request.params.id)
      .then(data => {
        if (data) {
          response.json(data)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error)) 
  })
  
  // --- Delete note ---
  dataRouter.delete('/api/data/:id', (request,response,next) => {
    NoteData.findByIdAndDelete(request.params.id)
      .then ( result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  // --- Add note ---
  dataRouter.post('/api/data', (request,response) => {
    const body = request.body
  
    const note = new NoteData({
      name: body.name,
      number: body.number
    })
    note.save().then(savedNoteData => {
      response.json(savedNoteData)
    })
  })
  
  // --- Modify note ---
  
  dataRouter.put('/api/data/:id', (request,response,next) => {
    const body = request.body
  
    const NoteData = {
      name: body.name,
      number: body.number
    }
  
    NoteData.findByIdAndUpdate(req.params.id, NoteData, {new:true})
      .then(updatedNoteData => {
        response.json(updatedNoteData)
      })
      .catch(error => next(error))
  })

module.exports = dataRouter