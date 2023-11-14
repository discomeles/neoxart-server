const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

const checkIfUserExists = (request, response, next) => {
  User.findOne({"username":request.body.username})
  .then( user => {
    if(!user) {
      return response.status(401).json({
        error: 'Invalid username'
      })
    } else {
      response.locals.hash = user.password
      response.locals.id = user.id
      next()      
    }
})
}

const comparePassword = (request, response, next) => {
  bcrypt.compare(request.body.password, response.locals.hash, (error, success) => {
    if(error) {
      console.log(error)
      return response.status(500).json({
        error: 'Internal server error'
      })
    } else if(!success) {
      return response.status(401).json({
        error: 'Invalid password'
      })
    } else {
      next()
    }
  })
}

// -- Log user in ---
const loginCheck = [checkIfUserExists, comparePassword]

loginRouter.post('/', loginCheck, (request, response) => {
  const userTokenInfo = {
    username: request.body.username,
    id: response.locals.id,
  }

  const token = jwt.sign(
    userTokenInfo, 
    config.jwtsecret,
    { expiresIn: '1h'}
  )

  response.status(200).send({
    token, username: request.body.username
  })

  })

module.exports = loginRouter