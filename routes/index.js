var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/user')
var golfModel = require('../models/golf')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {

  var result = false
  var error = []

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){

    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

    var newUser = new userModel({      
      mail: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
    })

    saveUser = await newUser.save()

    if(saveUser){
      result = true
      
    }
  }
  

  res.json({result, error});
});

router.post('/signin', function(req, res, next) {



  res.json({result, error});
});


router.post('/addGolf', async function(req, res, next) {

  var newGolf = new golfModel({      
    golfName: req.body.name,
    golfCity: req.body.city,
    golfAddress: req.body.address,
    golfPostCode: req.body.postcode,
    nbreTrou: req.body.nbreTrou
  })

  saveGolf = await newGolf.save()

  var result = false

  if (saveGolf){
    result = true
  }

  res.json({result});
});

module.exports = router;
