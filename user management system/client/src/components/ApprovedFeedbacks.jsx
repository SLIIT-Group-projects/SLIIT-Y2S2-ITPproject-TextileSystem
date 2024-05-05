import React, { useEffect, useState } from 'react';
import NavBar from './Navbar.jsx';
// import AdminMainHeader from '../components/Header'
import Header from './MainHeader.jsx';
const StarIcon = ({ filled, onClick }) => (
  <span
    className={`cursor-pointer ${filled ? 'text-warning' : 'text-secondary'
      }`}
    style={{ fontSize: '3rem' }} // Adjust the font size here, e.g., 3rem for larger icons
    onClick={onClick}
  >
    ★
  </span>
);

const ApprovedFeedbacks = () => {
  const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [overallFeedback, setOverallFeedback] = useState(null); // Add overallFeedback state

  useEffect(() => {
    const fetchApprovedFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/api/feedback/get');
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setApprovedFeedbacks(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchApprovedFeedbacks();
  }, []);

  useEffect(() => {
    const filtered = approvedFeedbacks.filter((feedback) =>
      feedback.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
    calculateOverallFeedback(filtered); // Calculate overall feedback when filtered feedbacks change
  }, [approvedFeedbacks, searchInput]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const calculateOverallFeedback = (feedbackData) => {
    const totalFeedbacks = feedbackData.length;
    const totalRating = feedbackData.reduce((acc, feedback) => acc + feedback.rating, 0);
    const averageRating = totalFeedbacks > 0 ? totalRating / totalFeedbacks : 0;
    setOverallFeedback(averageRating.toFixed(1)); // Set overall feedback with one decimal place
  };

  return (
    <main>
      <div className="container my-5">
      <Header/>
        
        <NavBar/>
        <div className="my-3">
          <h2 className="text-2xl font-bold text-dark">Give your feedback fo us!!</h2><br></br>
          <input
            type="text"
            placeholder="Search by name"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="mt-2 form-control"
          />
        </div><br></br>
        <div className="mb-4">
  <div className="font-weight-bold text-center" style={{ color: '#00215E', fontSize: '1.5rem' }}>
    Overall Feedback: {overallFeedback !== null ? overallFeedback : 'Calculating...'}
  </div>
  <br />
</div>




        <div>
  <button className="btn btn-primary">
    <a href="/create-feedback" className="text-white text-decoration-none">
      Add Feedback
    </a>
  </button>
</div>
<br></br>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data</p>
        ) : filteredFeedbacks.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="col">
              <div className="bg-primary-light p-4 rounded shadow" style={{ backgroundColor: '#DBECF2' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="text-lg font-weight-bold text-dark">{feedback.name}</h3>
                  <span className="text-sm text-muted">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-dark">{feedback.message}</p>
                <div className="d-flex justify-content-start">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <StarIcon
                      key={value}
                      filled={value <= feedback.rating}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            ))}
          </div>
        ) : (
          <p>No feedbacks found</p>
        )}
      </div>
    </main>
  );
};

export default ApprovedFeedbacks;
