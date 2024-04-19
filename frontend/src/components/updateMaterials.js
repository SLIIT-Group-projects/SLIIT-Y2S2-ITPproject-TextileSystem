import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

function UpdateMaterials() {
  const { id } = useParams(); // Extract id from the URL parameters
  const navigate = useNavigate(); // useNavigate hook to navigate
  const [material, setMaterial] = useState({
    material_ID: "",
    material_name: "",
    material_type: "",
    roll_quantity: "",
    color: "",
  });

  // Fetch the material data when component mounts
  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        // Make an Axios request to fetch material data by ID
        const response = await Axios.get(
          `http://localhost:8070/material/get/${id}`
        );
        const materialData = response.data.material;
        // Update the state with fetched data
        setMaterial(materialData);
      } catch (error) {
        // Handle the error
        console.error("Error fetching material data:", error);
        if (error.response && error.response.status === 404) {
          alert("Material data not found");
        } else {
          alert("An error occurred while fetching material data");
        }
      }
    };

    fetchMaterialData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the material data
      await Axios.put(`http://localhost:8070/material/update/${id}`, material);
      alert("Material updated successfully");
      navigate("/material"); // Navigate back to the materials page
    } catch (error) {
      console.error("Error updating material:", error);
      alert("Error updating material");
    }
  };

  return (
    <div className="container">
      <AdminHeader/>
      {/* Form Title */}
      <div className="text-center pti-text-h2 pti-bold pb-4">
        Update MATERIALS
      </div>
      {/* Update Form */}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="d-flex justify-content-center gap-3">
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="material_ID"
              className="form-label pti-text-dark pti-bold"
            >
              Material ID
            </label>
            <input
              id="material_ID"
              type="text"
              name="material_ID"
              value={material.material_ID}
              className="add-product-input form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="material_name"
              className="form-label pti-text-dark pti-bold"
            >
              Material Name
            </label>
            <input
              id="material_name"
              type="text"
              name="material_name"
              value={material.material_name}
              className="add-product-input form-control"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label
            htmlFor="material_type"
            className="form-label pti-text-dark pti-bold"
          >
            Material Description
          </label>
          <input
            id="material_type"
            type="text"
            name="material_type"
            value={material.material_type}
            className="add-product-input form-control"
            onChange={handleInputChange}
          />
        </div>
        {/* Third row */}
        <div className="d-flex justify-content-center gap-3">
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="roll_quantity"
              className="form-label pti-text-dark pti-bold"
            >
              Roll Quantity
            </label>
            <input
              id="roll_quantity"
              type="number"
              name="roll_quantity"
              value={material.roll_quantity}
              className="add-product-input form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="color"
              className="form-label pti-text-dark pti-bold"
            >
              Color
            </label>
            <input
              id="color"
              type="text"
              name="color"
              value={material.color}
              className="add-product-input form-control"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Form Buttons */}
        <div className="d-flex justify-content-center gap-3 pt-4">
          <button
            type="submit"
            className="add-product-btn pti-bold btn btn-primary pti-rounded-small"
          >
            Update
          </button>
          <button
            type="reset"
            className="add-product-btn bg-black text-light pti-bold pti-rounded-small"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateMaterials;
