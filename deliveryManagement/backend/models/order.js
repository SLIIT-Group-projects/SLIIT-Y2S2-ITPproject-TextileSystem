const mongoose= require('mongoose');
const deliverySchema = require('./delivery');

const Schema =mongoose.Schema;
const orderSchema= new Schema({
        user: {
          type: String, required: true ,
        },    
        orderItems: [
          {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            
          },
        ],
        shippingAddress: { 
            type: String, required: true ,
        },
        paymentMethod: {
          type: String,
          required: true,
        },
        paymentResult: {
          id: { type: String },
          status: { type: String },
          update_time: { type: String },
          email_address: { type: String },
        },
        itemsPrice: {
          type: Number,
          required: true,
          default: 0.0,
        },

        shippingPrice: {
          type: Number,
          required: true,
          default: 0.0,
        },
        totalPrice: {
          type: Number,
          required: true,
          default: 0.0,
        },
        isPaid: {
          type: Boolean,
          required: true,
          default: false,
        },
        paidAt: {
          type: Date,
        },
        deliveries: [
            { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Delivery' // Referencing the Delivery model
            }
      ]},
      {
        timestamps: true,
      })
const Order= mongoose.model("order",orderSchema);

module.exports=Order;
