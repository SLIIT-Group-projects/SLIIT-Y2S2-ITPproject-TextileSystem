import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import NavBar from './Navbar.jsx';
import AdminMainHeader from '../components/Header'
const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [overallFeedback, setOverallFeedback] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/feedback/get');
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setFeedbacks(data);
      calculateOverallFeedback(data); // Calculate overall feedback after fetching
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setSelectedRatings((prevRatings) => {
      if (prevRatings.includes(rating)) {
        return prevRatings.filter((item) => item !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };

  const generateReport = async () => {
    try {
      const filteredFeedbacks = feedbacks.filter((feedback) =>
        selectedRatings.includes(feedback.rating.toString())
      );

      const pdfDoc = await PDFDocument.create();
      let currentPage = pdfDoc.addPage();
      let y = currentPage.getHeight() - 50;
      const lineHeight = 15;

      filteredFeedbacks.forEach((feedback) => {
        const contentLines = [
          `Name: ${feedback.name}`,
          `Email: ${feedback.email}`,
          `Message: ${feedback.message}`,
          `Rating: ${feedback.rating}`,
          `Status: ${feedback.status}`,
          '-------------------------------------------',
        ];

        const contentHeight = contentLines.length * lineHeight;

        if (y < contentHeight) {
          currentPage = pdfDoc.addPage();
          y = currentPage.getHeight() - 50;
        }

        contentLines.forEach((line) => {
          currentPage.drawText(line, { x: 50, y: y, size: 12, color: rgb(0, 0, 0) });
          y -= lineHeight;
        });

        y -= 10;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'feedback_report.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const calculateOverallFeedback = (feedbackData) => {
    const totalFeedbacks = feedbackData.length;
    const totalRating = feedbackData.reduce((acc, feedback) => acc + feedback.rating, 0);
    const averageRating = totalFeedbacks > 0 ? totalRating / totalFeedbacks : 0;
    setOverallFeedback(averageRating.toFixed(1)); // Set overall feedback with one decimal place
  };

  return (
    <div> <AdminMainHeader/>
    <div className="container mt-5">
      <NavBar/>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex">
          <label className="mr-2">Filter by Ratings:</label>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="mr-2">
              <input
                type="checkbox"
                value={rating}
                onChange={handleRatingChange}
                checked={selectedRatings.includes(rating.toString())}
                className="mr-1"
              />
              {rating} Star
            </label>
          ))}
        </div>
        <button
          onClick={generateReport}
          className="btn btn-primary"
        >
          Generate Report
        </button>
      </div>
      <div className="mb-4">
        <div className="font-weight-bold text-center"> 
        Overall Feedback: {overallFeedback !== null ? overallFeedback : 'Calculating...'}
        </div>
      </div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl text-danger">Error fetching data</p>}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
                <td>{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default FeedbackDashboard;
