import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './MainHeader.jsx';
import Navbar from './Navbar.jsx';
// Define star icon components
const StarIcon = ({ filled, onClick }) => (
  <span
    className={`cursor-pointer ${filled ? 'text-warning' : 'text-secondary'}`}
    style={{ fontSize: '3rem' }}
    onClick={onClick}
  >
    ★
  </span>
);

export default function CreateFeedback() {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [rating, setRating] = useState(0); // New state for rating

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('http://localhost:3000/api/feedback/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating, // Include rating in the request body
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      alert('Feedback created successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      window.location.reload('/create-feedback');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleShowListings = async () => {

  };

  return (
    <div className='container mt-5' style={{ backgroundImage: 'url(../src/components/Untitled design.png)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>

      <Header />
      <Navbar />
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-2xl font-weight-bold text-dark'>Create Feedback</h1>
      </div>

      <form className='mt-5' style={{ backgroundColor: ' #DBECF2' }}>
        <div className='row'>
          <div className='d-flex justify-content-center mb-3'>
            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                filled={value <= rating}
                onClick={() => handleRatingChange(value)}
              />
            ))}
          </div>
          <div className='col' >
            <input
              type='text'
              placeholder='Name'
              className='form-control mb-3'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type='email'
              placeholder='Email'
              className='form-control mb-3'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <br />

            <div style={{ textAlign: 'center' }}>
              <p>How satisfied were you with the resolution of any issues or concerns?</p>

              <input type="radio" id="very-satisfied" name="resolution-satisfaction" value="Very satisfied" />
              <label htmlFor="very-satisfied">Very satisfied</label><br />
              <input type="radio" id="satisfied" name="resolution-satisfaction" value="Satisfied" />
              <label htmlFor="satisfied">Satisfied</label><br />
              <input type="radio" id="neutral" name="resolution-satisfaction" value="Neutral" />
              <label htmlFor="neutral">Neutral</label><br />
              <input type="radio" id="dissatisfied" name="resolution-satisfaction" value="Dissatisfied" />
              <label htmlFor="dissatisfied">Dissatisfied</label><br />
              <input type="radio" id="very-dissatisfied" name="resolution-satisfaction" value="Very dissatisfied" />
              <label htmlFor="very-dissatisfied">Very dissatisfied</label><br />
            </div>


            <textarea
              placeholder='Message'
              className='form-control mb-3'
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={handleSubmit} className='btn btn-primary btn-block mb-3'>
                Create Feedback
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/userFeedbacks`} className="btn btn-primary"> Past reviews </Link>
            </div>



          </div>

        </div>
      </form>
    </div>
  );
}
