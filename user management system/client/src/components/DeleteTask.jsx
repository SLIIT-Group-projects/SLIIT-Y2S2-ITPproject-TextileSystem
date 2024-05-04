import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteTask() {
  const { id } = useParams();

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/task/${id}`)
      .then(() => {
        alert("Task deleted successfully");
        // Redirect to DisplayTasks or any other route after delete
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Delete Task</h1>
      <p>Are you sure you want to delete this task?</p>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </div>
  );
}
