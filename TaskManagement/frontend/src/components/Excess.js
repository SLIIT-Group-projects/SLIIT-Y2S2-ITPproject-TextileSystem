import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function Excess() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [taskExcessData, setTaskExcessData] = useState([]);

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
        // Update the task status in the state and database
      })
      .catch(err => {
        alert("Error sending task to TaskExcess database: " + err.message);
      });
  };

  const retrieveTaskExcessData = () => {
    axios.get("http://localhost:8070/taskexcess/task-excess/")
      .then((res) => {
        setTaskExcessData(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Task Completion Status Report",
    onafterprint: () => alert("Task Report Successfully Downloaded !")
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
              <th>Status</th>
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
                  {task.added === "Added" ? "Added" :
                    <button onClick={() => sendToTaskExcess(task)} className="btn btn-primary">
                      Add to TaskExcess
                    </button>
                  }
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
            {hideCompleted ? null : completedTasks.map((task) => (
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
      <button onClick={handlePrint}>Download Report</button>

      <div>
        <button onClick={retrieveTaskExcessData}>Retrieve Task Excess Data</button>
        <h2>Task Excess Data</h2>
        <table className="table table-striped table-bordered">
          <thead className="app-color">
            <tr>
              <th>Task ID</th>
              <th>Employee ID</th>
              <th>Target</th>
              <th>Final Count</th>
              <th>Excess</th>
            </tr>
          </thead>
          <tbody>
            {taskExcessData.map((task) => (
              <tr key={task._id}>
                <td>{task.task_id}</td>
                <td>{task.emp_id}</td>
                <td>{task.target}</td>
                <td>{task.final_count}</td>
                <td>{task.excess}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Excess;
