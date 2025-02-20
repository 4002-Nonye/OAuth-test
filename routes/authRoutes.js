const passport = require('passport');
module.exports = (app) => {
  app.get('/auth/x', passport.authenticate('twitter'));

  app.get(
    '/auth/x/callback',
    passport.authenticate('twitter', { failureRedirect: '/' })
  );

  app.get('/api/user', (req, res) => {
    res.send(req.user);
  });
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send('You have successfully logged out');
  });

  app.get('/', (req, res) => {
    res.send({
      name: 'This is a test to practice',
      stack: 'Node js with express',
    });
  });
};
