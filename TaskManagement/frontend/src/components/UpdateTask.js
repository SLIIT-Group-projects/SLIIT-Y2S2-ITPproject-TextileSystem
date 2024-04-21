import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateTask() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [taskData, setTaskData] = useState({
    task_id: "",
    color: "",
    item_name: "",
    target: "",
    final_count: "",
    deadline: "",
    emp_id: "",
    approval: "",
    status: ""
  });

  useEffect(() => {
    axios.put(`http://localhost:8070/task/update/${id}`)
      .then((res) => {
        setTask(res.data);
        setTaskData(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8070/task/update/${id}`, taskData)
      .then((res) => {
        alert("Task updated successfully");
        // Redirect to DisplayTasks or any other route after update
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task ID</label>
          <input
            type="text"
            className="form-control"
            name="task_id"
            value={taskData.task_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            name="item_name"
            value={taskData.item_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            className="form-control"
            name="color"
            value={taskData.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Target</label>
          <input
            type="number"
            className="form-control"
            name="target"
            value={taskData.target}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Final Count</label>
          <input
            type="number"
            className="form-control"
            name="target"
            value={taskData.final_count}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label>Deadline</label>
            <input type="date" 
            className="form-control" 
            id="deadline" 
            value={taskData.deadline}
            onChange={handleChange}
        />    
            </div>
            <div className="form-group">
              <label>Employee ID</label>
              <input type="text" 
              className="form-control" 
              id="emp_id" 
              value={taskData.emp_id}
              onChange={handleChange}
              />
            </div>
            <div className="form-group">
                <label>Approval</label>
                 <select 
                    className="form-control" id="approval"  
                    value={taskData.approval}
                    onChange={handleChange}
                     >
                <option value="Not Approved">Not Approved</option>
                <option value="Approved">Approved</option>
                </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select 
                    className="form-control" id="status" 
                    value={taskData.status}
                    onChange={handleChange}
                        >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                    </select>
                </div>
        
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
