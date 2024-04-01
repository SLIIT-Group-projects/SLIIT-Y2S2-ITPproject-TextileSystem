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
          <Route path="/add" exact Component={CreateDeliveryLog}/>
          <Route path='/' exact Component={ViewOrders}/>
          
          </Routes>
        </div>
    </Router>
  );
}

export default App;
