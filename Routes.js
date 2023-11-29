const express = require('express');
const Auth = require('./Controller/Auth')
const ShoppingCart = require('./Controller/ShoppingCart')
const Order = require('./Controller/Order')
const router = express.Router();


//Shopping Cart
router.post('/signup',Auth.Signup)
router.post('/AddtoCart',ShoppingCart.addToCart)
router.get('/showCartItem',ShoppingCart.showCartItem)
router.put('/updateToCart',ShoppingCart.updateCartItem)
router.delete('/removeToCart',ShoppingCart.removeToCart)


//Order
router.post('/SaveOrder',Order.StoreOrder);


module.exports = router;