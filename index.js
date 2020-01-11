const express = require('express');
const app = express();

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
  req.on('data', data => {
    const parsed = data.toString('utf8').split('&');
    const formData = {};

    for (let pair of parsed) {
      const [key, value] = pair.split('=');
      formData[key] = value;
    }
    console.log(formData);
  });
});

app.listen(3000, () => {
  console.log('up and running');
});
