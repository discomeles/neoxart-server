const express = require('express')
const dataRouter = express.Router()
const NoteData = require('../models/data')

// --- Get all notes ---
dataRouter.get('/', (request, response) => {
    NoteData.find({}).then(data => {
      response.json(data)
    })  
  })
  
  // --- Get note by id ---
  dataRouter.get('/:id', (request,response,next) => {
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
  dataRouter.delete('/:id', (request,response,next) => {
    NoteData.findByIdAndDelete(request.params.id)
      .then ( result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  // --- Add note ---
  dataRouter.post('/', (request,response) => {
    const body = request.body
  
    const note = new NoteData({
      title: body.title,
      text: body.text,
      tags: body.tags
    })
    note.save().then(savedNoteData => {
      response.json(savedNoteData)
    })
  })
  
  // --- Modify note ---
  
  dataRouter.put('/:id', (request,response,next) => {
    const body = request.body
  
    const NoteData = {
      title: body.title,
      text: body.text,
      tags: body.tags
    }
  
    NoteData.findByIdAndUpdate(request.params.id, NoteData, {new:true})
      .then(updatedNoteData => {
        response.json(updatedNoteData)
      })
      .catch(error => next(error))
  })

module.exports = dataRouter