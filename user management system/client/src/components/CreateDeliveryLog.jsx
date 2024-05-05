import React, { useState,useEffect } from "react";
import axios from "axios";
import AdminMainHeader from '../components/Header'

export default function CreateDeliveryLog({ orderId }) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [driverId, setDriverId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lorries, setLorryDetails] = useState([]);
   const [selectedLorryCapacity, setSelectedLorryCapacity] = useState(0);


  useEffect(() => {
    axios
      .get("http://localhost:3000/lorry")
      .then((res) => {
        setLorryDetails(res.data);
      })
      .catch((err) => {
        console.error("Error fetching lorry details:", err);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
      today.setHours(0, 0, 0, 0); 

     
      const selectedDeliveryDate = new Date(deliveryDate);

      if (selectedDeliveryDate < today) {
        setErrorMessage("Please select a delivery date after today.");
        return;
      }
      const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const newDelivery = {
      orderId,
      deliveryDate,
      vehicleNo,
      driverId,
      pin,
    };

    axios
      .post("http://localhost:3000/delivery/add/", newDelivery)
      .then((res) => {
        setSuccessMessage("Delivery log created successfully.");
      })
      .catch((err) => {
        setErrorMessage("Error creating delivery log: " + err.message);
      });
  };

  return (
    <div className="container">
      <p >Create Delivery Log</p>
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
          <label htmlFor="driverId" className="form-label">
            Driver Name:
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
        <select
            className="form-select"
            id="selectedLorry"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            required
          >
            <option value="">Select a Lorry</option>
            {lorries.map((lorry) => (
              <option key={lorry._id} value={lorry.lorryNumber}>
                {lorry.lorryNumber}
              </option>
            ))}
          </select>
            <br/>
        <button type="submit" className="btn action-button btn-primary">
          Create Delivery Log
        </button>
        <br/>
      </form>
    </div>
  );
}
