const mongoose = require('mongoose')

// --- note data schema ----
const noteDataSchema = new mongoose.Schema({
    user:{type:String, index:true},
    title:String,
    text:String,
    tags:[{type:String}]
},
// enforcing the collection name
{collection: 'noteData'})

// transforming the id from _id to id
noteDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('NoteData', noteDataSchema)