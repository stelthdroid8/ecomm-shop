const express = require('express');
const cartsRepo = require('../repositories/carts');
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
  res.send('product added');
});

module.exports = router;
