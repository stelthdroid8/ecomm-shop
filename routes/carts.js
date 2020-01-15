const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');
const router = express.Router();

router.post('/cart/products/', async (req, res) => {
  //   console.log(req.body.productId);
  //find cart or make new cart ID
  let cart;
  if (!req.session.cartId) {
    //need to make new cart and store on cookie
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  // add new product or increment quantity
  const existingItem = cart.items.find(item => item.id === req.body.productId);
  if (existingItem) {
    //increment quantity and save to cart
    existingItem.quantity++;
  } else {
    //add new product into cart
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });
  //   console.log(cart);
  //   res.send('product added');
  res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  //check for cart ID
  if (!req.session.cartId) {
    //if no cart redirect
    return res.redirect('/');
  }
  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

module.exports = router;
