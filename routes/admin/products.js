const express = require('express');

const multer = require('multer');

const handleErrors = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// GET /products
router.get('/admin/products', (req, res) => {});

// GET /product/new
//form to upload new products
router.get('/admin/products/new', (req, res) => {
  res.send(productsNewTemplate({}));
});

// POST /product/new
//submit new products to DB
router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors({ productsNewTemplate }),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });
    res.send('submitted');
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
