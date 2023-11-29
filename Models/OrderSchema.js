const mongoose = require('mongoose');

const Order = mongoose.Schema({
    MobileNO:{
        type:String,
        require:true 
    },
   Products:{
    type:Array,
   },
   Responses:{
    type:Object
   }
})

const orderModel = mongoose.model('order',Order);

module.exports = orderModel;

