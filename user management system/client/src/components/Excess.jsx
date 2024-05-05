import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import AdminMainHeader from '../components/Header'
function Excess() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [taskExcessData, setTaskExcessData] = useState([]);
  const [showTaskExcessTable, setShowTaskExcessTable] = useState(false); // State to manage table visibility


  useEffect(() => {
    axios.get("http://localhost:3000/task/")
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
    axios.post("http://localhost:3000/taskexcess/task-excess/", { tasks: [task] })
      .then(res => {
        alert("Task sent to TaskExcess database successfully!");
        // Update the task status in the state and database
      })
      .catch(err => {
        alert("Error sending task to TaskExcess database: " + err.message);
      });
  };

  const handleToggleTaskExcessTable = () => {
    if (showTaskExcessTable) {
      setShowTaskExcessTable(false); // Hide the table if it's currently visible
    } else {
      // Fetch data from tasksexcess table before showing the table
      axios.get("http://localhost:3000/taskexcess/task-excess/")
        .then((res) => {
          setTaskExcessData(res.data);
          setShowTaskExcessTable(true); // Show the table after data is fetched
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  


  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Task Completion Status Report",
    onafterprint: () => alert("Task Report Successfully Downloaded !")
  });


  return (
    <div> <AdminMainHeader/>
    <div className="container mt-4">
      <div  ref={ComponentsRef}>
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

        <button onClick={calculateExcessForAll}>Calculate Excess</button>
      </div>
      <br/>
      <button onClick={handlePrint}>Download Report</button>
      <br/><br/>
      <div>
      <button onClick={handleToggleTaskExcessTable}>Show Task Excess Table</button>
        
        {showTaskExcessTable && (
          <>
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
          </>
        )}
        </div>
        
    </div>
  </div>
  );
}

export default Excess;