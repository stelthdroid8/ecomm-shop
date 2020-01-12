module.exports = ({ req }) => {
  return ` <div>
  Your ID is : ${req.session.userId}
    <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <input name="passwordConfirmation" placeholder="passwordConfirmation">
        <button>Sign up</button>
    </form>
  </div>`;
};
