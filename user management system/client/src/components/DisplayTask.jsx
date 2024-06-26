import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminMainHeader from '../components/Header'
export default function DisplayTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/task/")
      .then((res) => {
        setTasks(res.data);
        setFilteredTasks(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      Object.values(task).some(val =>
        typeof val === "string" && val.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReset = () => {
    setSearchQuery(""); 
    setFilteredTasks(tasks);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/task/delete/${id}`)
      .then(() => {
        alert("Task deleted successfully");
        setTasks(tasks.filter(task => task._id !== id));
        setFilteredTasks(filteredTasks.filter(task => task._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getApprovalColor = (approval) => {
    return approval === "Approved" ? "text-success" : "text-danger";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-warning";
      case "In Progress":
        return "text-primary";
      case "Complete":
        return "text-success";
      default:
        return "";
    }
  };

  return (
    <div className="container mt-4">
      <AdminMainHeader/>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span style={{ color: '#08A6D5', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '55px', display: 'block' }}>
          TASK DASHBOARD
        </span>
      </div> 
      <h1>List of Tasks</h1>
      {/* Search bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="app-color">
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
            <th>Update</th> 
            <th>Delete</th> 
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.task_id}</td>
              <td>{task.item_name}</td>
              <td>{task.color}</td>
              <td>{task.target}</td>
              <td>{task.final_count}</td>
              <td>{task.deadline}</td>
              <td>{task.emp_id}</td>
              <td className={getApprovalColor(task.approval)}>{task.approval}</td>
              <td className={getStatusColor(task.status)}>{task.status}</td>
              <td>
                <Link to={`/task/update/${task._id}`} className="btn btn-primary">
                  Update
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(task._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/task/add-task" className="btn btn-success ml-2">
        Add Task
      </Link>
      <Link to="/task/task-excess" className="btn btn-primary">
        Excess Completed Tasks
      </Link>
    </div>
  );
}
