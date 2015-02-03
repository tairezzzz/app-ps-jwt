var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var createSendToken = require('./services/jwt.js')
var googleAuth = require('./services/googleAuth.js');
var facebookAuth = require('./services/facebookAuth.js');
var LocalStrategy = require('./services/localStrategy.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');
var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

var whitelist = ['http://localhost:9000'];
app.use(cors({
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
  emailVerification.send(req.user.email);
  createSendToken(req.user, res);
})

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login', passport.authenticate('local-login'), function(req, res) {
  createSendToken(req.user, res);
})

app.post('/auth/facebook', facebookAuth);

app.get('/jobs', jobs);

app.post('/auth/google', googleAuth);

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function() {
  console.log('api listening on ', server.address().port);
})
