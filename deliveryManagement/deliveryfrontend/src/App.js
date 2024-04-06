import './App.css';

import ViewOrders from './components/ViewOrders';
import CreateDeliveryLog from './components/CreateDeliveryLog';
import DeliveryHeader from './components/DeliveryHeader'
import ViewDeliveryLog from './components/ViewDeliveryLog'
import UpdateDeliveryLog from './components/UpdateDeliveryLog';
import DeleteDeliveryLog from './components/DeleteDeliveryLog';

import {BrowserRouter as  Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
        <div>
          <DeliveryHeader/>
      
          <Routes>
          <Route path="/delivery/add" exact Component={CreateDeliveryLog}/>
          
          <Route path="/delivery/" exact Component={ViewDeliveryLog}/>
          <Route path="/delivery/update/:id" exact Component={UpdateDeliveryLog}/>
          <Route path="/delivery/delete/:id" exact Component={DeleteDeliveryLog}/>
          <Route path='/order/' exact Component={ViewOrders}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
