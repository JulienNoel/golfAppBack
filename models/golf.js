var mongoose = require("mongoose");

var parcoursSchema = mongoose.Schema({
  parcoursName: String,
  nbreTrou: Number,
  longueur: String,
  par: Number,
  image: String,
  difficulté: Number,
});

var golfSchema = mongoose.Schema({
  golfName: String,
  golfCity: String,
  practice: Boolean,
  restauration: Boolean,
  dixhuitTrous: Number,
  neufTrous: Number,
  golfAddress: {
    golfCity: String,
    golfPostCode: String,
    golfAddressName: String,
    golfLatitude: Number,
    golfLongitude: Number,
    golfPostCode: String,
  },
  parcours: [parcoursSchema],
});

var golfModel = mongoose.model("golfs", golfSchema);

module.exports = golfModel;
