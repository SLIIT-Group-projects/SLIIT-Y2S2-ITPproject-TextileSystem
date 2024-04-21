import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddTask from './components/AddTask';
import AddTaskButton from './components/AddTaskButton';
import DisplayTasks from './components/DisplayTask';
import UpdateTask from './components/UpdateTask';
import DeleteTask from './components/DeleteTask'; 
import ExcessCompletedTasks from "./components/ExcessCompletedTasks";


function App() {
  return (
    <Router>
      <div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span style={{ color: '#08A6D5', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '55px', display: 'block' }}>
          TASK DASHBOARD
        </span>
      </div>        <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="/delete/:id" element={<DeleteTask />} /> {/* Route for DeleteTask component */}
          <Route path="/*" element={<ConditionalDisplayTasks />} />
          <Route path="/" element={<DisplayTasks />} />
          <Route path="/excess-completed" element={<ExcessCompletedTasks />} />
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
