module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    // Create a new User
    app.post('/User', user.create);
    // Retrieve all Users
    app.get('/User', user.findAll);
    // Update an User
    app.put('/User', user.update);
}