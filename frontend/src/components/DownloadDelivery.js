import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function DownloadDelivery() {
    const [deliveries, setDeliveries] = useState([]);
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLorry, setSelectedLorry] = useState("");
    const [noResults, setNoResults] = useState(false);
    const ComponentsRef = useRef();

    useEffect(() => {
        axios.get("http://localhost:8070/order")
            .then((res) => {
                setOrders(res.data);
            }).catch((err) => {
                alert(err.message);
            });
    
        axios.get("http://localhost:8070/delivery")
            .then((res) => {
                setDeliveries(res.data);
            }).catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredDeliveries = deliveries.filter((delivery) => {
            // Check if delivery matches the selected date
            const isDateMatch = !selectedDate || delivery.deliveryDate === selectedDate;

            // Check if delivery matches the selected lorry number
            const isLorryMatch = !selectedLorry || delivery.vehicleNo === selectedLorry;

            // Check if any field contains the search query
            const isSearchMatch = Object.values(delivery).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
            return isDateMatch && isLorryMatch && isSearchMatch;
        });

        setDeliveries(filteredDeliveries);
        setNoResults(filteredDeliveries.length === 0);
    }

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle: "Delivery Schedule",
        onafterprint: () => alert("Delivery report successfully downloaded")
    });

    return (
        <div className="container">
            <form className="d-flex" role="search">
                <input onChange={(e) => setSearchQuery(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <input onChange={(e) => setSelectedDate(e.target.value)} className="form-control me-2" type="date" placeholder="Select Date" aria-label="Select Date"></input>
                <input onChange={(e) => setSelectedLorry(e.target.value)} className="form-control me-2" type="text" placeholder="Enter Lorry Number" aria-label="Enter Lorry Number"></input>
                <button onClick={handleSearch} className="btn btn-outline-info" type="submit">Search deliveries</button>
            </form>
            <div className="container" ref={ComponentsRef}>
                <h1>Delivery Schedule</h1>
                {noResults ? (
                    <div>
                        <p>No delivery found</p>
                    </div>
                ) : (
                    <table className="table table-hover table-delivery">
                        <thead className="table-delivery">
                            <tr className="table-del-header">
                                <th scope="col">Order Id</th>
                                <th scope="col">Driver Id</th>
                                <th scope="col">Lorry Number</th>
                                <th scope="col">Delivery Date</th>
                                <th scope="col">Delivery Address</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries && deliveries.map((delivery, i) => (
                                <tr className="table-del-row" key={i}>
                                    <td>{delivery.orderId}</td>
                                    <td>{delivery.driverId}</td>
                                    <td>{delivery.vehicleNo}</td>
                                    <td>{delivery.deliveryDate}</td>
                                    <td>{orders.find(order => order._id === delivery.orderId)?.shippingAddress}</td>
                                    <td>
                                        {/* Render the item name and quantity for each order */}
                                        <ul>
                                            {orders.find(order => order._id === delivery.orderId)?.orderItems.map((item, index) => (
                                                <li key={index}>
                                                    {item.product_name}: {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button className="btn action-button btn-primary" onClick={handlePrint}>Download Report</button>
        </div>
    )
}
