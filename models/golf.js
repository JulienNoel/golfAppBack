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
  golfAddress: String,
  golfPostCode: String,
  parcours: [parcoursSchema],
});

var golfModel = mongoose.model("golfs", golfSchema);

module.exports = golfModel;
