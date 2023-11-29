const mongoose = require('mongoose');
const ShoppingCart = new mongoose.Schema({
   MobilNo:{
    type:String,
    require:true
   },
   ShoppingCart:{
     type:Array
   },
   Order:{
    type:Array
   }
})
const userModel = mongoose.model('ShoppingCart',ShoppingCart)
module.exports = userModel;