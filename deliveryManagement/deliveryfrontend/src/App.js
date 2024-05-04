import "./App.css";
import "./css/bootstrap.css";
import "./css/delivery.css";
import ViewOrders from "./components/ViewOrders";
import CreateDeliveryLog from "./components/CreateDeliveryLog";
import DeliveryHeader from "./components/DeliveryHeader";
import ViewDeliveryLog from "./components/ViewDeliveryLog";
import UpdateDeliveryLog from "./components/UpdateDeliveryLog";
import DeleteDeliveryLog from "./components/DeleteDeliveryLog";
import DriverPortal from "./components/DriverPortal";
import CompleteDelivery from "./components/CompleteDelivery";
import DownloadDelivery from "./components/DownloadDelivery";
import LorryManagement from "./components/LorryManagement";

// chami
import AddTask from "./components/AddTask";
import AddTaskButton from "./components/AddTaskButton";
import DisplayTasks from "./components/DisplayTask";
import UpdateTask from "./components/UpdateTask";
import DeleteTask from "./components/DeleteTask";
import Excess from "./components/Excess";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//daham
import AddProducts from "./components/addProducts";
import AddMaterials from "./components/addMaterials";
import AllProducts from "./components/AllProducts";
import AllMaterials from "./components/AllMaterials";
import UpdateMaterials from "./components/updateMaterials";
import ProductMaterials from "./components/updateProducts";
import RequestMaterials from "./components/AllRequestMaterials";
import AddRequestMaterials from "./components/addRequestMaterials";
import ViewLowMaterials from "./components/viewLowMaterials";
import AllReleasedTasks from "./components/AllReleasedTasks";
import AddReleasedMaterials from "./components/addReleasedMaterials";
import AllReleasedMaterials from "./components/AllReleasedMaterials";

//shenal
import AddOrder from "../src/components/addOrder";
import ViewAllOrders from "../src/components/viewAllOrders";
import UpdateOrder from "../src/components/updateOrder";
import OmHome from "../src/components/omHome";

// header
import Header from "./components/header";
// footer
import Footer from "./components/footer";

// home
import Home from "./components/home";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/delivery/add/" exact Component={CreateDeliveryLog} />
          <Route path="/delivery/" exact Component={ViewDeliveryLog} />
          <Route
            path="/delivery/update/:id"
            exact
            Component={UpdateDeliveryLog}
          />
          <Route path="/driver/delivery/" exact Component={DriverPortal} />
          <Route
            path="/driver/delivery/update/:id"
            exact
            Component={CompleteDelivery}
          />
          <Route
            path="/delivery/delete/:id"
            exact
            Component={DeleteDeliveryLog}
          />
          <Route path="/delivery/download" exact Component={DownloadDelivery} />
          <Route path="/order/" exact Component={ViewOrders} />
          <Route path="/lorry/" exact Component={LorryManagement} />
          {/* daham */}
          <Route path="/inv/add" exact element={<AddProducts />} />
          {/* header tempory */}
          <Route path="/footer" exact element={<Footer />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/inv/material/add" exact element={<AddMaterials />} />
          <Route path="/inv/material" exact element={<AllMaterials />} />
          <Route
            path="/inv/request_material"
            exact
            element={<RequestMaterials />}
          />
          <Route
            path="/inv/request_material/add/:id"
            exact
            element={<AddRequestMaterials />}
          />
          <Route
            path="/inv/request_material/viewLow"
            exact
            element={<ViewLowMaterials />}
          />
          <Route path="/inv/material/:id" exact element={<UpdateMaterials />} />
          <Route path="/inv/product/:id" exact element={<ProductMaterials />} />
          <Route
            path="/inv/releasedMaterials/add/:id"
            exact
            element={<AddReleasedMaterials />}
          />
          <Route
            path="/inv/AllReleasedTasks"
            exact
            element={<AllReleasedTasks />}
          />
          <Route
            path="/inv/AllReleasedMaterials"
            exact
            element={<AllReleasedMaterials />}
          />
          <Route path="/inv/" exact element={<AllProducts />} />
          {/* chami */}
          <Route path="/task/add-task" element={<AddTask />} />
          <Route path="/task/update/:id" element={<UpdateTask />} />
          <Route path="/task/delete/:id" element={<DeleteTask />} />{" "}
          {/* Route for DeleteTask component */}
          <Route path="/task/*" element={<ConditionalDisplayTasks />} />
          <Route path="/task/" element={<DisplayTasks />} />
          <Route path="/task/task-excess" element={<Excess />} />
          {/* shenal */}
          <Route exact path="/om/" element={<OmHome />} />
          <Route exact path="/om/addorder" element={<AddOrder />} />
          <Route path="/om/orders" element={<ViewAllOrders />} />
          <Route path="/om/update/:id" element={<UpdateOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalDisplayTasks() {
  return (
    <div>
      <AddTaskButton />
      <DisplayTasks />
    </div>
  );
}

export default App;
