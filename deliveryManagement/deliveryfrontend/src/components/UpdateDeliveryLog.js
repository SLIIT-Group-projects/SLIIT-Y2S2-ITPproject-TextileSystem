import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router'

export default function UpdateDeliveryLog() {
    const { id } = useParams();
    const history= useNavigate();

    const [delivery, setDelivery] = useState({
        orderId: "",
        deliveryDate: "",
        vehicleNo: "",
        driverId: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8070/delivery/get/${id}`)
            .then((res) => {
                setDelivery(res.data.delivery);
            })
            .catch((err) => {
                console.error("Error fetching delivery:", err);
            });
    }, [id]);

    const handleChange = (e) => {
        setDelivery({ ...delivery, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/delivery/update/${id}`, delivery)
            .then(() => {
                alert("Delivery details updated");
                history.push("/ViewDeliveryLog");
                // Redirect to view page or any other page
            })
            .catch((err) => {
                console.error("Error updating delivery:", err);
            });
    };

    return (
        <div className="container">
            <h1>Update Delivery Log</h1>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                    <input type="date" id="deliveryDate" name="deliveryDate" value={delivery.deliveryDate} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="orderId" className="form-label">Order Id:</label>
                    <input type="text" id="orderId" name="orderId" value={delivery.orderId} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="vehicleNumber" className="form-label">Vehicle No</label>
                    <input type="text" id="vehicleNumber" name="vehicleNo" value={delivery.vehicleNo} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="driverID" className="form-label">Driver ID</label>
                    <input type="text" id="driverID" name="driverId" value={delivery.driverId} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
