var mongoose = require('mongoose')

var reservationSchema = mongoose.Schema({

    golfId: {type: mongoose.Schema.Types.ObjectId, ref: 'golf'},
    dateReservation: String,
    buddies: String,
    
})

var reservationModel = mongoose.model('reservations', reservationSchema)

module.exports = reservationModel;