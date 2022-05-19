var mongoose = require('mongoose')

var userSchema = mongoose.Schema({

    token: String,
    userName: String,
    userPrenom: String,
    mail: String,
    password: String,
    birthDate: String,
    //gender: String,
    //carteVerte: String,   
    //reservationId: {type: mongoose.Schema.Types.ObjectId, ref: 'reservation'}
    
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;