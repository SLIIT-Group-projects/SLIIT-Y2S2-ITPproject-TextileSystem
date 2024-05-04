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
      <Route exact path="/om/" element={<Home />} />
        <Route exact path="/om/addorder" element={<AddOrder />} />
        <Route path="/om/orders" element={<ViewAllOrders />} />
        <Route path="/om/update/:id" element={<UpdateOrder />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;