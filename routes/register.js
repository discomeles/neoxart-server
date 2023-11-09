const express = require('express')
const bcrypt = require('bcrypt')
const registerRouter = express.Router()
const User = require('../models/user')

// --- Add user ---
dataRouter.post('/', (request,response) => {
    const body = request.body

    // check if username already exists

    // check if email already exists

    // hash and salt password

    // save user

})