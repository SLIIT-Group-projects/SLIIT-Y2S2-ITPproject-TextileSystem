const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  category: { type: String, required: true },
  material: { type: String, required: true },
  supplier: { type: String, required: true },
  quantity: { type: Number, required: true },
  color: { type: String },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;