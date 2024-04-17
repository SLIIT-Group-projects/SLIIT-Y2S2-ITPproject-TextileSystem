import React, { useState } from "react";
import axios from "axios";

export default function CreateDeliveryLog({ orderId }) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [driverId, setDriverId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDelivery = {
      orderId,
      deliveryDate,
      vehicleNo,
      driverId,
    };

    axios
      .post("http://localhost:8070/delivery/add/", newDelivery)
      .then((res) => {
        setSuccessMessage("Delivery log created successfully.");
      })
      .catch((err) => {
        setErrorMessage("Error creating delivery log: " + err.message);
      });
  };

  return (
    <div className="container">
      <h6>Create Delivery Log</h6>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="deliveryDate" className="form-label">
            Delivery Date
          </label>
          <input
            type="date"
            className="form-control"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleNo" className="form-label">
            Vehicle Number
          </label>
          <input
            type="text"
            className="form-control"
            id="vehicleNo"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="driverId" className="form-label">
            Driver ID
          </label>
          <input
            type="text"
            className="form-control"
            id="driverId"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Delivery Log
        </button>
      </form>
    </div>
  );
}
