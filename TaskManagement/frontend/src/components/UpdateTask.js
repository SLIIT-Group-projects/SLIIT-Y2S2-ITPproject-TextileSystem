import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateTask() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [taskData, setTaskData] = useState({
    task_id: "",
    task_description: "",
    item_id: "",
    target: "",
    final_count: "",
    deadline: "",
    emp_id: "",
    approval: "",
    status: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:8070/task/${id}`)
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
    axios.put(`http://localhost:8070/task/${id}`, taskData)
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
          <label>Task Description</label>
          <input
            type="text"
            className="form-control"
            name="task_description"
            value={taskData.task_description}
            onChange={handleChange}
          />
        </div>
        {/* Add other input fields for task data */}
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
