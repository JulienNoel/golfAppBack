var mongoose = require("mongoose");

var historiqueSchema = mongoose.Schema({
  score: Number,
});

var userSchema = mongoose.Schema({
<<<<<<< HEAD
    token: String,
    userName: String,
    userPrenom: String,
    mail: String,
    password: String,
    birthDate: String,  
    reservationId: [{type : mongoose.Schema.Types.ObjectId, ref: 'reservations'}],
    //historiqueId: [historiqueSchema],
})
=======
  token: String,
  userName: String,
  userPrenom: String,
  mail: String,
  password: String,
  birthDate: String,
  reservationId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "reservations" },
  ],
  historiqueId: [historiqueSchema],
});
>>>>>>> 7c6aa683c158e90fd35148f71c8ab15726a0db67

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
