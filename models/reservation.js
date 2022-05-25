var mongoose = require('mongoose')

var reservationSchema = mongoose.Schema({
    dateReservation: Date,
    typeReservation: Array,
    playerId: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    golfId: {type: mongoose.Schema.Types.ObjectId, ref: 'golf'},
    nomParcours: String
})

var reservationModel = mongoose.model('reservation', reservationSchema)

module.exports = reservationModel;