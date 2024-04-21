import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DisplayTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8070/task/")
      .then((res) => {
        setTasks(res.data);
        setFilteredTasks(res.data); // Initialize filteredTasks with all tasks
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    // Filter tasks based on searchQuery
    const filtered = tasks.filter(task =>
      Object.values(task).some(val =>
        typeof val === "string" && val.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleSearch = () => {
    const filtered = tasks.filter(task => task.status.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredTasks(filtered);
  };

  const handleReset = () => {
    setSearchQuery(""); // Clear search query
    setFilteredTasks(tasks); // Display all tasks
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/task/delete/${id}`)
      .then(() => {
        alert("Task deleted successfully");
        // Update tasks state after deletion
        setTasks(tasks.filter(task => task._id !== id));
        setFilteredTasks(filteredTasks.filter(task => task._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container mt-4">
      <h1>List of Tasks</h1>

      {/* Search bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table displaying tasks */}
      <table className="table table-striped table-bordered">
        {/* Table headers */}
        <thead className="thead-dark">
          <tr>
            <th>Task ID</th>
            <th>Item Name</th>
            <th>Color</th> 
            <th>Target</th>
            <th>Final Count</th>
            <th>Deadline</th>
            <th>Employee ID</th>
            <th>Approval</th>
            <th>Status</th>
            <th>Update</th> {/* New column header */}
            <th>Delete</th> {/* New column header */}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {/* Display tasks */}
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.task_id}</td>
              <td>{task.item_name}</td>
              <td>{task.color}</td>
              <td>{task.target}</td>
              <td>{task.final_count}</td>
              <td>{task.deadline}</td>
              <td>{task.emp_id}</td>
              <td>{task.approval}</td>
              <td>{task.status}</td>
              <td> {/* Update button */}
                <Link to={'/update/${task._id}'} className="btn btn-primary">
                  Update
                </Link>
              </td>
              <td> {/* Delete button */}
                <button onClick={() => handleDelete(task._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
