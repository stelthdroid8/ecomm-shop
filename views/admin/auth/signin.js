const layout = require('../layout');

const getError = (errors, propName) => {
  //propName either email or password or passwordConfirmation
  try {
    return errors.mapped()[propName].msg;
  } catch (err) {
    return '';
  }
};

module.exports = ({ errors }) => {
  return layout({
    content: `<div>
      <form method="POST">
        <input name="email" placeholder="email">
        ${getError(errors, 'email')}
        <input name="password" placeholder="password">
        ${getError(errors, 'password')}
        <button>Sign In</button>
    </form>
  </div> `
  });
};
