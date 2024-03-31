const mongoose= require('mongoose');

const Schema =mongoose.Schema;
const orderSchema= new Schema({
    customerCode:{
        type:String,
        required:true
    },
    orderId :{
        type:String,
        required:true
    },
    deliveryAddress:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    }

})
const Order= mongoose.model("order",orderSchema);

module.exports=Order;
