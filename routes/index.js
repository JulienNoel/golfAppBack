var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var uid2 = require("uid2");

var userModel = require("../models/user");
var GolfModel = require("../models/golf");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/askgolf", async function (req, res, next) {
  var result = await GolfModel.find();
  console.log(result);
  res.json({ result });
});

//Route pour créer notre Collection Golf
router.post("/golfAdd", async function (req, res, next) {
  var golf = [];
  for (var i = 0; i < 11; i++) {
    golf.push({
      golfName: `golf ${i}`,
      golfCity: "Paris",
      golfAddress: `5${i} boulevard Peirrere`,
      golfPostCode: "75017",
      parcours: [
        {
          parcoursName: "parcour 1",
          nbreTrou: 9,
          longueur: 1050,
          par: 3,
          image: "",
          difficulté: 4,
        },
        {
          parcoursName: "parcour 2",
          nbreTrou: 18,
          longueur: 2000,
          par: 5,
          image: "",
          difficulté: 5,
        },
      ],
    });

    var newGolf = new GolfModel({
      golfName: golf[i].golfName,
      golfCity: golf[i].golfCity,
      golfAddress: golf[i].golfAddress,
      golfPostCode: golf[i].golfPostCode,
      parcours: golf[i].parcours,
    });
    var golfSaved = await newGolf.save();
  }
});

router.post("/register", async function (req, res, next) {

  var result = false;
  var user = null;
  var error = [];
  

  const data = await userModel.findOne({
    mail: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (    req.body.emailFromFront == "" 
      ||  req.body.passwordFromFront == ""
      ||  req.body.userNameFromFront == ""
      ||  req.body.prenomFromFront == ""
      ||  req.body.birthDateFromFront == "") {
    error.push("Des champs sont vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

    var date = new Date();
    date.setDate(req.body.birthDateFromFront.slice(0,2));
    date.setMonth(req.body.birthDateFromFront.slice(2,4));
    date.setFullYear(req.body.birthDateFromFront.slice(4,8));

    var newUser = new userModel({
      mail: req.body.emailFromFront,
      password: hash,
      token: uid2(32),     
      userName: req.body.userNameFromFront,
      userPrenom: req.body.prenomFromFront,      
      birthDate: date,
    });

    var user = await newUser.save();

    if (user) {
      result = true;
    }
  }

  res.json({ result, error, user });
});

router.post("/login", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, error });
});

module.exports = router;
