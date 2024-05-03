const router = require("express").Router();
const TaskExcess = require("../models/TaskExcess");

router.post("/task-excess/", (req, res) => {
  // Extract tasks data from the request body
  const tasks = req.body.tasks;

 


  // Check if tasks data is provided
  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ error: "Invalid tasks data" });
  }

  // Insert tasks into the TaskExcess collection
  TaskExcess.insertMany(tasks)
    .then(() => {
      res.status(201).json({ message: "Tasks added to TaskExcess successfully!" });
    })
    .catch((err) => {
      console.error("Error adding tasks to TaskExcess:", err);
      res.status(500).json({ error: "Failed to add tasks to TaskExcess" });
    });
});

module.exports = router;
