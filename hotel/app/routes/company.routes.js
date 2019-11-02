module.exports = (app) => {
    const company = require('../controllers/company.controller.js');
    // Create a new Company
    app.post('/Company', company.create);
    // Retrieve all Companies
    app.get('/Company', company.findAll);
    
}