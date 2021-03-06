const express = require('express');
const multer = require('multer');

const { handleErrors } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });
<<<<<<< HEAD
    // res.send('submitted');
    res.redirect('/admin/products');
=======

    res.redirect('/admin/products');
    // res.send('you have submitted a product');
>>>>>>> 82d752b2dbff78b31be22a5aa8932ecf032c9e98
  }
);

// GET /products/productID
//bring up editable form
router.get('/admin/products/:productID', (req, res) => {});

//  PUT /products/productID
//submit the edit
router.put('/admin/products/:productID', (req, res) => {});

// DELETE /products/productID
//delete the product
router.delete('/admin/products/productID', (req, res) => {});
module.exports = router;
