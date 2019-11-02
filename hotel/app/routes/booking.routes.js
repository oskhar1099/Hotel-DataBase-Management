module.exports = (app) => {
    const booking = require('../controllers/booking.controller.js');
    // Create a new Booking
    app.post('/Booking', booking.create);
    // Retrieve all Bookings
    app.get('/Booking', booking.findOne);   
    //  Check for availabity in hotels
    app.get('/Booking/:stDate/:endDate/:state', booking.findAll);
}