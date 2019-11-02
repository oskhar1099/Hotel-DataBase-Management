const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    contactName: String,
    company: String,
    email: String,
    APIKey: String
}, {
    versionKey: false 
});
module.exports = mongoose.model('Companie', NoteSchema);