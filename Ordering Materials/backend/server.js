const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./route/order.route');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Allow requests only from 'http://localhost:3000'
app.use(cors({
    origin: 'http://localhost:3000'
  }));  

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://ptiproject123:ptiproject123@cluster0.4yctu6r.mongodb.net/pti_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));