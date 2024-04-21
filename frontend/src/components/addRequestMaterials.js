import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

function AddMaterials() {
  const { id } = useParams(); // Extract id from the URL parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [material, setMaterial] = useState({
    material_ID: "",
    material_name: "",
    roll_quantity: "",
    color: "",
    date: ""
  });

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8070/material/get/${id}`
        );
        const materialData = response.data.material;
        setMaterial(materialData);
      } catch (error) {
        console.error("Error fetching material data:", error);
        if (error.response && error.response.status === 404) {
          alert("Material data not found");
        } else {
          alert("An error occurred while fetching material data");
        }
      }
    };
    
    fetchMaterialData();
  }, [location]);

  const sendData = async (e) => {
    e.preventDefault();

    const newMaterial = {
      material_ID: material.material_ID,
      material_name: material.material_name,
      roll_quantity: Number(material.roll_quantity),
      color: material.color,
      date: material.date
    };

    try {
      await Axios.post("http://localhost:8070/request_material/add", newMaterial);
      alert("Material Added");
      navigate("/request_material"); // Navigate back to the materials page
    } catch (error) {
      console.error("Error adding material:", error);
      alert("Error adding material");
    }
  };

  const handleIDChange = (e) => {
    setMaterial({ ...material, material_ID: e.target.value });
  };

  const handleNameChange = (e) => {
    setMaterial({ ...material, material_name: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setMaterial({ ...material, roll_quantity: e.target.value });
  };

  const handleColorChange = (e) => {
    setMaterial({ ...material, color: e.target.value });
  };

  const handleDateChange = (e) => {
    setMaterial({ ...material, date: e.target.value });
  };

  return (
    <div className="container">
      <AdminHeader />
      <div className="text-center pti-text-h2 pti-bold pb-4">
        Add Request Material
      </div>
      <form onSubmit={sendData}>
        {/* Material ID */}
        <div className="mb-3">
          <label htmlFor="materialID" className="form-label">
            Material ID
          </label>
          <input
            type="text"
            className="form-control"
            id="materialID"
            value={material.material_ID}
            onChange={handleIDChange}
            required
          />
        </div>

        {/* Material Name */}
        <div className="mb-3">
          <label htmlFor="materialName" className="form-label">
            Material Name
          </label>
          <input
            type="text"
            className="form-control"
            id="materialName"
            value={material.material_name}
            onChange={handleNameChange}
            required
          />
        </div>

        {/* Roll Quantity */}
        <div className="mb-3">
          <label htmlFor="rollQuantity" className="form-label">
            Roll Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="rollQuantity"
            value={material.roll_quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>

        {/* Color */}
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            value={material.color}
            onChange={handleColorChange}
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={material.date}
            onChange={handleDateChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          {location.state ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default AddMaterials;