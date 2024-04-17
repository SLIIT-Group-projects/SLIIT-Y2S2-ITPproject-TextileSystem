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
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="deliveryStatus" className="form-label">Delivery Status</label>
                    <select id="deliveryStatus" name="deliveryStatus" value={delivery.deliveryStatus} onChange={handleChange} className="form-control">
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
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
