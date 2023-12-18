require("../Config/mydb");
const userModel = require("../Models/ShoppingSchema");
const jwt = require("jsonwebtoken");
const SeceretKey = "this is hero";

const Auth = {


  // Create Account  
  Signup: async (req, res) => {
    try {
   
      const MyData = await userModel.findOne({ PhoneNo: req.body.PhoneNo });
   
      if (!MyData) {
        const data = new userModel({
          MobilNo: req.body.PhoneNo,
            ShoppingCart: [],
            Order: [],
          }); 
          const save = await data.save();

          const token = await jwt.sign({PhoneNO:req.body.PhoneNo},SeceretKey,{ expiresIn: '1h' })
          res.json({
            response:"Registeration successfully",
            data:token
          })
      }else{
       
        const token = await jwt.sign({PhoneNO:req.body.PhoneNo},SeceretKey,{ expiresIn: '1h' })
          res.json({
            response:"user already exist",
            data:token
          })
      
       
     }
    } catch (error) {
   
      res.send("server error");
    }
  },


  
};
module.exports = Auth;
