const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['jasnda2janjsdi4j4311djfkdsj9']
  })
);

app.get('/signup', (req, res) => {
  res.send(`
  <div>
  Your ID is : ${req.session.userId}
    <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <input name="passwordConfirmation" placeholder="passwordConfirmation">
        <button>Sign up</button>
    </form>
  </div>
  `);
});

app.post('/signup', async (req, res) => {
  // info from form
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('email in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('passwords do not match');
  }
  // create the user in the repo
  const user = await usersRepo.create({ email, password });
  //store ID inside of user cookie
  req.session.userId = user.id;
  res.send('account was created!');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.redirect('/signup');
});

app.get('/signin', (req, res) => {
  res.send(`
  <div>
  
    <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <button>Sign In</button>
    </form>
  </div>
  `);
});

// app.post('/signin', async (req, res) => {

// });
app.listen(3000, () => {
  console.log('listening on port 3000');
});
