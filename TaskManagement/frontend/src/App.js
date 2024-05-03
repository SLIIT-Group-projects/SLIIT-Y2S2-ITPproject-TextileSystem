import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddTask from './components/AddTask';
import AddTaskButton from './components/AddTaskButton';
import DisplayTasks from './components/DisplayTask';
import UpdateTask from './components/UpdateTask';
import DeleteTask from './components/DeleteTask'; 
import Excess from "./components/Excess";


function App() {
  return (
    <Router>
      <div>      
       <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="/delete/:id" element={<DeleteTask />} /> {/* Route for DeleteTask component */}
          <Route path="/*" element={<ConditionalDisplayTasks />} />
          <Route path="/" element={<DisplayTasks />} />
          <Route path="/task-excess" element={<Excess />} />
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
