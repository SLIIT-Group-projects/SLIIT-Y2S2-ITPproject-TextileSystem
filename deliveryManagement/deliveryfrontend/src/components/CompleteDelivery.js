import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function DriverPortal() {
    const { id } = useParams();
   

    const [delivery, setDelivery] = useState({
        orderId: "",
        deliveryDate: "",
        vehicleNo: "",
        driverId: "",
        deliveryStatus: ""
    });

    const [order, setOrder] = useState({
        customerCode: "",
        orderId: "",
        deliveryAddress: "",
        quantity: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8070/delivery/get/${id}`)
            .then((res) => {
                setDelivery(res.data.delivery);
                // Fetch order details based on orderId
                axios.get(`http://localhost:8070/order/get/${res.data.delivery.orderId}`)
                    .then((res) => {
                        setOrder(res.data.order);
                    })
                    .catch((err) => {
                        console.error("Error fetching order:", err);
                    });
            })
            .catch((err) => {
                console.error("Error fetching delivery:", err);
            });
    }, [id]);

    const handleChange = (e) => {
        setDelivery({ ...delivery, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/delivery/update/${id}`, delivery)
            .then(() => {
                alert("Delivery details updated");
            })
            .catch((err) => {
                console.error("Error updating delivery:", err);
            });
    };

    return (
        <div className="container">
            <h1>Welcome to Driver Portal</h1>
            <h2>Order Details</h2>
            <p>Customer Code: {order.customerCode}</p>
            <p>Order ID: {order.orderId}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <p>Quantity: {order.quantity}</p>

            <h2>Delivery Details</h2>
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
                <div className="mb-3">
                    <label htmlFor="driverID" className="form-label">Delivery status</label>
                    <input type="text" id="driverID" name="driverId" value={delivery.deliveryStatus} readOnly className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
