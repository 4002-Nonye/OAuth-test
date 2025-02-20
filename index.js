const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./config/keys');

const app = express();

// SETTING UP THE STRATEGY
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerAPIKey,
      consumerSecret: keys.twitterConsumerAPISecret,
      callbackURL: '/auth/x/callback',
    },
    (token, tokenSecret, profile) => {
      console.log(profile);
    }
  )
);
app.get(
  'auth/x',
  passport.authenticate('twitter', {
    scope: ['profile', 'email'],
  })
);

app.get('/auth/x/callback', passport.authenticate('twitter'));

app.get('/', (req, res) => {
  res.send({
    name: 'This is a test to practice',
    stack: 'Node js with express',
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log('Listening on port 8000'));
