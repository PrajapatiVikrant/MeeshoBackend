require("../Config/mydb");
const orderModel = require("../Models/OrderSchema");
const userModel = require("../Models/ShoppingSchema");

const Order = {
  //Store api
  StoreOrder: async (req, res) => {
    try {
      console.log(req.body);
      const data = new orderModel({
        MobileNO: req.body.MobileNO,
        Products: req.body.Products,
        Responses: {
          Seen: false,
          Confirmation: false,
          Ready: false,
          OutForDelivery: false,
          Complete: false,
        },
      });
      await data.save();
      res.status(200).send("Orders have saved successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  },

  //Update order response
  updateOrderResponse: async (req, res) => {
    //Mobile,responseType
    try {
      const data = await orderModel.findOne({ MobileNO: req.body.MobileNO });
      if (data) {
        switch (req.body.responseType) {
          case "Seen":
           
            data.Responses.Seen = true;
          const result =  await orderModel.updateOne(
              { MobileNO: req.body.MobileNO },
              { Responses: data.Responses }
            );
            console.log(result)
            break;
          case "Confirmation":
            data.Responses.Confirmation = true;
            await orderModel.updateOne(
              { MobileNO: req.body.MobileNO },
              { Responses: data.Responses }
            );
            break;
          case "Ready":
            data.Responses.Ready = true;
            await orderModel.updateOne(
              { MobileNO: req.body.MobileNO },
              { Responses: data.Responses }
            );
            break;
          case "OutForDelivery":
            data.Responses.OutForDelivery = true;
            await orderModel.updateOne(
              { MobileNO: req.body.MobileNO },
              { Responses: data.Responses }
            );
            break;
          case "Complete":
            await orderModel.deleteOne({ MobileNO: req.body.MobileNO });
            break;
          default:
            break;
        }
        res.json({
          messege:"UpdateResponses"
        })
      }
    } catch (error) {
      console.log(error);
    }
  },

  //Send order response api
  SendOrderResponse: async (req, res) => {
    const data = await orderModel.findOne({MobileNO:req.query.MobileNO});
    res.json({
      Response:data.Responses
    })
  },

};

module.exports = Order;
