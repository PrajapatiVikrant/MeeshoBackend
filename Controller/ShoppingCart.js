const userModel = require("../Models/ShoppingSchema");

const ShoppingCart = {



  //show to cart
  showCartItem: async (req, res) => {
    const data = await userModel.findOne({ PhoneNo: req.body.PhoneNo });
    res.json(data.ShoppingCart);
  },




  //add to cart
  addToCart: async (req, res) => {
    console.log(req.body);
    const data = await userModel.findOne({ PhoneNo: req.body.PhoneNo });
    console.log(data);
    data.ShoppingCart.push({
      ProductName: req.body.ProductName,
      Price: req.body.Price,
      Url: req.body.Url,
      Qty: req.body.Qty,
    });
    await userModel.updateOne(
      { PhoneNo: req.body.PhoneNo },
      { ShoppingCart: data.ShoppingCart }
    );
    res.json(data);
  },





  //remove to cart
  removeToCart: async (req, res) => {
    const data = await userModel.findOne({ PhoneNo: req.body.PhoneNo });
    const updatedCart = data.ShoppingCart.filter((elem, ind)=>{
        return elem.ProductName !== req.body.ProductName;
    })
    const result = await userModel.updateOne(
        { PhoneNo: req.body.PhoneNo },
        { ShoppingCart: updatedCart }
      );
      res.send('removed');
  },






  //update to Cart
  updateCartItem: async (req, res) => {
    const data = await userModel.findOne({ PhoneNo: req.body.PhoneNo });
    const updatedCart = data.ShoppingCart.map((elem, ind) => {
      if (elem.ProductName === req.body.ProductName) {
        elem.Qty = req.body.Qty;
        elem.Price *= req.body.Qty;
      }
      return elem;
    });
    const result = await userModel.updateOne(
      { PhoneNo: req.body.PhoneNo },
      { ShoppingCart: updatedCart }
    );
    res.send("Updated");
  },



  
};
module.exports = ShoppingCart;
