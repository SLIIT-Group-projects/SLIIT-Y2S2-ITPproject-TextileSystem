import React, { useState, useEffect } from "react";
import axios from "axios";

const ExcessCompletedTasks = () => {
  const [excessCompletedTasks, setExcessCompletedTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8070/task/excess-completed")
      .then((res) => {
        setExcessCompletedTasks(res.data);
        setError(null); // Reset error if successful
      })
      .catch((err) => {
        setError("Error fetching excess completed tasks: " + err.message);
        console.error("Error fetching excess completed tasks:", err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Excess Completed Tasks</h1>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Excess</th>
          </tr>
        </thead>
        <tbody>
          {excessCompletedTasks.map((task) => (
            <tr key={task.emp_id}>
              <td>{task.emp_id}</td>
              <td>{task.excess}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcessCompletedTasks;
