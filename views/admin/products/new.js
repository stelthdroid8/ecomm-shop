const layout = require('../layout');
const { getErrors } = require('../../helpers');
module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="POST">
        <input placeholder="Title" name = "title"/>
        <input placeholder="Price" name = "price"/>
        <input type="file" name = "image"/>
        <button>Subtmi</button>
    </form>
        `
  });
};
