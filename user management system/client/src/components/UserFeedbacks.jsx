import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import NavBar from './Navbar.jsx';
// import AdminMainHeader from '../components/Header'
import Header from './MainHeader.jsx';
const UserFeedbacks = () => {
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

    return (
        <div className="container mt-5">
            <Header/>
      <NavBar/>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">

            </div>
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && <p className="text-center my-7 text-2xl text-danger">Error fetching data</p>}
            <div className="table-responsive" >
                <table className="table table-bordered" >
                    <thead className="bg-gray-200" >
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td>{feedback.name}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.message}</td>
                                <td>{feedback.rating}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => window.location.href = `/feedback/${feedback._id}`}>
                                        View Feedback
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserFeedbacks;
