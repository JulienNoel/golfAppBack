var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function(req, res, next) {

  var result = false
  var error = []

  const data = await userModel.findOne({
    mail: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  || req.body.userNameFromFront == ''
  || req.body.prenomFromFront == ''
  || req.body.birthDateFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){

    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

    var newUser = new userModel({      
      mail: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      userName: req.body.userNameFromFront,
      userPrenom: req.body.prenomFromFront,  
      birthDate: req.body.birthDateFromFront,
    })

    var user = await newUser.save()

    if(user){
      result = true
      
    }
  }  

  res.json({result, error, user});
});


router.post('/login', async function(req, res, next) {
  

    var result = false
    var user = null
    var error = []
    var token = null
    
    if(req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
    ){
      error.push('champs vides')
    }
  
    if(error.length == 0){
      user = await userModel.findOne({
        email: req.body.emailFromFront,
      })
    
      
      if(user){
        if(bcrypt.compareSync(req.body.passwordFromFront, user.password)){
          result = true
          token = user.token
        } else {
          result = false
          error.push('mot de passe incorrect')
        }
        
      } else {
        error.push('email incorrect')
      }
    }


  res.json({result, error});
});

module.exports = router;
