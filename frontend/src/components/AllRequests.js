import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AdminHeader from '../components/AdminHeader';

export default function AllMaterials() {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const componentsRef = useRef();

  // Fetch materials from the server and calculate totals
  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await axios.get(
          "http://localhost:8070/request_material"
        );
        const data = response.data;
        setMaterials(data);

        // Check if no results found based on data
        setNoResult(data.length === 0);
      } catch (error) {
        console.error("Error fetching materials:", error);
        alert("Failed to fetch materials.");
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
    const filteredMaterials = materials.filter((material) =>
      Object.values(material).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setMaterials(filteredMaterials);
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
        <h2 className="text-black pti-bold">MATERIALS</h2>
        <div className="d-flex gap-3">
          <button className="add-product-btn pti-rounded-small pti-bg-black">
            <Link className=" nav-link text-light pti-bold" to="/request_material/add">
              Add Requests
            </Link>
          </button>
          <button className=" add-product-btn pti-rounded-small pti-bg-black text-light pti-bold" onClick={handlePrint}>
            Download Report
          </button>
        </div>
      </div>

     
    </div>
  );
}