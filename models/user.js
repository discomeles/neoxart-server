const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type: String, uniques:true},
    email:String,
    password:String
},
// enforcing the collection name
{collection: 'users'})

// transforming the id from _id to id
// do not reveal password hash
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
    }
  })

module.exports = mongoose.model('User', userSchema)