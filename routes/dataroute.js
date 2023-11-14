const express = require('express')
const dataRouter = express.Router()
const NoteData = require('../models/data')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const encodedToken = request => {
  const auth = request.headers.authorization
  if (auth && auth.startsWith('Bearer')) {
    return auth.replace('Bearer ', '')
  } else {
    return null
  }
}

const checkAuthentication = (request, response, next) => {
  jwt.verify(encodedToken(request), config.jwtsecret, (error, decoded) => {
    if (error) {
      response.status(401).json({error: error})
      return
    }
    if (!decoded.id) {
      response.status(401).json({error: 'Invalid token'})
      return
    } else {
      response.locals.id = decoded.id
      next()
    }
  })
}

// --- Get all notes ---
dataRouter.get('/', checkAuthentication, (request, response) => {
    NoteData.find({userid: response.locals.id}).then(data => {
      response.json(data)
    })  
  })
  
  // --- Get note by id ---
  dataRouter.get('/:id', checkAuthentication, (request,response,next) => {
    NoteData.findOne({_id: request.params.id, userid: response.locals.id})
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
  dataRouter.delete('/:id', checkAuthentication, (request,response,next) => {
    NoteData.findOneAndDelete({_id: request.params.id, userid: response.locals.id})
      .then ( result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  // --- Add note ---
  dataRouter.post('/', checkAuthentication, (request,response) => {
    const body = request.body
    console.log(request.headers.authorization)
  
    const note = new NoteData({
      userid: response.locals.id,
      title: body.title,
      text: body.text,
      tags: body.tags
    })
    note.save().then(savedNoteData => {
      response.json(savedNoteData)
    })
  })
  
  // --- Modify note ---
  
  dataRouter.put('/:id', checkAuthentication, (request,response,next) => {
    const body = request.body
  
    const NoteData = {
      title: body.title,
      text: body.text,
      tags: body.tags
    }
  
    NoteData.findOneAndUpdate({
      _id: request.params.id,
      userid: response.locals.id
    }, 
      NoteData, 
      {new:true})
      .then(updatedNoteData => {
        response.json(updatedNoteData)
      })
      .catch(error => next(error))
  })

module.exports = dataRouter