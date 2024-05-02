import './App.css';
import './css/bootstrap.css'
import './css/delivery.css'
import ViewOrders from './components/ViewOrders';
import CreateDeliveryLog from './components/CreateDeliveryLog';
import DeliveryHeader from './components/DeliveryHeader'
import ViewDeliveryLog from './components/ViewDeliveryLog'
import UpdateDeliveryLog from './components/UpdateDeliveryLog';
import DeleteDeliveryLog from './components/DeleteDeliveryLog';
import DriverPortal from './components/DriverPortal';
import CompleteDelivery from './components/CompleteDelivery'
import DownloadDelivery from './components/DownloadDelivery';
import LorryManagement from './components/LorryManagement';

import {BrowserRouter as  Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
        <div>
         
          <Routes>
          <Route path="/delivery/add/" exact Component={CreateDeliveryLog}/>
          <Route path="/delivery/" exact Component={ViewDeliveryLog}/>
          <Route path="/delivery/update/:id" exact Component={UpdateDeliveryLog}/>
          <Route path="/driver/delivery/" exact Component={DriverPortal}/>
          <Route path="/driver/delivery/update/:id" exact Component={CompleteDelivery}/>
          <Route path="/delivery/delete/:id" exact Component={DeleteDeliveryLog}/>
          <Route path="/delivery/download" exact Component={DownloadDelivery}/>
          <Route path='/order/' exact Component={ViewOrders}/>
          <Route path='/lorry/' exact Component={LorryManagement}/>
          </Routes>

        </div>
    </Router>
  );
}
export default App;
