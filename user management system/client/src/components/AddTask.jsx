import React, { useState } from "react";
import axios from "axios";

export default function AddTask() {
    const [task_id, setTaskId] = useState("");
    const [color, setColor] = useState("-");
    const [item_name, setItemName] = useState("");
    const [target, setTarget] = useState("");
    const [final_count, setFinalCount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [emp_id, setEmpId] = useState("");
    const [approval, setApproval] = useState("Not Approved");
    const [status, setStatus] = useState("Pending");

    function sendData(e) {
        e.preventDefault();

        // Validations
        if (!task_id || task_id < 0 || !item_name || !target || target < 0 || !deadline) {
            alert("Please fill all fields and ensure numeric fields are not negative.");
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "yyyy-mm-dd" format
        if (deadline < currentDate) {
            alert("Deadline cannot be set to a date before the current day.");
            return;
        }

        const newTask = {
            task_id,
            color,
            item_name,
            target,
            final_count,
            deadline,
            emp_id,
            approval,
            status
        };

        axios.post("http://localhost:3000/task/add", newTask)
            .then(() => {
                alert("Task Added");
                // Reset form fields after successful submission
                setTaskId("");
                setColor("-");
                setItemName("");
                setTarget("");
                setFinalCount("");
                setDeadline("");
                setEmpId("");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <h1 className="mt-3 mb-4">Add New Task</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={sendData}>
                        <div className="form-group">
                            <label htmlFor="task_id" className="form-label">Task ID</label>
                            <input type="number" className="form-control" id="task_id" required value={task_id} onChange={(e) => setTaskId(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="item_name" className="form-label">Item Name</label>
                            <input type="text" className="form-control" id="item_name" required value={item_name} onChange={(e) => setItemName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color" className="form-label">Color</label>
                            <input type="text" className="form-control" id="color" defaultValue="-" onChange={(e) => setColor(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="target" className="form-label">Target</label>
                            <input type="number" className="form-control" id="target" onChange={(e) => setTarget(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="final_count" className="form-label">Final Count</label>
                            <input type="number" className="form-control" id="final_count" onChange={(e) => setFinalCount(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline" className="form-label">Deadline</label>
                            <input type="date" className="form-control" id="deadline" onChange={(e) => setDeadline(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emp_id" className="form-label">Employee ID</label>
                            <input type="text" className="form-control" id="emp_id" onChange={(e) => setEmpId(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="approval" className="form-label">Approval</label>
                            <select className="form-control" id="approval" value={approval} onChange={(e) => setApproval(e.target.value)} disabled>
                                <option value="Not Approved">Not Approved</option>
                                <option value="Approved">Approved</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} disabled>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
