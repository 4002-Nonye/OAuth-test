const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
require('./model/Users');
require('./services/passport');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
const PORT = 8000;
app.listen(PORT, () => console.log('Listening on port 8000'));
