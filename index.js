const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({
    name: 'This is a test to practice',
    stack: 'Node js with express',
  });
});

app.get('/auth/facebook')

const PORT = 8000;
app.listen(PORT, () => console.log('Listening on port 8000'));
