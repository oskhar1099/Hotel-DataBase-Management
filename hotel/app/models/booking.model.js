const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    hotelID: String,
    userID: String,
    startDate: String,
    finalDate: String,
    rooms: Number
}, {
    versionKey: false 
});
module.exports = mongoose.model('Booking', NoteSchema);