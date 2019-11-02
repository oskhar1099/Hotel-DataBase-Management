const User = require('../models/user.model.js');

exports.create = (req, res) => {
    const user = new User({
        email: req.body.email,
        password:req.body.password,
        name:req.body.name,
        lastName: req.body.lastName,
        address: req.body.address       
    });
    user.save()
    .then(data => {
        res.json("UserID: "+data._id);                
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.findAll = (req, res) => {    
    User.find(req.query)
    .then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};


exports.update = (req, res) => {
    User.findByIdAndUpdate(req.body.userID, {        
    }, {new: true})
    .then(user => {
        if(!user) {
            res.json("0. The given UserID isn't registered in our database");
        }
        if(user.password==req.body.password && user.address==req.body.address){
            if(req.body.email){
                user.email=req.body.email;
            }
            if(req.body.newPassword){
                user.password=req.body.newPassword;
            }
            if(req.body.name){
                user.name=req.body.name;
            }
            if(req.body.lastName){
                user.lastName=req.body.lastName;
            }
            if(req.body.newAddress){
                user.address=req.body.newAddress;
            }            
            user.save();
            res.json("1. User successfully updated!");     
        }else{
            if (user.password!=req.body.password){
                if(user.address!=req.body.address){
                  res.json( "0. Neither the password and the address match with the ones related to the given userID.");                   
                }else{                   
                   res.json("0. The password didn't match with the one related to the given userID.");                   
                }                
            }else{
                res.json("0. The address didn't match with the one related to the given userID.");                   
            }
        };    
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.json("0. The given UserID isn't registered in our database");                           
        }        
    });
};