import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './components/Profile';
import AdminHome from './pages/AdminHome';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';

import DashUsers from './components/DashUsers';
import Employee from './components/Employee';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import AddSuppliers from './pages/AddSuppliers';
import Supplier from './components/Supplier';
import UpdateSupplier from './pages/UpdateSupplier';

//dinuri
import Navbar from './components/Navbar';
import CreateFeedback from './components/CreateFeedback';
import Feedback from './components/Feedback';
import ApprovedFeedbacks from './components/ApprovedFeedbacks';
import Feedbackdashbord from './components/feedbackdashbord';
import UserFeedbacks from './components/UserFeedbacks';


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
// import Header from "./components/Header";
// // footer
// import Footer from "./components/footer";

// home
import MainHome from "./components/home";

// siluni
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

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      {/* <Header /> */}
      {/* <Mainhome/> */}
      <Routes>
        <Route path="/" element={<MainHome/>}/>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dashboard' element={<AdminHome />} />

        {/* daham */}
        {/* <Route path="/footer" exact element={<Footer />} />
        <Route path="/home" exact element={<Home />} /> */}
        {/* dinuri */}
        <Route path="/approvedFeedbacks" element={<ApprovedFeedbacks />} />
        <Route path="/create-feedback" element={<CreateFeedback />} />
        <Route path="/feedback/:Id" element={<Feedback />} />
        <Route path="/userFeedbacks" element={<UserFeedbacks />} />
        <Route path='/getusers' element={<DashUsers />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />

        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* <Route path='/create-user' element={<CreateUser />} /> */}
          <Route path='/employees' element={<Employee />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/update-employee/:employeeId' element={<UpdateEmployee />} />
          <Route path='/update-supplier/:supplierId' element={<UpdateSupplier />} />
          <Route path='/suppliers' element={<Supplier />} />
          <Route path='/addsupplier' element={<AddSuppliers />} />

          {/* dinuri */}
          <Route path="/feedbackdashbord" element={<Feedbackdashbord />} />

          {/* siluni */}
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
        
        </Route>
      </Routes>
    </BrowserRouter>
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