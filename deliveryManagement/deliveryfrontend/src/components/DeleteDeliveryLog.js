import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

export default function UpdateDeliveryLog() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [delivery, setDelivery] = useState({
        orderId: "",
        deliveryDate: "",
        vehicleNo: "",
        driverId: ""
    });

    const deleteHandler= async()=>{
        await axios.delete(`http://localhost:8070/delivery/delete/${id}`)
        .then(res =>res.data)
        .then(()=>navigate("/"))
        .then(()=>navigate("/ViewDeliveryLog"))
        .catch((err) => {
            console.error("Cannot delete:", err);
        });
    }
    useEffect(() => {
        axios.get(`http://localhost:8070/delivery/get/${id}`)
            .then((res) => {
                setDelivery(res.data.delivery);
            })
            .catch((err) => {
                console.error("Error fetching delivery:", err);
            });
    }, [id]);

    
    return (
        <div className="container">
            <h1>Delete Delivery Log</h1>
            <form onSubmit={deleteHandler}>
                <div className="container">
                    <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                    <input type="date" id="deliveryDate" name="deliveryDate" value={delivery.deliveryDate} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="orderId" className="form-label">Order Id:</label>
                    <input type="text" id="orderId" name="orderId" value={delivery.orderId}  className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="vehicleNumber" className="form-label">Vehicle No</label>
                    <input type="text" id="vehicleNumber" name="vehicleNo" value={delivery.vehicleNo} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="driverID" className="form-label">Driver ID</label>
                    <input type="text" id="driverID" name="driverId" value={delivery.driverId}  className="form-control" />
                </div>
                <button type="submit" className="btn action-button btn-primary">Delete</button>
            </form>
        </div>
    );
}
