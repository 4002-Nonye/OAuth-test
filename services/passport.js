const mongoose = require('mongoose');
const passport = require('passport');

const TwitterStrategy = require('passport-twitter').Strategy;

const keys = require('../config/keys');
const User = mongoose.model('users');

// Passport stores the user ID in a cookie session to uniquely identify a user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Passport gets access to that unique user ID it previously serialized in a session
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// SETTING UP THE STRATEGY
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.consumerAPIKey,
      consumerSecret: keys.consumerAPISecret,
      callbackURL: '/auth/x/callback',
    },
    (token, tokenSecret, profile, done) => {
      // Check if user already exists before creating a new record
      User.findOne({
        xID: profile.id,
      }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            xID: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
      
    }
  )
);
