require("../Config/mydb");
const userModel = require("../Models/ShoppingSchema");
const jwt = require("jsonwebtoken");
const SeceretKey = "this is hero";

const Auth = {


  // Create Account  
  Signup: async (req, res) => {
    try {
      console.log(req.body)
      const MyData = await userModel.findOne({ PhoneNo: req.body.PhoneNo });
      console.log(MyData)
      if (!MyData) {
        const data = new userModel({
            PhoneNo: req.body.PhoneNo,
            ShoppingCart: [],
            Order: [],
          });
          const save = await data.save();

          const token = await jwt.sign({PhoneNO:req.body.PhoneNo},SeceretKey,{ expiresIn: '1h' })
          res.json({
            respose:"Registeration successfully",
            data:token
          })
      }else{
        res.send("You are already exist");
       
     }
    } catch (error) {
     console.log(error)
      res.send("server error");
    }
  },


  
};
module.exports = Auth;
