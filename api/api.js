var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var createSendToken = require('./services/jwt.js')
var facebookAuth = require('./services/facebookAuth.js');

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

var strategyOptions = {
  usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user) return done(null, false, {
      message: 'Wrong email/password'
    });

    user.comparePasswords(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {
          message: 'Wrong email/password'
        });
      }
      return done(null, user);
    })
  })
});

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {

  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if (err) {
      return done(err);
    }

    if (user) return done(null, false, {
      message: 'Email already exists'
    });


    var newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function(err) {
      done(null, newUser);
    })
  });
})

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
  createSendToken(req.user, res);
})

app.post('/login', passport.authenticate('local-login'), function(req, res) {
  createSendToken(req.user, res);
})

app.post('/auth/facebook', facebookAuth);

var jobs = ['Cook',
  'SuperHero',
  'Unicorn Whisperer',
  'Toast Inspector'
];

app.get('/jobs', function(req, res) {
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, 'shhh..');

  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }

  if (!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }

  res.json(jobs);
})

app.post('/auth/google', function(req, res) {

  var url = 'https://accounts.google.com/o/oauth2/token';
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
    client_secret: 'ustNfEGiSroiJgraESy-OFRz'
  }

  console.log(req.body.code);

  request.post(url, {
    json: true,
    form: params
  }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken
    }
    request.get({
      url: apiUrl,
      headers: headers,
      json: true
    }, function(err, response, profile) {
      User.findOne({
        googleId: profile.sub
      }, function(err, foundUser) {
        if (foundUser) return createSendToken(foundUser, res);

        var newUser = new User();
        newUser.googleId = profile.sub;
        newUser.displayName = profile.name;
        newUser.save(function(err) {
          if (err) return next(err);
          createSendToken(newUser, res);
        })
      })
    })
  });
})

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function() {
  console.log('api listening on ', server.address().port);
})
