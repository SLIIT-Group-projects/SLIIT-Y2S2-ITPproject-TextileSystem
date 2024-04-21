const mongoose= require('mongoose');

const Schema =mongoose.Schema;
const deliverySchema= new Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    deliveryDate:{
        type:String,
        required:true
    },
    vehicleNo :{
        type:String
    },
    driverId:{
        type:String
    },
    deliveryStatus:{
        type:String,
        required:true,
        default: "Pending"
    },
    pin:{
        type:String,
        required:true
    }
    
}, {

    timestamps:true

})
const Delivery= mongoose.model("delivery",deliverySchema);

module.exports=Delivery;
