const mongoose= require('mongoose');

const Schema =mongoose.Schema;
const orderSchema= new Schema({
    customerCode:{
        type:String,
        required:true
    },
    orderId :{
        type:String
    },
    DeliveryAddress:{
        type:String
    },
    Quantity:{
        type:String
    }

})
const Order= mongoose.model("order",orderSchema);

module.exports=Order;
