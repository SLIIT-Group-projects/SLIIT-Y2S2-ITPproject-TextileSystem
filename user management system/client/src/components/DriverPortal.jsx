import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeliveryHeader from "./DeliveryHeader";
import AdminMainHeader from "../components/Header";

export default function DriverPortal() {
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/delivery")
      .then((res) => {
        setDeliveries(res.data);
      })
      .catch((err) => {
        alert.apply(err.message);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredDeliveries = deliveries.filter((delivery) =>
      Object.values(delivery).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setDeliveries(filteredDeliveries);
    setNoResults(filteredDeliveries.length === 0);
  };

  const isDeliveryDatePassed = (deliveryDate) => {
    const today = new Date();
    return new Date(deliveryDate) < today;
  };

  const completedDeliveries = deliveries.filter((delivery) =>
    isDeliveryDatePassed(delivery.deliveryDate)
  );
  const pendingDeliveries = deliveries.filter(
    (delivery) => !isDeliveryDatePassed(delivery.deliveryDate)
  );

  return (
    <div>
      <AdminMainHeader />
      <DeliveryHeader />
      <div className="container">
        <h1>Welcome to driver portal</h1>
        <form className="d-flex" role="search">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button onClick={handleSearch} className="btn btn-outline-info" type="submit">
            Search deliveries
          </button>
        </form>
        <br />

        <div className="container">
          {noResults ? (
            <div>
              <p>No delivery found</p>
            </div>
          ) : (
            <div>
              <table className="table table-delivery">
                <thead>
                  <tr className="table-del-header">
                    <th scope="col">Order Id</th>
                    <th scope="col">Driver Id</th>
                    <th scope="col">Lorry Number</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Delivery Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render pending deliveries */}
                  {pendingDeliveries.map((delivery, i) => (
                    <tr className="table-del-row" key={i}>
                      <td>{delivery.orderId}</td>
                      <td>{delivery.driverId}</td>
                      <td>{delivery.vehicleNo}</td>
                      <td>{delivery.deliveryDate}</td>
                      <td>{delivery.deliveryStatus}</td>
                      {!isDeliveryDatePassed(delivery.deliveryDate) && (
                        <td>
                          <Link
                            to={`/driver/delivery/update/${delivery._id}`}
                            className="btn action-button btn-primary"
                          >
                            Complete Delivery
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Render completed deliveries */}
        <div className="container">
          <h2>Completed Deliveries</h2>
          <table className="table table-delivery">
            <thead>
              <tr className="table-del-header">
                <th scope="col">Order Id</th>
                <th scope="col">Driver Id</th>
                <th scope="col">Lorry Number</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {completedDeliveries.map((delivery, i) => (
                <tr className="table-del-row" key={i}>
                  <td>{delivery.orderId}</td>
                  <td>{delivery.driverId}</td>
                  <td>{delivery.vehicleNo}</td>
                  <td>{delivery.deliveryDate}</td>
                  <td>{delivery.deliveryStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
