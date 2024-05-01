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
import AllReleasedTasks from "./components/AllReleasedTasks";
import AddReleasedMaterials from "./components/addReleasedMaterials";
import AllReleasedMaterials from "./components/AllReleasedMaterials";

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
          <Route path="/inv/add" exact element={<AddProducts />} />
          {/* header tempory */}
          <Route path="/footer" exact element={<Footer />} />

          <Route path="/home" exact element={<Home />} />

          <Route path="/inv/material/add" exact element={<AddMaterials />} />
          <Route path="/inv/material" exact element={<AllMaterials />} />
          <Route path="/inv/request_material" exact element={<RequestMaterials />} />
          <Route path="/inv/request_material/add/:id" exact element={<AddRequestMaterials />} />
          <Route path="/inv/request_material/viewLow" exact element={<ViewLowMaterials />} />
          <Route path="/inv/material/:id" exact element={<UpdateMaterials/>} />
          <Route path="/inv/product/:id" exact element={<ProductMaterials/>} />
          <Route path="/inv/releasedMaterials/add/:id" exact element={<AddReleasedMaterials />} />
          <Route path="/inv/AllReleasedTasks" exact element={<AllReleasedTasks />} />
          <Route path="/inv/AllReleasedMaterials" exact element={<AllReleasedMaterials />} />
          <Route path="/inv/" exact element={<AllProducts />} />

        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
