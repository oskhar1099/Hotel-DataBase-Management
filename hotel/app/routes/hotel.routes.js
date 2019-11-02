module.exports = (app) => {
    const hotel = require('../controllers/hotel.controller.js');

    // Create a new Hotel
    app.post('/Hotel', hotel.create);

    // Retrieve all Notes
    app.get('/Hotel', hotel.findAll);

    // Retrieve a single Hotel
    app.get('/Hotel/:latitude/:longitude/:range', hotel.findAll);

    // Update an Hotel
    app.put('/Hotel', hotel.update);

    // Delete an Hotel 
    app.delete('/Hotel', hotel.delete);
}