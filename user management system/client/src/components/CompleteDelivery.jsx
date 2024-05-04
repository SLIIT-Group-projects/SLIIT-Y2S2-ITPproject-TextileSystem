import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeliveryHeader from "./DeliveryHeader";
export default function DriverPortal() {
    const { id } = useParams();
    const [pin, setPin] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [delivery, setDelivery] = useState({
        orderId: "",
        deliveryDate: "",
        vehicleNo: "",
        driverId: "",
        deliveryStatus: "",
        pin: "" 
    });

    const [order, setOrder] = useState({
        customerCode: "",
        orderId: "",
        deliveryAddress: "",
        quantity: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/delivery/get/${id}`)
            .then((res) => {
                setDelivery(res.data.delivery);
                // Fetch order details based on orderId
                axios.get(`http://localhost:3000/order/get/${res.data.delivery.orderId}`)
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
        setPin(e.target.value); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (pin !== delivery.pin) {
            setErrorMessage("Invalid PIN. Please enter the correct PIN.");
            return;
        }
        const updatedDelivery = { ...delivery, deliveryStatus: delivery.deliveryStatus };

        // PIN validation successful, proceed with updating delivery status
        try {
            const response = await axios.put(`http://localhost:3000/delivery/update/${id}`, updatedDelivery);
            setSuccessMessage("Delivery details updated successfully.");
           
            setDelivery(updatedDelivery);
        } catch (err) {
            console.error("Error updating delivery:", err);
        }
    
    };

    return (
        <div className="container">
            <DeliveryHeader/>
            <h1>Complete Delivery</h1>
            <h2>Delivery Details</h2>
                
                <table className="table table-hover table-delivery">
                        <tbody className="table-delivery">
                            <tr className="table-del-row">
                                <td>Delivery Date</td>
                                <td>{delivery.deliveryDate}</td>
                            </tr>
                            <tr className="table-del-row">
                                <td>Order ID:</td>
                                <td>{delivery.orderId}</td>
                            </tr>
                            <tr className="table-del-row">
                                <td>Vehicle ID:</td>
                                <td>{delivery.vehicleNo}</td>
                            </tr>
                            <tr className="table-del-row"> 
                                <td>Driver id</td>
                                <td>{delivery.driverId}</td>
                            </tr>
                        </tbody>
                    </table>
    

            {/* PIN input form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="deliveryStatus" className="form-label">Delivery Status</label>
                    <select id="deliveryStatus" name="deliveryStatus" value={delivery.deliveryStatus} onChange={handleChange} className="form-control">
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <label htmlFor="pin" className="form-label">Enter PIN:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pin"
                        value={pin}
                        onChange={handleChange}
                        required
                    />
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Update Delivery Status</button>
            </form>

            <h2>Order Details</h2>
            <table class="table table-hover table-delivery">
                    <tbody>
                        <tr className="table-del-header">
                            <td>Customer Code:</td>
                            <td>{order.user}</td>
                        </tr>
                        <tr className="table-del-header">
                            <td>Delivery Address:</td>
                            <td>{order.shippingAddress}</td>
                        </tr>
                        <tr className="table-del-header">
                            <td>Total Price:</td>
                            <td>{order.totalPrice}</td>
                        </tr>
                        <tr className="table-del-header">
                            <td>Payment Method:</td>
                            <td>{order.paymentMethod}</td>
                        </tr>
                    </tbody>
                </table>

                <h2>Ordered Items</h2>
                    <table class="table table-hover table-delivery">
                        <thead>
                            <tr className="table-del-header">
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems && order.orderItems.map((item, index) => (
                                <tr className="table-del-header" key={index}>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

        </div>
    );
}
