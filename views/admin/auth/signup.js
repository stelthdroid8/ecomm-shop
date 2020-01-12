const layout = require('../layout');
const getError = (errors, propName) => {
  //propName either email or password or passwordConfirmation
  try {
    return errors.mapped()[propName].msg;
  } catch (err) {
    return '';
  }
};
module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
    Your ID is : ${req.session.userId}
    <form method="POST">
        <input name="email" placeholder="email">
        ${getError(errors, 'email')}
        <input name="password" placeholder="password">
        ${getError(errors, 'password')}
        <input name="passwordConfirmation" placeholder="passwordConfirmation">
        ${getError(errors, 'passwordConfirmation')}
        <button>Sign up</button>
    </form>
  </div>`
  });
};
