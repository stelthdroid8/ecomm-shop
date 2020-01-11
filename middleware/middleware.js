// const usersRepo = require('../repositories/users');
// const middleWareObject = {};

// middleWareObject.isEmailTaken = async (req, res, next) => {
//   const { email } = req.params.email;
//   const existingUser = await usersRepo.getOneBy(email);
//   if (existingUser) {
//     res.send('Email already in use');
//     return next();
//   }
//   return next();
// };

// module.exports = middleWareObject;
