import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg" className="mb-4">
      {/* First line: Centered title "MATERIAL ORDERS" */}
      <div className='container'>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span style={{ color: '#08A6D5', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '55px', display: 'block' }}>
          MATERIAL ORDERS
        </span>
      </div>
      </div>
      {/* Second line: Buttons for "Add New Orders" and "View All Orders" */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
        <Link to="/om/addorder">
          <Button 
            className="nav-button" 
            style={{
              backgroundColor: '#08A6D5',
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: '14px', // Smaller font size
              width: 'fit-content', // Adjusted width
              height: 'fit-content',
              borderRadius: '10px'
            }}
          >
            Add New Order
          </Button>
        </Link>
        <Link to="/om/orders" style={{ marginLeft: '10px' }}>
          <Button 
            className="nav-button" 
            style={{
              backgroundColor: '#08A6D5',
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: '14px', // Smaller font size
              width: 'fit-content', // Adjusted width
              height: 'fit-content',
              borderRadius: '10px'
            }}
          >
            View All Orders
          </Button>
        </Link>
      </div>
    </Navbar>
  );
};

export default Header;
