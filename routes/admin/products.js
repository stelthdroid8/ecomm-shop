const express = require('express');
const router = exprss.Router();

// GET /products
router.get('/admin/products', (req, res) => {});

// GET /product/new
//form to upload new products
router.get('/admin/products/new', (req, res) => {});

// POST /product/new
//submit new products to DB
router.post('/admin/products', (req, res) => {});

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
