import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import Header from './omheader';

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    material: '',
    supplier: '',
    quantity: 0,
    color: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/api/orders/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [id]);

  const materialOptions = ['Silk', 'Threads','Elastic', 'Cotton']; // Hardcoded material options
  const supplierOptions = ['Supplier A', 'Supplier B', 'Supplier X', 'Supplier Y']; // Hardcoded supplier options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this order?')) {
      try {
        // Perform validation before updating
        const orderToUpdate = { ...formData };
        delete orderToUpdate.createdAt; // Remove createdAt field

        // Check if the order can be updated based on the date created
        const createdDate = new Date(formData.createdAt);
        const currentDate = new Date();
        const hoursDifference = Math.abs(currentDate - createdDate) / (1000 * 60 * 60);

        if (hoursDifference > 48) {
          console.error('Order cannot be updated after 48 hours');
          setErrors({ validation: 'Order cannot be updated after 48 hours' });
          setSuccessMessage('');
          return;
        }

        // Proceed with updating if validation passes
        const res = await axios.put(`http://localhost:8070/api/orders/${id}`, orderToUpdate);
        console.log(res.data); // Handle response as needed
        setSuccessMessage('Order updated successfully');
        setErrors({});
        setTimeout(() => {
          navigate('/om/orders');
        }, 2000); // Redirect to orders page after 2 seconds
      } catch (err) {
        console.error(err);
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="p-4">
      <Header />
      <h2 className="mb-4">Update Order</h2>
      <Card className="p-4">
        <Card.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errors.validation && <Alert variant="danger">{errors.validation}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Material ID</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="material" className="mb-3">
              <Form.Label>Material</Form.Label>
              <Form.Control
                as="select"
                name="material"
                value={formData.material}
                onChange={handleChange}
                disabled
              >
                {materialOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quantity" className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                min="0"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="color" className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                placeholder="Enter color"
                value={formData.color}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Order
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateOrder;