import Test from "./components/test";
import './css/main.css'
import './css/header.css'
import './css/home.css'
import './css/Inventory_styles.css'

import AddProducts from "./components/addProducts";
import AddMaterials from "./components/addMaterials";
import AllProducts from "./components/AllProducts";
import AllMaterials from "./components/AllMaterials";
import UpdateMaterials from "./components/updateMaterials";
import ProductMaterials from "./components/updateProducts";
import RequestMaterials from "./components/AllRequestMaterials";
import AddRequestMaterials from "./components/addRequestMaterials";
import ViewLowMaterials from "./components/viewLowMaterials";

//siluni
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

// header
import Header from "./components/header";
// footer
import Footer from "./components/footer";

// home
import Home from "./components/home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add" exact element={<AddProducts />} />
          {/* header tempory */}
          <Route path="/footer" exact element={<Footer />} />

          <Route path="/home" exact element={<Home />} />

          <Route path="/material/add" exact element={<AddMaterials />} />
          <Route path="/material" exact element={<AllMaterials />} />
          <Route path="/request_material" exact element={<RequestMaterials />} />
          <Route path="/request_material/add/:id" exact element={<AddRequestMaterials />} />
          <Route path="/request_material/viewLow" exact element={<ViewLowMaterials />} />
          <Route path="/material/:id" exact element={<UpdateMaterials/>} />
          <Route path="/product/:id" exact element={<ProductMaterials/>} />
          <Route path="/" exact element={<AllProducts />} />

          {/* siluni */}
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
