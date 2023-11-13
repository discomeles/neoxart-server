const express = require('express')
const bcrypt = require('bcrypt')
const registerRouter = express.Router()
const User = require('../models/user')

const checkDuplicateUsername = (request, response, next) => {
  User.findOne({"username":request.body.username})
  .then( user => {
    if(user) {
      response.status(409).json({"Message":"Username already in use"})
      return
    } else {
      return next()
    }
  })
}

const checkDuplicateEmail = (request, response, next) => {
  User.findOne({"email":request.body.email})
  .then( user => {
    if(user) {
      response.status(409).json({"Message":"Email already in use"})
      return
    } else {
      return next()
    }
  })
}

// --- Add user ---
const registerCheck = [checkDuplicateUsername, checkDuplicateEmail]

registerRouter.post('/', registerCheck, (request,response) => {
  // hash and salt password
  const saltRounds = 13
  bcrypt.hash(request.body.password, saltRounds, (err, hash) => {

    let user = new User({
      username:request.body.username,
      email:request.body.email,
      password:hash
    })

    // save user
    user.save().then( registeredUser => {
      response.status(201).json(registeredUser)
    })
  })
})

module.exports = registerRouter