import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './Navbar.jsx';
const StarIcon = ({ filled, onClick }) => (
  <span
    className={`cursor-pointer ${filled ? 'text-warning' : 'text-secondary'}`}
    style={{ fontSize: '3rem' }}
    onClick={onClick}
  >
    ★
  </span>
);

export default function Feedback() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0, // New state for rating
  });
  const params = useParams();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/feedback/get/${params.Id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setFormData({
          name: data.name,
          email: data.email,
          message: data.message,
          rating: data.rating, // Set the initial rating from fetched data
        });
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [params.Id]);

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value }); // Update rating in form data
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/feedback/update/${params.Id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setListing(data);
      navigate('userFeedbacks');
    } catch (error) {
      setError(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/feedback/delete/${params.Id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setListing(null);
      navigate('/userFeedbacks');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl"></p>}
      {listing && (
        
        <div className="container mt-10">
      <NavBar/>
          <h1 className="text-2xl font-bold text-dark">Edit Feedback</h1>
          <div className="row mt-4" style={{backgroundColor :' #DBECF2'}}>
            <div className="col"><br></br>
              <input
                type="text"
                placeholder="Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <div className="d-flex justify-content-center mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <StarIcon
                    key={value}
                    filled={value <= formData.rating}
                    onClick={() => handleRatingChange(value)}
                  />
                ))}
              </div>

              <p>How satisfied were you with the resolution of any issues or concerns?</p>


            <input type="radio" id="very-satisfied" name="resolution-satisfaction" value="Very satisfied"/>
            <label for="very-satisfied">Very satisfied</label><br/>
            <input type="radio" id="satisfied" name="resolution-satisfaction" value="Satisfied"/>
            <label for="satisfied">Satisfied</label><br/>
            <input type="radio" id="neutral" name="resolution-satisfaction" value="Neutral"/>
            <label for="neutral">Neutral</label><br/>
            <input type="radio" id="dissatisfied" name="resolution-satisfaction" value="Dissatisfied"/>
            <label for="dissatisfied">Dissatisfied</label><br/>
            <input type="radio" id="very-dissatisfied" name="resolution-satisfaction" value="Very dissatisfied"/>
            <label for="very-dissatisfied">Very dissatisfied</label><br/>

            <br></br>

              <textarea
                placeholder="Message"
                className="form-control mb-3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button onClick={handleEdit} className="btn btn-primary mb-3">
                Edit Feedback
              </button>
              <br></br>

              <button onClick={handleDelete} className="btn btn-danger">
                Delete Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
