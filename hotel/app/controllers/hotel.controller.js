const Hotel = require('../models/hotel.model.js');
const Company = require('../models/company.model.js');
// Create and Save a new Hotel
exports.create = (req, res) => {
    var sw=0;
    Company.find().then(function (res2) {
        res2.forEach(function (company, index) {
            if (req.body.APIKey==company.APIKey){
                sw=sw+1;                
                if(req.body.HOTELNAME && req.body.Address && req.body.Type
                    && req.body.Rooms && req.body.State){
                    const hotel = new Hotel({
                        HOTELNAME: req.body.HOTELNAME,
                        Address: req.body.Address,
                        Type: req.body.Type,
                        Rooms: req.body.Rooms,
                        State: req.body.State
                    });                      
                        hotel.Latitude=req.body.Latitude;                  
                        hotel.Longitude=req.body.Longitude;                      
                        if (req.body.Rooms <= 50) {
                            hotel.Size = "Small"
                        } else {
                            if (req.body.Rooms > 50 && req.body.Rooms <= 100) {
                                hotel.Size = "Medium"
                            } else {
                                hotel.Size = "Large"
                            }
                        }               
                        hotel.EMAILID = req.body.EMAILID;                    
                        hotel.Fax = req.body.Fax;  
                        hotel.Website= req.body.Website;
                        hotel.Phone= req.body.Phone;
                    
                    hotel.save().then(data => {
                    res.json(data);
                    });
                }else{
                    res.json("The Hotel doesn't have the minimun required fields")
                }                   
                
            };
        });            
        if(sw==0){
            res.json("The API Key isn't registered in our database")
        }
    }); 
};


// Retrieve and return all hotels from the database or specified latitude, latitude and range.
exports.findAll = (req, res) => {    
   if (req.params.range && req.params.latitude && req.params.longitude){
    function haversineDistance(lt1,ln1,lt2,ln2) {
        function toRad(x) {
            return x * Math.PI / 180;
        }        
        var lon1 = ln1;
        var lat1 = lt1;        
        var lon2 = ln2;
        var lat2 = lt2;        
        var R = 6371; // km        
        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var d = R * c;                 
        return d;
    }
        Hotel.find()
        .then(hotels =>{
            var sample = new Array();
            for (var j=0;j<hotels.length;j++){
              var dt=haversineDistance(req.params.latitude, req.params.longitude, hotels[j].Latitude,hotels[j].Longitude);
              if(dt<=req.params.range){
                  sample.push(hotels[j])
              }  
            }            
            res.json(sample)
        });
        sample=[];
    }else{
        Hotel.find(req.query)
        .then(hotels => {
            res.json(hotels);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving hotels."
            });
        });
    }
    
};

exports.update = (req, res) => {    
    var sw = 0;
    var sw2 = 0;
    Company.find().then(function (res2) {
        res2.forEach(function (company, index) {
            if (req.body.APIKey == company.APIKey) {
                sw = sw + 1;
                Hotel.findById(req.body.hotelID).then(hotel => {
                    if (!hotel) {
                        res.json("0. The given HotelID isn't registered in our database");
                    }
                    if (req.body.Type) {
                        hotel.Type = req.body.Type;
                        sw2 = sw2 + 1;
                    }
                    if (req.body.Rooms) {
                        hotel.Rooms = req.body.Rooms;
                        sw2 = sw2 + 1;
                        if (req.body.Rooms <= 50) {
                            hotel.Size = "Small"
                        } else {
                            if (req.body.Rooms > 50 && req.body.Rooms <= 100) {
                                hotel.Size = "Medium"
                            } else {
                                hotel.Size = "Large"
                            }
                        }
                    }
                    if (req.body.Phone) {
                        sw2 = sw2 + 1;
                        hotel.Phone = req.body.Phone;
                    }
                    if (req.body.Website) {
                        sw2 = sw2 + 1;
                        hotel.Website = req.body.Website;
                    }
                    if (req.body.EMAILID) {
                        sw2 = sw2 + 1;
                        hotel.EMAILID = req.body.EMAILID;
                    }
                    if (sw2 != 0) {
                        hotel.save();
                        res.json(hotel);
                    } else {
                        res.json("Please update a valid column")
                    }

                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        res.json("The given HotelID isn't registered in our database");
                    }
                });
            };
        });
        if (sw == 0) {
            res.json("The given API Key isn't registered in our database")
        }
    });
};


// Delete a hotel with the specified hotelId in the request
exports.delete = (req, res) => {
    var sw=0;
    Company.find().then(function (res2) {
        res2.forEach(function (company, index) {
            if (req.body.APIKey==company.APIKey){
                sw=sw+1;                
                Hotel.findByIdAndRemove(req.body.hotelId)
                .then(hotel => {
                    if(!hotel) {
                        res.json("The given HotelID isn't registered in our database"); 
                    }
                    res.json("Hotel deleted successfully!");
                }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                        res.json("The given HotelID isn't registered in our database");                
                    }
                    return res.status(500).send({
                        message: "Could not delete hotel with id " + req.param.hotelId
                    });
                });
            }; 
        });
        if(sw==0){
            res.json("The given API Key isn't registered in our database");            
        }
    });       
};