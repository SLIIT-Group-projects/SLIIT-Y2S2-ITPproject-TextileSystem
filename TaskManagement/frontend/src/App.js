import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddTask from './components/AddTask';
import AddTaskButton from './components/AddTaskButton';
import DisplayTasks from './components/DisplayTask';
import UpdateTask from './components/UpdateTask';
import DeleteTask from './components/DeleteTask'; // Import DeleteTask component

function App() {
  return (
    <Router>
      <div>
        <h1>Task Dashboard</h1>
        <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="/delete/:id" element={<DeleteTask />} /> {/* Route for DeleteTask component */}
          <Route path="/*" element={<ConditionalDisplayTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalDisplayTasks() {
  return (
    <div>
      <AddTaskButton />
      <DisplayTasks />
    </div>
  );
}

export default App;
