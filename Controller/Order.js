require("../Config/mydb");
const orderModel = require("../Models/OrderSchema");
const userModel = require("../Models/ShoppingSchema");

const Order = {
  //Store api
  StoreOrder: async (req, res) => {
    try {
     
     
      const Products = JSON.parse(req.query.Products);
     
      const data = new orderModel({
        MobileNO: req.body.PhoneNO,
        Products: Products,
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
      
      res.status(500).send("server error");
    }
  },


  //Show all order
  ShowOrder:async(req,res)=>{
   const data = await orderModel.find({});
  
   res.json(data)
  },

  //Update order response
  updateOrderResponse: async (req, res) => {
    //Mobile,responseType
    try {

      const data = await orderModel.findOne({ MobileNO: req.params.MobileNO });
      
      if (data) {
        switch (req.params.responseType) {
          case "Seen":
           
            if(data.Responses.Seen === true){
              console.log('bhai ab false hoga')
              data.Responses.Seen = false;
            }else{
              data.Responses.Seen = true;
            }
          const result =  await orderModel.updateOne(
              { MobileNO: req.params.MobileNO },
              { Responses: data.Responses }
            );
            console.log(result)
           
            break;
          case "Confirmation":
            if(data.Responses.Confirmation === true){
              data.Responses.Confirmation = false;
            }else{
              data.Responses.Confirmation = true;
            }
            await orderModel.updateOne(
              { MobileNO: req.params.MobileNO },
              { Responses: data.Responses }
            );
            break;
          case "Ready":
            if(data.Responses.Ready === true){
              data.Responses.Ready = false;
            }else{
              data.Responses.Ready = true;
            }
           
           const result1 = await orderModel.updateOne(
              { MobileNO: req.params.MobileNO },
              { Responses: data.Responses }
            );
            console.log(result1)
            break;
          case "OutForDelivery":
            if(data.Responses.OutForDelivery === true){
              data.Responses.OutForDelivery = false;
              console.log('Abi na nikla yha se maal leke')
            }else{
              data.Responses.OutForDelivery = true;
            }
            await orderModel.updateOne(
              { MobileNO: req.params.MobileNO },
              { Responses: data.Responses }
            );
            break;
          case "Complete":
            await orderModel.deleteOne({ MobileNO: req.params.MobileNO });
            break;
          default:
            break;
        }
        console.log('response updated')
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
    const data = await orderModel.findOne({MobileNO:req.body.PhoneNO});
    res.json({
      Responses:data.Responses
    })
  },

};

module.exports = Order;
