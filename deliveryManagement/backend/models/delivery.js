const mongoose= require('mongoose');

const Schema =mongoose.Schema;
const deliverySchema= new Schema({
    orderId:{
        type:String,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    },
    vehicleNo :{
        type:String
    },
    driverId:{
        type:String
    }

})
const Delivery= mongoose.model("delivery",deliverySchema);

module.exports=Delivery;

