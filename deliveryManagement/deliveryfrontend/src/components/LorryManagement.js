import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LorryManagement = () => {
    const [lorries, setLorries] = useState([]);
    const [formData, setFormData] = useState({
        lorryNumber: '',
        capacity: 0,
        driverName: ''
    });

    useEffect(() => {
        fetchLorries();
    }, []);

    const fetchLorries = async () => {
        try {
            const response = await axios.get('http://localhost:8070/lorries');
            setLorries(response.data);
        } catch (error) {
            console.error('Error fetching lorries:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8070/lorries/add', formData);
            setFormData({
                lorryNumber: '',
                capacity: 0,
                driverName: ''
            });
            fetchLorries();
        } catch (error) {
            console.error('Error adding lorry:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/lorries/delete/${id}`);
            fetchLorries();
        } catch (error) {
            console.error('Error deleting lorry:', error);
        }
    };

    return (
        <div>
            <h2>Lorry Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="lorryNumber"
                    value={formData.lorryNumber}
                    onChange={handleChange}
                    placeholder="Lorry Number"
                    required
                />
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Capacity"
                    required
                />
                {/* Add other input fields for additional lorry details */}
                <button type="submit">Add Lorry</button>
            </form>
            <ul>
                {lorries.map((lorry) => (
                    <li key={lorry._id}>
                        {lorry.lorryNumber} - {lorry.capacity}
                        <button onClick={() => handleDelete(lorry._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LorryManagement;
