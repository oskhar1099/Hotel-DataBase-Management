const Company = require('../models/company.model.js');

exports.create = (req, res) => {

    var hat = require('../API Key Gen/gen.js');
    var id = hat();

    const company = new Company({       
        contactName:req.body.name,
        company: req.body.company,
        email: req.body.email,   
        APIKey: id
    });

    company.save()
    .then(data => {
        res.json("API Key: "+data.APIKey);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Company."
        });
    });
};

exports.findAll = (req, res) => {    
    Company.find(req.query)
    .then(companies => {
        res.json(companies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};
