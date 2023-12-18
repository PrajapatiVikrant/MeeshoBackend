const userModel = require("../Models/ShoppingSchema");

const ShoppingCart = {



  //show to cart
  showCartItem: async (req, res) => {
   
    const data = await userModel.findOne({ MobilNo: req.body.PhoneNO });
   
   
    res.json(data.ShoppingCart);
  },




  //add to cart
  addToCart: async (req, res) => {
    
    const data = await userModel.findOne({ MobilNo: req.body.PhoneNO });
   
 
    data.ShoppingCart.push({
      ProductName: req.query.ProductName,
      Price: req.query.Price,
      Url: req.query.Url,
      Qty: req.query.Qty,
    });
    await userModel.updateOne(
      { MobilNo: req.body.PhoneNO },
      { ShoppingCart: data.ShoppingCart }
    );
    res.json(data);
  },





  //remove to cart
  removeToCart: async (req, res) => {
   
    
    const data = await userModel.findOne({ MobilNo: req.body.PhoneNO });
   
    const updatedCart = data.ShoppingCart.filter((elem, ind)=>{
     
        return elem.ProductName !== req.params.ProductName;
    })
   
    const result = await userModel.updateOne(
        { MobilNo: req.body.PhoneNO },
        { ShoppingCart: updatedCart }
      );
    
      res.send('removed');
  },






  //update to Cart
  updateCartItem: async (req, res) => {
   
    const data = await userModel.findOne({ MobilNo: req.body.PhoneNO });
    const updatedCart = data.ShoppingCart.map((elem, ind) => {
      if (elem.ProductName === req.query.ProductName) {
        elem.Qty = req.query.Qty;
      
      }
      return elem;
    });
    const result = await userModel.updateOne(
      { MobilNo: req.body.PhoneNO },
      { ShoppingCart: updatedCart }
    );
  
    res.send("Updated");
  },



  
};
module.exports = ShoppingCart;
