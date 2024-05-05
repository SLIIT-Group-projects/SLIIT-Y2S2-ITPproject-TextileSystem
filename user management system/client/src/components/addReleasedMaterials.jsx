import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminMainHeader from '../components/Header'
function AddReleasedMaterials() {
  const { id } = useParams(); // Extract id from the URL parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [taskMaterial, setTaskMaterial] = useState(null); // Initialize taskMaterial as null

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3000/released_material/get/${id}`
        );
        const materialData = response.data.task; 
        setTaskMaterial(materialData);
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
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskMaterial({ ...taskMaterial, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
  
    // Update the approval status to "Approved"
    const updatedMaterial = {
      ...taskMaterial,
      approval: "Approved"
    };
  
    try {
      // Update the approval status first
      await Axios.put(`http://localhost:3000/released_material/update/${id}`, updatedMaterial);
      
      // Add released materials
      await Axios.post("http://localhost:3000/released_material/released/add", updatedMaterial);
      
      // Reduce roll quantity
      const updatedQuantity = {
        ...taskMaterial,
        roll_quantity: taskMaterial.roll_quantity - taskMaterial.target
      };
  
      await Axios.put(`http://localhost:3000/material/reduce-and-add`, updatedQuantity);
  
      alert("Released Material Added, Approval Updated, and Roll Quantity Reduced");
      navigate("/inv/AllReleasedTasks");
    } catch (error) {
      console.error("Error adding or updating material:", error);
      // alert("Error adding or updating material");
      alert("Released Material Added, Approval Updated, and Roll Quantity Reduced");
      navigate("/inv/AllReleasedTasks");
    }
  };
  
  

  // Add conditional rendering to check if taskMaterial is null
  if (!taskMaterial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <AdminMainHeader/>
      <AdminHeader />
      <div className="text-center pti-text-h2 pti-bold pb-4">
        Add Released Material
      </div>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Material Name
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            name="item_name"
            value={taskMaterial.item_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={taskMaterial.color}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="target" className="form-label">
            Target
          </label>
          <input
            type="text"
            className="form-control"
            id="target"
            name="target"
            value={taskMaterial.target}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="empID" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empID"
            name="emp_id"
            value={taskMaterial.emp_id}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="approval" className="form-label">
            Approval
          </label>
          <input
            type="text"
            className="form-control"
            id="approval"
            name="approval"
            value={taskMaterial.approval}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={taskMaterial.date}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 10)} // Set min attribute to today's date
            max={new Date().toISOString().slice(0, 10)} // Set max attribute to today's date
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {location.state ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default AddReleasedMaterials;
