import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './omheader';
import AdminMainHeader from '../components/Header'
const Home = () => {
  return (
    <div> <AdminMainHeader/>
    <div className="container  mt-4" style={{marginBottom: "250px"}}>
      <Header />
      <h2>Welcome to Ordering Materials</h2>
      <p>
        This system allows you to manage orders efficiently. You can add new orders, view all existing orders,
        update orders, and delete orders as needed.
      </p>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <Card>
            <Card.Body>
              <Card.Title>Add New Orders</Card.Title>
              <Card.Text>
                Easily add new orders with details such as category, material, supplier, quantity, and color.
              </Card.Text>
              <Link to="/om/addorder" className="btn btn-primary">Add Order</Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card>
            <Card.Body>
              <Card.Title>View All Orders</Card.Title>
              <Card.Text>
                See a list of all existing orders with search functionality to find orders quickly.
              </Card.Text>
              <Link to="/om/orders" className="btn btn-primary">View Orders</Link>
            </Card.Body>
          </Card>
        </div>
      </div>
      <p>
        Get started by navigating to the <strong>Add Order</strong> page to add a new order or explore existing orders
        by visiting the <strong>View All Orders</strong> page.
      </p>
    </div>
  </div>
  );
};

export default Home;