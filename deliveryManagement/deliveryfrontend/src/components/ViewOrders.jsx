import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateDeliveryLog from "./CreateDeliveryLog";
import DeliveryHeader from "./DeliveryHeader";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryLogs, setDeliveryLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/order")
      .then((res) => {
        // Sort orders by whether delivery logs exist
        res.data.sort((a, b) => {
          // Sort by length of deliveries array (ascending)
          return a.deliveries.length - b.deliveries.length;
        });
        setOrders(res.data);
      })
      .catch((err) => {
        alert.apply(err.message);
      });
  }, []);

  const handleViewDeliveryLogs = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8070/delivery/get/${orderId}`);
      setDeliveryLogs([response.data.delivery]); // Wrap the response in an array to maintain consistency with the deliveryLogs state
      setSelectedOrder(orderId);
    } catch (error) {
      console.error("Error fetching delivery logs:", error);
    }
  };

  return (
    <div className="container">
      <DeliveryHeader/>
      <h1>Orders</h1>
      <div className="container">
        <table border={0} className="table table-delivery rounded-5">
          <thead className="table-del-header">
            <tr>
              <th scope="col">Customer Code</th>
              <th scope="col">shippingAddress</th>
              <th scope="col">Item Details</th>
              <th scope="col">Total Price</th>
              <th scope="col">Delivery Log status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((Order, i) => (
              <tr className="table-del-row" key={i}>
                <td>{Order.user}</td>
                <td>{Order.shippingAddress}</td>
                <div>
                {Order.orderItems.map((item, index) => (
                    <div key={index}>
                    <td>Item Name: {item.product_name} <br/>
                    Quantity: {item.quantity}</td>
                    </div>
                    
                  ))}
                </div>
                <td>{Order.totalPrice}</td>
                <td>
                  {Order.deliveries.length > 0 ? (
                    <p>Delivery already created</p>
                    
                  ) : (
            
                    <CreateDeliveryLog orderId={Order._id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
