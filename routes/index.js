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
  var par = [4, 4, 3, 4, 4, 3, 4, 5, 5, 4, 3, 5, 4, 4, 4, 4, 3, 4]
  var distance = [389, 284, 142, 297, 357, 160, 319, 472, 461, 319, 153, 397, 370, 320, 328, 379, 169, 360]
  var tableauImage = [
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399533/golf/vineuil-8-sm_j4seyc.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399527/golf/vineuil-7-sm_z4fsly.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399530/golf/vineuil-6-sm_pxw000.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399524/golf/vineuil-5-sm_lchlaz.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399521/golf/vineuil-4-sm_gfymyg.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399518/golf/vineuil-3-sm_oghwtx.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399515/golf/vineuil-2-sm_wr4gxs.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399512/golf/vineuil-18-sm.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399506/golf/vineuil-17-sm.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399503/golf/vineuil-16-sm.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399500/golf/vineuil-15-sm_tjen44.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399497/golf/vineuil-14-sm_xm0ait.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399494/golf/vineuil-13-sm_cnd9z5.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399542/golf/vineuil-11-sm_fqpopc.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399491/golf/vineuil-12-sm_v81obm.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399539/golf/vineuil-10-sm_yxg9zv.jpg',
    'https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399509/golf/vineuil-1-sm_x7dn5o.jpg']
    var nomParcours = ["Parcours belle vue", "Parcours des flots bleus", "Parcours des érables", "Parcours beau soleil", "Parcours des amoureux", "Parcours d'Alexis 1er", "Parcours Shaddy", "Parcours de Paris", "Parcours de la bonne fortune", "Parcours du ruisseau", "Parcours de la cascade", "Parcours des rosseaux", "Parcours de la tranquilité", "Parcours des hérables", "Parcours du débutant", "Parcours Wood", "Parcours de la vallée", "Parcours de la dune Bleu", "Parcours de la Capsule", "Parcours hole in one"]


function randomGolf (index, longueurTrou) {
  var tableauScore = []
  var parcours1 = { nomParcours: nomParcours[index] }

  for (var i = 1; i <= longueurTrou; i++) {
    var parcoursTrou = {};
    parcoursTrou.trou = i;
    parcoursTrou.par = par[i - 1];
    parcoursTrou.url = tableauImage[i-1]
    parcoursTrou.distance = distance[i - 1];
    tableauScore.push(parcoursTrou)
  }  
  parcours1.parcoursTrou = tableauScore
  return parcours1
}


  for (var i = 0; i < 11; i++) {
    golf.push({
      golfName: `golf ${i}`,
      golfAddress: {
        golfCity: "Paris",
        golfPostCode: "75017",
        golfAddressName: `5${i} boulevard Peirrere`,
        golfLatitude: parseFloat(48.875 +  i/10 ),
        golfLongitude: parseFloat(2.33 +  i/10 ),
      },

      parcours: [randomGolf(0,9),randomGolf(1,18)],
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
  res.json(golfSaved)
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

  if (
    req.body.passwordFromFront == "" ||
    req.body.userNameFromFront == "" ||
    req.body.prenomFromFront == "" ||
    req.body.birthDateFromFront == ""
  ) {
    error.push("Des champs sont vides");
  }
  // if (
  //   req.body.emailFromFront ||
  //   req.body.passwordFromFront ||
  //   req.body.birthDateFromFront
  // ) {
  //   const regexMail = new RegExp(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  //   if (!req.body.emailFromFront.test(regexMail)) {
  //     error.push("Email Incorrect");
  //   }

    // const regexPassword = new RegExp(
    //   /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
    // );
    // if (req.body.passwordFromFront.test(regexPassword)) {
    //   error.push(
    //     "Mot de Passe Incorrect doit contenir au moins 8 charactères, 1 majuscule, 1 minuscule et 1 chiffre"
    //   );
    // }

    if (req.body.birthDateFromFront.length < 8) {
      error.push("Date de naissance incorrect");
    }
  

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

    var date = new Date();

    date.setDate(req.body.birthDateFromFront.slice(0, 2));
    var mois = req.body.birthDateFromFront.slice(2, 4) - 1;
    date.setMonth(mois);
    date.setFullYear(req.body.birthDateFromFront.slice(4, 8));

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
