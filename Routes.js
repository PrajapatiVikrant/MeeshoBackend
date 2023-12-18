const express = require('express');
const Auth = require('./Controller/Auth')
const ShoppingCart = require('./Controller/ShoppingCart')
const Order = require('./Controller/Order')
const middleware = require('./Middleware/Verify');
const router = express.Router();

//show all product
router.get('/ShowallProduct',require('./Controller/Product'));


//Shopping Cart
router.post('/signup',Auth.Signup)
router.post('/AddtoCart/:token',middleware,ShoppingCart.addToCart)
router.get('/showCartItem/:token',middleware,ShoppingCart.showCartItem);
router.put('/updateToCart/:token',middleware,ShoppingCart.updateCartItem);
router.delete('/removeToCart/:token/:ProductName',middleware,ShoppingCart.removeToCart);


//Order
router.get('/ShowOrder',Order.ShowOrder)
router.post('/SaveOrder/:token',middleware,Order.StoreOrder);
router.put('/updateOrderResponse/:MobileNO/:responseType',Order.updateOrderResponse);
router.get('/sendOrderResponse/:token',middleware,Order.SendOrderResponse);



module.exports = router;