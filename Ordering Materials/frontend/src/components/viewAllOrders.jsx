import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, InputGroup, FormControl, Container, Row, Col, Alert } from 'react-bootstrap';

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
        setFilteredOrders(res.data); // Initialize filteredOrders with all orders
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterOrders(e.target.value);
  };

  // Filter orders based on search term
  const filterOrders = (term) => {
    const filtered = orders.filter(
      (order) =>
        order.material.toLowerCase().includes(term.toLowerCase()) ||
        order.category.toLowerCase().includes(term.toLowerCase()) ||
        order.supplier.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  // Handle delete order
  const handleDelete = async (id, createdAt, status) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const hoursDifference = Math.abs(currentDate - createdDate) / (1000 * 60 * 60);

    if (hoursDifference > 48) {
      setDeleteErrorMessage('Order cannot be deleted after 48 hours');
      setTimeout(() => {
        setDeleteErrorMessage('');
      }, 2000);

      // Check if status is 'placed' and update to 'pending' if older than 48 hours
      if (status === 'placed') {
        const updatedOrders = orders.map((order) =>
          order._id === id ? { ...order, status: 'pending' } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders); // Update filteredOrders state

        // Update order status in the database
        try {
          await axios.put(`http://localhost:5000/api/orders/${id}`, { status: 'pending' });
        } catch (err) {
          console.error(err);
        }
      }

      return;
    }

    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        setDeleteSuccessMessage('Order deleted successfully');

        // Update orders list after deletion
        const updatedOrders = orders.filter((order) => order._id !== id);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);

        // Clear success message after 2 seconds
        setTimeout(() => {
          setDeleteSuccessMessage('');
        }, 2000);
      } catch (err) {
        console.error(err);
        setDeleteErrorMessage('Error deleting order');
      }
    }
  };

  const getOrderStatus = (createdDate) => {
    const currentDate = new Date();
    const hoursDifference = Math.abs(currentDate - new Date(createdDate)) / (1000 * 60 * 60);

    return hoursDifference > 48 ? 'Pending' : 'Placed';
  };

  return (
    <Container fluid style={{ marginBottom: '250px' }}>
      <Row className="mt-4 mb-3">
        <Col>
          <h2>All Orders</h2>
        </Col>
        <Col xs={4}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by material, category, or supplier"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
      </Row>
      {deleteSuccessMessage && <Alert variant="success">{deleteSuccessMessage}</Alert>}
      {deleteErrorMessage && <Alert variant="danger">{deleteErrorMessage}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Material</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Color</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.category}</td>
              <td>{order.material}</td>
              <td>{order.supplier}</td>
              <td>{order.quantity}</td>
              <td>{order.color}</td>
              <td>{getOrderStatus(order.createdAt)}</td>
              <td>
                <Link to={`/update/${order._id}`} className="btn btn-primary me-2">
                  Update
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(order._id, order.createdAt, getOrderStatus(order.createdAt))}
                  disabled={getOrderStatus(order.createdAt) === 'Pending'}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewAllOrders;