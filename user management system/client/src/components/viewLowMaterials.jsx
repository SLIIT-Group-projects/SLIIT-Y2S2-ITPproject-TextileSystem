import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AdminHeader from './AdminHeader';
import AdminMainHeader from '../components/Header'
export default function AllMaterials() {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const componentsRef = useRef();

  const [silkTotal, setSilkTotal] = useState(0);
  const [cottonTotal, setCottonTotal] = useState(0);
  const [yarnTotal, setYarnTotal] = useState(0);
  const [buttonTotal, setButtonTotal] = useState(0);
  const [laseTotal, setLaseTotal] = useState(0);

  // Fetch materials and calculate totals
  useEffect(() => {
    function getMaterials() {
      axios
        .get("http://localhost:3000/material/")
        .then((res) => {
          const data = res.data;
          setMaterials(data);

          // Calculate totals based on material type
          let silk = 0,
            cotton = 0,
            yarn = 0,
            button = 0,
            lase = 0;

          data.forEach((material) => {
            if (material.material_name === "silk") {
              silk += material.roll_quantity;
            } else if (material.material_name === "cotton") {
              cotton += material.roll_quantity;
            } else if (material.material_name === "yarn") {
              yarn += material.roll_quantity;
            } else if (material.material_name === "button") {
              button += material.roll_quantity;
            } else if (material.material_name === "lase") {
              lase += material.roll_quantity;
            }
          });

          setSilkTotal(silk);
          setCottonTotal(cotton);
          setYarnTotal(yarn);
          setButtonTotal(button);
          setLaseTotal(lase);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getMaterials();
  }, []);

  // Handle report download
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Product Report",
    onAfterPrint: () => alert("Product Report successfully downloaded!"),
  });

  // Handle search function
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredMaterials = materials.filter((material) =>
      Object.values(material).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setMaterials(filteredMaterials);
    setNoResult(filteredMaterials.length === 0);
  };

  return (
    <div className="inv-Allproducts-page container" ref={componentsRef}>
      <AdminMainHeader/>
      <AdminHeader/>

      {/* Search form */}
      <div className="w-100 d-flex justify-content-center pt-4 pb-5">
        <form
          className="inv-search-bar d-flex justify-content-center form-inline"
          onSubmit={handleSearch}
        >
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
          />
          <button
            className="btn btn-outline-primary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {/* Title and buttons for materials */}
      <div className="d-flex justify-content-between">
        <div className="pti-text-h2 pti-bold text-black">MATERIALS</div>
        <div className="d-flex gap-3">
          <button
            className="add-product-btn pti-bg-black p-2 text-light pti-rounded-small pti-bold"
            onClick={handlePrint}
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Table for materials */}
      <table border={0} className="inv-Allproducts-table">
        {/* Table header */}
        <thead>
          <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light rounded-5">
            <th className="inv-Allproducts-table-heading1 p-2">Material ID</th>
            <th>Material Name</th>
            <th>Material Description</th>
            <th>Roll Quantity</th>
            <th>Material Color</th>
            <th className="inv-Allproducts-table-heading2">Actions</th>
          </tr>
        </thead>

        {/* Display no materials found */}
        {noResult ? (
          <tr>
            <td colSpan="6" className="text-center">
              No materials found
            </td>
          </tr>
        ) : (
          // Display each material row
          <tbody>
            {materials
              .filter((material) => material.roll_quantity < 50) // Filter materials with roll quantity less than 50
              .map((material) => {
                // Define a class name for the row
                const rowClassName =
                  material.roll_quantity < 50 ? "low-roll-quantity" : "";
                return (
                  <tr
                    className={`pti-bg-light_blue ${rowClassName}`}
                    key={material._id}
                  >
                    <td className="inv-Allproducts-table-row1 p-2">
                      {material.material_ID}
                    </td>
                    <td>{material.material_name}</td>
                    <td>{material.material_type}</td>
                    <td>{material.roll_quantity}</td>
                    <td>{material.color}</td>
                    <td className="d-flex gap-3 p-2 inv-Allproducts-table-row2">
                      <Link to={`/inv/request_material/add/${material._id}`}>
                        <button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
  );
}
