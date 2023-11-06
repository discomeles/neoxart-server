const mongoose = require('mongoose')

// --- note data schema ----
const userSchema = new mongoose.Schema({
    username:{type: String, uniques:true},
    password:String
},
// enforcing the collection name
{collection: 'users'})

module.exports = mongoose.model('Person', personSchema)