const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');
const middleware = require('./middleware/middleware');
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

app.post('/', async (req, res) => {
  // info from form
  const { email, password, passwordConfirmation } = req.body;
  // if (middleware.isEmailTaken(email)) {
  //   console.log('taken');
  // }
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('email in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('passwords do not match');
  }
  res.send('account was created!');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
