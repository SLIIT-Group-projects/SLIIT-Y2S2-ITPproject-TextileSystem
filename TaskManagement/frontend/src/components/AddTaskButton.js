import React from "react";
import { Link } from "react-router-dom";

const AddTaskButton = () => {
  return (
    <div className="d-flex justify-content-end pt-3 pr-3">
      <Link to="/add-task" className="btn btn-primary">
        Add Task
      </Link>
    </div>
  );
};

export default AddTaskButton;
