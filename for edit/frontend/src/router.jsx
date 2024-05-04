import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddOrder from '../../../deliveryManagement/deliveryfrontend/src/components/addOrder';
import ViewAllOrders from '../../../deliveryManagement/deliveryfrontend/src/components/viewAllOrders';
import UpdateOrder from '../../../deliveryManagement/deliveryfrontend/src/components/updateOrder';
import OmHome from '../../../deliveryManagement/deliveryfrontend/src/components/omHome';

const AppRouter = () => {
  return (
    <Router>
      
      <Routes>
      <Route exact path="/om/" element={<OmHome />} />
        <Route exact path="/om/addorder" element={<AddOrder />} />
        <Route path="/om/orders" element={<ViewAllOrders />} />
        <Route path="/om/update/:id" element={<UpdateOrder />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;