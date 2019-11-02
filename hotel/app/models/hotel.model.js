const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    HOTELNAME: String,    
    EMAILID: String,
    Address: String,
    State: String,
    Phone: String,
    Fax: String,    
    Website: String,
    Type: String,
    Rooms: Number,    
    Size: String,
    Latitude: Number,
    Longitude: Number,
    AvailableRooms: Number

}, {
    versionKey: false 
});

module.exports = mongoose.model('Hotel', NoteSchema);
