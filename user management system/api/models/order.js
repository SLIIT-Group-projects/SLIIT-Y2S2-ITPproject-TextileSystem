import mongoose from 'mongoose';
import deliverySchema from  './delivery.js';
// const deliverySchema = require('./delivery');

const Schema =mongoose.Schema;
const orderSchema= new Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },    
        orderItems: [
          {
            product_name : { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            unit_price: { type: Number, required: true },
            weight: {type: Number, require: true},
            size: {type: Number, required: true},
            product: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'Product',
            },
          },
        ],
       
        shippingAddress: { 
            type: String, required: true ,
        },
        paymentMethod: {
          type: String,
          required: true,
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

export default Order;
