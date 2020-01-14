const express = require('express');
const { handleErrors } = require('./middlewares');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} = require('./validators');

const router = express.Router();

//ROUTES

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    // info from form
    const { email, password, passwordConfirmation } = req.body;
    // create the user in the repo
    const user = await usersRepo.create({ email, password });
    console.log(user);
    //store ID inside of user cookie
    req.session.userId = user.id;
    res.send('account was created!');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.redirect('/signup');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });
    req.session.userId = user.id;
<<<<<<< HEAD
    // res.send('you are now signed in');
    res.redirect('/admin/products/');
=======
    res.redirect('/admin/products');
>>>>>>> 82d752b2dbff78b31be22a5aa8932ecf032c9e98
  }
);

module.exports = router;
