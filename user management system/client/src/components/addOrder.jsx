import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./omheader";
import AdminMainHeader from '../components/Header'
const AddOrder = () => {
  const [formData, setFormData] = useState({
    category: "",
    material: "",
    supplier: "",
    quantity: 0,
    color: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [categoriesWithSuppliers, setCategoriesWithSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoriesWithSuppliers();
  }, []);

  const fetchCategoriesWithSuppliers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/orders/suppliers/categories"
      );
      setCategoriesWithSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    console.log("e.target", e.target.value, e.target.name);
    const { name, value } = e.target;
    if (e.target.name === "material") {
      console.log("first", name, value);
      setFormData({ ...formData, [name]: value });
      const selectedCategory = categoriesWithSuppliers.find(
        (category) => category.category === e.target.value
      );
      if (selectedCategory && selectedCategory.usernames) {
        setSuppliers(selectedCategory.usernames);
      } else {
        setSuppliers([]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation checks
    const formErrors = {};
    if (!formData.category || !formData.category.trim()) {
      formErrors.category = "Category is required";
    }
    if (!formData.material || !formData.material.trim()) {
      formErrors.material = "Material is required";
    }
    if (!formData.supplier || !formData.supplier.trim()) {
      formErrors.supplier = "Supplier is required";
    }
    if (!formData.color || !formData.color.trim()) {
      formErrors.color = "Color is required";
    } else if (!isNaN(formData.color.trim())) {
      formErrors.color = "Color should not be a number";
    }
    if (formData.quantity === undefined || formData.quantity < 0) {
      formErrors.quantity = "Quantity should be 0 or greater";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSuccessMessage("");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/orders",
        formData
      );
      console.log(res.data); // Handle response as needed
      setSuccessMessage("Order added successfully!");
      setFormData({
        category: "",
        material: "",
        supplier: "",
        quantity: 0,
        color: "",
      });
      setErrors({});
      setTimeout(() => {
        navigate("/om/");
      }, 2000); // Redirect to home page after 2 seconds
    } catch (err) {
      console.error(err);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <AdminMainHeader/>
      <Header />
      <div className="p-4">
        <h2 className="mb-4">Add New Order</h2>
        <Card className="p-2">
          <Card.Body>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="category" className="mb-3">
                <Form.Label>Material ID</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={errors.category}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="material" className="mb-3">
                <Form.Label>Material</Form.Label>
                <Form.Control
                  as="select"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  isInvalid={errors.material}
                >
                  <option value="">Select Material</option>
                  {categoriesWithSuppliers.map((option, index) => (
                    <option key={index} value={option.category}>
                      {option.category}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.material}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="supplier" className="mb-3">
                <Form.Label>Supplier</Form.Label>
                <Form.Control
                  as="select"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  isInvalid={errors.supplier}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.supplier}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  min='1'
                  value={formData.quantity}
                  onChange={handleChange}
                  isInvalid={errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="color" className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  placeholder="Enter color"
                  value={formData.color}
                  onChange={handleChange}
                  isInvalid={errors.color}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.color}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Order
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddOrder;
