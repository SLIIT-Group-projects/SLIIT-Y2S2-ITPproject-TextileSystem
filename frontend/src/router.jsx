import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import AddOrder from './components/addOrder';
import ViewAllOrders from './components/viewAllOrders';
import UpdateOrder from './components/updateOrder';
import Home from './components/Home';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/addorder" element={<AddOrder />} />
        <Route path="/orders" element={<ViewAllOrders />} />
        <Route path="/update/:id" element={<UpdateOrder />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;