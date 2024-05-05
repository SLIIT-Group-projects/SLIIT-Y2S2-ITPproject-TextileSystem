import React from 'react';
import { Link } from 'react-router-dom';
import header from '../components/Header'
const Navbar = () => {
  return (
    <div>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/approvedFeedbacks'>
          Feedback App
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/create-feedback'>
                Create Feedback
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/userFeedbacks'>
                User Feedbacks
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/approvedFeedbacks'>
                Approved Feedbacks
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
