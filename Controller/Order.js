require("../Config/mydb");
const orderModel = require('../Models/OrderSchema');

const Order = {
  //Store api
  StoreOrder: async (req, res) => {
    try {
      console.log(req.body)
      const data = new orderModel({MobileNO:"hello",Products:req.body.Products,Responses:{Seen:false,Confirmation:false,Ready:false,OutForDelivery:false,Complete:false}})
      await data.save();
      res.status(200).send("Orders have saved successfully");
    } catch (error) {
      console.log(error)
      res.status(500).send("server error");
    }
   
  },

  //Update order response
  updateOrderResponse: async (req, res) => {

  },

  //Send order response api
  SendOrderResponse: async (req, res) => {

  },
  //Delete Order
  deleteOrder: async (req, res) => {

  },
};

module.exports = Order;
