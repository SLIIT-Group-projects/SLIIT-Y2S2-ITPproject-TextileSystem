import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AdminHeader from './AdminHeader';

export default function AllMaterials() {
  const [releasedMaterials, setReleasedMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const componentsRef = useRef();

  // Fetch materials from the server and calculate totals
  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await axios.get(
          "http://localhost:3000/released_material/released/"
        );
        const data = response.data;
        setReleasedMaterials(data);

        // Check if no results found based on data
        setNoResult(data.length === 0);
      } catch (error) {
        console.error("Error fetching releasing tasks:", error);
        alert("Failed to fetch tasks.");
      }
    }
    fetchMaterials();
  }, []);

  // Handle printing report
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Materials Report",
    onAfterPrint: () => alert("Report successfully downloaded!"),
  });

  // Handle searching for materials
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredMaterials = releasedMaterials.filter((material) =>
      Object.values(material).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setReleasedMaterials(filteredMaterials);
    setNoResult(filteredMaterials.length === 0);
  };

  return (
    <div className="container" ref={componentsRef}>
      <AdminHeader/>

      {/* Search form */}
      <div className="w-100 d-flex justify-content-center pt-4 pb-5">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary ml-2" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Title and buttons for materials */}
      <div className="d-flex justify-content-between">
        <h2 className="text-black pti-bold">Releasing Tasks</h2>
        <div className="d-flex gap-3">
          
          <button className=" add-product-btn pti-rounded-small pti-bg-black text-light pti-bold" onClick={handlePrint}>
            Download Report
          </button>
        </div>
      </div>

      {/* Table for materials */}
      <table className=" mt-4 inv-Allproducts-table">
        {/* Table header */}
        <thead className="">
          <tr className="inv-request-table-row pti-bg-secondary_blue text-light rounded-5">
            <th className="inv-request-table-row inv-Allproducts-table-heading1 p-2">Material Name</th>
            <th className="inv-request-table-row">Material Color</th>
            <th className="inv-request-table-row">Quantity</th>
            <th className="inv-request-table-row">employee id</th>
            <th className="inv-request-table-row inv-Allproducts-table-heading2">Date</th>
          </tr>
        </thead>

        {/* Display no materials found */}
        {noResult ? (
          <tbody>
            <tr>
              <td colSpan="6" className="text-center">
                No materials found
              </td>
            </tr>
          </tbody>
        ) : (
          // Display each material row
          <tbody>
            {releasedMaterials.map((releasedMaterial) => {
              return (
                <tr key={releasedMaterial._id} className="pti-bg-light_blue ">
                  <td className="inv-Allproducts-table-row1 p-2">{releasedMaterial.item_name}</td>
                  <td>{releasedMaterial.color}</td>
                  <td>{releasedMaterial.target}</td>
                  <td>{releasedMaterial.emp_id}</td>
                  <td>{releasedMaterial.date}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
