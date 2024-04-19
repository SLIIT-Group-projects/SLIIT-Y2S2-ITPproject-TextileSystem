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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add" exact element={<AddProducts />} />
          <Route path="/material/add" exact element={<AddMaterials />} />
          <Route path="/material" exact element={<AllMaterials />} />
          <Route path="/request_material" exact element={<RequestMaterials />} />
          <Route path="/request_material/add" exact element={<AddRequestMaterials />} />
          <Route path="/material/:id" exact element={<UpdateMaterials/>} />
          <Route path="/product/:id" exact element={<ProductMaterials/>} />
          <Route path="/" exact element={<AllProducts />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
