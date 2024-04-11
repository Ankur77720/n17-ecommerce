var express = require('express');
var router = express.Router();
const userModel = require('./users')

var users = require('./users')
var passport = require('passport')
var localStrategy = require('passport-local')
passport.use(new localStrategy(users.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
})


router.post('/register', function (req, res) {

  var userData = new userModel({
    username: req.body.username,
    accountType: req.body.isSeller === 'on' ? "seller" : 'buyer'
  })
  userModel
    .register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        console.log('registered user', registeredUser)
        if (registeredUser.accountType === 'seller') {
          res.redirect("/createProduct")
          return
        }
        res.redirect('/');
      })
    })
});

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/login');
}

function isSeller(req, res, next) {
  if (req.user.accountType === 'seller') return next()
  else res.redirect('/')
}



router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
})


router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  (req, res, next) => { }
);


router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout((err) => {
      if (err) res.send(err);
      else res.redirect('/');
    });
  else {
    res.redirect('/');
  }
});

router.get('/createProduct', isloggedIn, isSeller, function (req, res) {
  res.render('createProduct', { title: 'Create Product' });
})



module.exports = router;
