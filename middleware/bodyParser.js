// const form = require('../index');
let middleware = {};

middleware.bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', data => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};

      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      //   console.log(formData);
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

module.exports = middleware;
