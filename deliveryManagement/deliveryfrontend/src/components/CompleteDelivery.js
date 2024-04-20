import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        pin: "" // Add pin field to store the emailed PIN
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
        setPin(e.target.value); // Update pin state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Compare entered PIN with the stored PIN
        if (pin !== delivery.pin) {
            setErrorMessage("Invalid PIN. Please enter the correct PIN.");
            return;
        }

        // PIN validation successful, proceed with updating delivery status
        try {
            const response = await axios.put(`http://localhost:8070/delivery/update/${id}`, delivery);
            setSuccessMessage("Delivery details updated successfully.");
        } catch (err) {
            console.error("Error updating delivery:", err);
        }
    };

    return (
        <div className="container">
            <h2>Delivery Details</h2>
                
                <table className="table">
                        <tbody>
                            <tr>
                                <td>Delivery Date</td>
                                <td>{delivery.deliveryDate}</td>
                            </tr>
                            <tr>
                                <td>Order ID:</td>
                                <td>{delivery.orderId}</td>
                            </tr>
                            <tr>
                                <td>Vehicle ID:</td>
                                <td>{delivery.vehicleNo}</td>
                            </tr>
                            <tr>
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
            <table className="table">
                    <tbody>
                        <tr>
                            <td>Customer Code:</td>
                            <td>{order.user}</td>
                        </tr>
                        <tr>
                            <td>Delivery Address:</td>
                            <td>{order.shippingAddress}</td>
                        </tr>
                        <tr>
                            <td>Total Price:</td>
                            <td>{order.totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Payment Method:</td>
                            <td>{order.paymentMethod}</td>
                        </tr>
                    </tbody>
                </table>

                <h2>Ordered Items</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems && order.orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

        </div>
    );
}
