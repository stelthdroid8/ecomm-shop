const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// const middleware = require('./middleware/bodyParser.js');

app.get('/', (req, res) => {
  res.send(`
  <div>
    <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <input name="passwordConfirmation" placeholder="passwordConfirmation">
        <button>Sign up</button>
    </form>
  </div>
  `);
});

// app.get('/signup', (req, res) => {
//   res.render(signup.html);
// });
app.post('/', (req, res) => {
  //   middleware.bodyParser(req, res);
  console.log(req.body);
  res.send('account created');
});

app.listen(3000, () => {
  console.log('up and running');
});
