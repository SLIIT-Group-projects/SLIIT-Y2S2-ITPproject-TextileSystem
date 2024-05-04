import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminHeader from './AdminHeader';

function AddMaterials() {
  const navigate = useNavigate();

  const [material_ID, setID] = useState("");
  const [material_name, setName] = useState("");
  const [material_type, setType] = useState("");
  const [roll_quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");

  const sendData = async (e) => {
    e.preventDefault();

    const newMaterial = {
      material_ID,
      material_name,
      material_type,
      roll_quantity: Number(roll_quantity),
      color,
    };

    // Send product data to the server
    axios
      .post("http://localhost:3000/material/add", newMaterial)
      .then(() => {
        alert("Material Added");
        navigate("/inv/material"); // Navigate back to the materials page
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <AdminHeader/>
      <div className="text-center pti-text-h2 pti-bold pb-4">ADD MATERIALS</div>
      <form onSubmit={sendData}>
        {/* first row */}
        <div className="d-flex justify-content-center gap-3">
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <div className="form-label pti-text-dark pti-bold">Material ID</div>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setID(e.target.value);
              }}
              required/>
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label htmlFor="name" className="form-label pti-text-dark pti-bold">
              Material Name
            </label>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required/>
          </div>
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label
            htmlFor="description"
            className="form-label pti-text-dark pti-bold"
          >
            Material Description
          </label>
          <input
            type="text"
            className="add-product-input form-control"
            onChange={(e) => {
              setType(e.target.value);
            }}
            required/>
        </div>
        {/* third row */}
        <div className="d-flex justify-content-center gap-3">
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="quantity"
              className="form-label pti-text-dark pti-bold"
            >
              Roll Quantity
            </label>
            <input
              type="number"
              min="0"
              className="add-product-input form-control"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              required/>
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="weight"
              className="form-label pti-text-dark pti-bold"
            >
              Colour
            </label>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 pt-4">
          <button
            type="submit"
            className="add-product-btn pti-bold btn btn-primary pti-rounded-small"
          >
            Submit
          </button>
          <button
            type="reset"
            className="add-product-btn bg-black text-light pti-bold pti-rounded-small"
          >
            cancel
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default AddMaterials;
