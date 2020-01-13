const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');
const router = express.Router();

// GET /products
router.get('/admin/products', (req, res) => {});

// GET /product/new
//form to upload new products
router.get('/admin/products/new', (req, res) => {
  res.send(productsNewTemplate({}));
});

// POST /product/new
//submit new products to DB
router.post('/admin/products/new', [requireTitle, requirePrice], (req, res) => {
  res.send('submitted');
  const errors = validationResult(req);
  //   console.log(errors);
  //   console.log(req.body);
});

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
