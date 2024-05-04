const express = require('express');
const router = express.Router();
const Order = require('../model/order.model');
const Supplier = require('../model/supplier.model');
const nodemailer = require('nodemailer');

const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { category, material, supplier, quantity, color } = req.body;

    // Validate input data
    if (!category || !material || !supplier || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new order with status "Placed"
    const newOrder = await Order.create({
      category,
      material,
      supplier,
      quantity,
      color,
      status: 'Placed', // Set status to "Placed"
    });
    const supplierDetails = await Supplier.findOne({ username: supplier });
    const supplierEmail = supplierDetails.email;

    // Schedule order status update after 48 hours
    setTimeout(async () => {
      const updatedOrder = await Order.findByIdAndUpdate(
        newOrder._id,
        { $set: { status: 'Pending' } }, // Update status to "Pending"
        { new: true }
      );
      console.log('Order status updated to Pending:', updatedOrder);
    }, 48 * 60 * 60 * 1000); // 48 hours in milliseconds

    // Create PDF document
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('order.pdf'));

    // Add content to the PDF
    doc.fontSize(25); // Increase font size to 25
    doc.text('INVOICE - PTI TEXTILES', { align: 'center' });
    doc.moveDown();
    doc.fontSize(15);
    doc.text(`Invoice ID: ${newOrder._id}`);
    doc.text(`Material: ${material}`);
    doc.text(`Quantity: ${quantity}`);
    doc.text(`Color: ${color}`);
    doc.moveDown();
    doc.fontSize(15); // Reset font size to 15
    doc.text('We are waiting for your reply. If there is anything else, please feel free to contact us.', { align: 'center' });
  doc.end();

    
    // Send email with PDF attachment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ptiproject2024@gmail.com',
        pass: 'gdgj szjg nkth pmxe',
      },
    });

    const mailOptions = {
      from: 'ptiproject2024@gmail.com',
      to: supplierEmail,
      subject: `New Order Invoice: ${newOrder._id}`,
      text: `Dear Team,
    
    Hope you are doing well!
    
    Please do necessary to fulfill this order, we are waiting for your reply.
    
    If there is anything else, please feel free to contact us.
    
    Kind regards,
    Shenal Weerawardhana
    Supplier Manager
    PTI Textiles 
    +94 716 442 849`,
      attachments: [{ filename: 'order.pdf', path: 'order.pdf' }],
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        fs.unlinkSync('order.pdf'); // Delete the PDF file after sending the email
        res.status(201).json(newOrder);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// API endpoint to get all unique categories and usernames
router.get('/suppliers/categories', async (req, res) => {
  try {
      const results = await Supplier.aggregate([
          { $group: {
              _id: '$category', // Group by category
              usernames: { $push: '$username' } // Collect usernames for each category
          }},
          { $project: {
              _id: 0, // Exclude the _id field from results
              category: '$_id', // Rename _id to category
              usernames: 1 // Include usernames array in the output
          }}
      ]);

      res.status(200).json(results);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
});
// GET route to fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT route to update an existing order
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category, material, supplier, quantity, color } = req.body;

    // Validate input data here

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      category,
      material,
      supplier,
      quantity,
      color,
    }, { new: true });

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// DELETE route to delete an order
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input data here

    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});




module.exports = router;