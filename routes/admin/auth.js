const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post('/signup', async (req, res) => {
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

router.get('/signout', (req, res) => {
  req.session = null;
  res.redirect('/signup');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send('You must sign up before you can sign in!');
  }
  const validPass = await usersRepo.comparePasswords(user.password, password);

  if (!validPass) {
    res.send('Invalid password');
  }
  req.session.userId = user.id;
  res.send('you are now signed in');
});

module.exports = router;
