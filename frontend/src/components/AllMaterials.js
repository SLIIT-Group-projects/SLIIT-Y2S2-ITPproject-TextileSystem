import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function AllMaterials() {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const ComponentsRef = useRef();

  const [silkTotal, setSilkTotal] = useState(0);
  const [cottonTotal, setCottonTotal] = useState(0);
  const [yarnTotal, setYarnTotal] = useState(0);
  const [buttonTotal, setButtonTotal] = useState(0);
  const [laseTotal, setLaseTotal] = useState(0);

  // Use the useEffect hook to fetch materials and calculate totals
  useEffect(() => {
    function getMaterials() {
      axios
        .get("http://localhost:8070/material/")
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

  // Handle delete function
  const handleDelete = async (materialId) => {
    try {
      await axios.delete(`http://localhost:8070/material/delete/${materialId}`);
      setMaterials(materials.filter((material) => material._id !== materialId));
      alert("Material deleted successfully");
    } catch (err) {
      console.error("Error deleting material:", err);
      alert("Error deleting Material");
    }
  };

  // Handle report download
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Product Report",
    onAfterPrint: () => alert("Product Report successfully downloaded!"),
  });

  // Handle search function
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    const filteredMaterials = materials.filter((material) =>
      Object.values(material).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setMaterials(filteredMaterials);
    setNoResult(filteredMaterials.length === 0);
  };

  return (
    <div className="inv-Allproducts-page container" ref={ComponentsRef}>
      {/* Page header */}
      <div className="pti-text-dark pti-text-h1 pti-bold text-center pb-5 pt-3">
        INVENTORY DASHBOARD
      </div>

      {/* Navigation buttons */}
      <div className="d-flex justify-content-center gap-3 pb-5">
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/">
            PRODUCTS
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/material">
            MATERIALS
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          RELEASED
        </button>
      </div>

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
          <button className="add-product-btn pti-bg-black p-2 text-light pti-rounded-small pti-bold">
            <Link className="nav-link active" to="/material/add">
              Add Material
            </Link>
          </button>
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
        <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light rounded-5">
          <th className="inv-Allproducts-table-heading1 p-2">Material ID</th>
          <th>Material Name</th>
          <th>Material Description</th>
          <th>Roll Quantity</th>
          <th>Material Color</th>
          <th className="inv-Allproducts-table-heading2 ">Actions</th>
        </tr>

        {/* Display no materials found */}
        {noResult ? (
          <tr>
            <td colSpan="7" className="text-center">
              No materials found
            </td>
          </tr>
        ) : (
          // Display each material row
          materials.map((material) => (
            <tr className="pti-bg-light_blue" key={material._id}>
              <td className="inv-Allproducts-table-row1 p-2">
                {material.material_ID}
              </td>
              <td>{material.material_name}</td>
              <td>{material.material_type}</td>
              <td>{material.roll_quantity}</td>
              <td>{material.color}</td>
              <td className="d-flex gap-3 p-2 inv-Allproducts-table-row2">
                <Link to={`/material/${material._id}`}>
                  <button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </Link>
                <button
                  className="pti-allProducts-tble-buttons pti-allProducts-delete-buttons"
                  onClick={() => handleDelete(material._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))
        )}
      </table>

      {/* Material totals summary */}
      <section className="d-flex justify-content-center pt-5 pb-4">
        <div className="inv-mat-anylicts-main d-flex justify-content-center align-items-center">
          <div className="">
            <table>
              <tr>
                <th className="inv-mat-anylicts pti-text-h2 pti-text-dark">Material</th>
                <th className="inv-mat-anylicts pti-text-h2 pti-text-dark">Totals</th>
              </tr>
              <tr>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">Silks</td>
                <td className="inv-mat-anylicts- pti-text-h3 pti-bolder text-danger">{silkTotal}</td>
              </tr>
              <tr>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">Cottons</td>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">{cottonTotal}</td>
              </tr>
              <tr>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">Yarns</td>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">{yarnTotal}</td>
              </tr>
              <tr>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">Buttons</td>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">{buttonTotal}</td>
              </tr>
              <tr>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">Lase</td>
                <td className="inv-mat-anylicts-td pti-text-h3 pti-bolder text-danger">{laseTotal}</td>
              </tr>
            </table>
          </div>

          <div>
            <div className="inv-mat-anylicts-img"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
