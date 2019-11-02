const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    email: String,
    password:String,
    name:String,
    lastName: String,
    address: String    
}, {
    versionKey: false 
});
module.exports = mongoose.model('User', NoteSchema);