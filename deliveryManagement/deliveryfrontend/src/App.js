import './App.css';

import ViewOrders from './components/ViewOrders';
import CreateDeliveryLog from './components/CreateDeliveryLog';
import DeliveryHeader from './components/DeliveryHeader'
import ViewDeliveryLog from './components/ViewDeliveryLog'

import {BrowserRouter as  Router, Route, Routes} from "react-router-dom"
function App() {
  return (
    <Router>
        <div>
          <DeliveryHeader/>
      
          <Routes>
          <Route path="/delivery/add" exact Component={CreateDeliveryLog}/>
          <Route path='/order/' exact Component={ViewOrders}/>
          <Route path="/delivery/" exact Component={ViewDeliveryLog}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
