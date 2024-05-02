import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function Excess() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/task/")
      .then((res) => {
        setTasks(res.data);
        const filtered = res.data.filter(task => task.status === "Complete" && new Date(task.deadline) < new Date() && task.final_count > task.target);
        setFilteredTasks(filtered);
        const completed = res.data.filter(task => task.status === "Complete" && new Date(task.deadline) < new Date() && task.final_count < task.target);
        setCompletedTasks(completed);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const calculateExcessForAll = () => {
    const updatedTasks = filteredTasks.map((task) => {
      return {
        ...task,
        excess: task.final_count - task.target
      };
    });
    setFilteredTasks(updatedTasks);
  };

  const sendToTaskExcess = (task) => {
    axios.post("http://localhost:8070/taskexcess/task-excess/", { tasks: [task] })
      .then(res => {
        alert("Task sent to TaskExcess database successfully!");
      })
      .catch(err => {
        alert("Error sending task to TaskExcess database: " + err.message);
      });
  };

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
  });

  return (
    <div className="container mt-4">
      <div ref={ComponentsRef}>
        <h1>Target Exceeded</h1>

        <table className="table table-striped table-bordered">
          <thead className="app-color">
            <tr>
              <th>Task ID</th>
              <th>Employee ID</th>
              <th>Target</th>
              <th>Final Count</th>
              <th>Excess</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_id}</td>
                <td>{task.emp_id}</td>
                <td>{task.target}</td>
                <td>{task.final_count}</td>
                <td>{task.excess !== undefined ? task.excess : "-"}</td>
                <td>
                  <button onClick={() => sendToTaskExcess(task)} className="btn btn-primary">
                    Add to TaskExcess
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={calculateExcessForAll}>Calculate Excess</button>

        <h2>Target Not Completed</h2>

        <table className="table table-striped table-bordered">
          <thead className="app-color">
            <tr>
              <th>Task ID</th>
              <th>Employee ID</th>
              <th>Target</th>
              <th>Final Count</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task) => (
              <tr key={task._id} style={{ color: "red" }}>
                <td>{task.task_id}</td>
                <td>{task.emp_id}</td>
                <td>{task.target}</td>
                <td>{task.final_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className="btn btn-primary print-button">Print Report</button>
    </div>
  );
}

export default Excess;
