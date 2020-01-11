const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello it is working');
});

app.listen(3000, () => {
  console.log('up and running');
});
