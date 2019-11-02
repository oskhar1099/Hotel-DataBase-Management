const Booking = require('../models/booking.model.js');
const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');

exports.create = (req, res) => {
    User.findById(req.body.userID)
    .then(user => {
        if(!user) {
           res.json("The given userID isn't registred in our database")      
        }else{
            Hotel.findById(req.body.hotelID)
            .then(hotel => {
                if(!hotel) {
                    res.json("The given hotelID isn't registred in our database")      
                }else{                    
                    var disp=hotel.Rooms;
                    Booking.find().then(function (res2) {
                        res2.forEach(function (booking, index) {
                            if(booking.hotelID==req.body.hotelID){
                                var dst = new Date(req.body.startDate);                           
                                var dst2 = new Date(booking.startDate);
                                var dend = new Date(req.body.finalDate);                           
                                var dend2 = new Date(booking.finalDate);                                
                                if (dst.toISOString()<=dend2.toISOString()){                        
                                    if(dend.toISOString()>=dst2.toISOString()){
                                        disp=disp-booking.rooms;
                                    }                                    
                                }
                            }  
                            
                        });                             
                        if(req.body.rooms>disp){                                
                            res.json("There aren't enough rooms to cover your request")
                        }else{
                            const booking = new Booking({       
                                hotelID: req.body.hotelID,
                                userID: req.body.userID,
                                startDate: req.body.startDate,
                                finalDate: req.body.finalDate,
                                rooms: req.body.rooms
                            });                    
                            booking.save()
                            .then(data => {
                                res.json("ReservationID: "+data._id);
                            });
                        }                        
                    });  
                }   
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    res.json("The given HotelID isn't registred in our database")             
                }       
            });  
        }           
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.json("The given userID isn't registred in our database")             
        }       
    });   
};


exports.findOne = (req, res) => {
    Booking.find()
    .then(booking => {
        res.json(booking);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving bookings."
        });
    });
};
var sample = new Array();
var disp = new Number;
var i=0;
var k=0;
var tamR=0;
var tamC=0;
exports.findAll = (req, res) => {
    Hotel.find()
    .then(ht => {
        for (var j=0;j<ht.length;j++)
        if (req.params.state==ht[j].State){ 
            tamR++;            
        }
        Booking.find()
        .then(booking=>{
            tamC=booking.length        
        Hotel.find().then(function (res2) {       
            res2.forEach(function (hotel, index) {
                if (req.params.state==hotel.State){                
                    Booking.find().then(function (res3) {
                        disp= hotel.Rooms;
                        res3.forEach(function (booking, index) {
                            k++;
                            var ID = new String(hotel._id)                           
                            if(booking.hotelID== ID){                                                    
                                var dst = new Date(req.params.stDate);                           
                                var dst2 = new Date(booking.startDate);
                                var dend = new Date(req.params.endDate);                           
                                var dend2 = new Date(booking.finalDate);                                
                                if (dst.toISOString()<=dend2.toISOString()){                        
                                    if(dend.toISOString()>=dst2.toISOString()){
                                        disp=disp-booking.rooms;
                                    }                                    
                                }                           
                            }                                 
                            if(disp>0 && k%tamC==0){
                                hotel.AvailableRooms=disp;
                                sample.push(hotel)  
                            }                            
                            i++          
                            if (i==tamR*tamC){
                                res.json(sample)
                            }
                        });   
                    });        
                }        
            });     
            
        });
    });    
    });
sample = [];
disp = 0;
i=0;
k=0;
tamR=0;
tamC=0;    
};