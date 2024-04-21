const router = require("express").Router();
let Task = require("../models/task.js");

router.route("/add").post((req,res)=>{

    const task_id = Number(req.body.task_id);
    const color = req.body.color;
    const item_name = req.body.item_name;
    const target = Number(req.body.target);
    const final_count = Number(req.body.final_count);
    const deadline = req.body.deadline;
    const emp_id = req.body.emp_id;
    const approval = req.body.approval;
    const status = req.body.status;

    const newTask = new Task({
        task_id,color,
        item_name,
        target,final_count,
        deadline,
        emp_id,
        approval,
        status
    })

    newTask.save().then(()=>{
        res.json("Initial Task Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Task.find().then((tasks)=>{
        res.json(tasks)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/:id").get(async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Error fetching task" });
  }
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task_id, color, item_name, target, final_count, deadline, emp_id, approval, status } = req.body;
    const updateTask = {
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
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateTask, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ status: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});

module.exports = router;


router.route("/delete/:id").delete(async(req,res)=>{
    let taskId = req.params.id;

    await Task.findByIdAndDelete(taskId).then(()=>{
        res.status(200).send({status: "Task Deleted"});
    }).catch((err)=>{
        console.lof(err.message);
        res.status(500).send({status: "Error with Delete Task", error: err.message});
    })
})

router.route("/excess-completed").get(async (req, res) => {
    try {
      const allTasks = await Task.find();
      const completedTasks = allTasks.filter(task => task.status === "completed");
      const completedTasksCountByEmployee = completedTasks.reduce((acc, task) => {
        acc[task.emp_id] = (acc[task.emp_id] || 0) + 1;
        return acc;
      }, {});
      const targetsByEmployee = {};
      allTasks.forEach(task => {
        targetsByEmployee[task.emp_id] = targetsByEmployee[task.emp_id] || 0;
        targetsByEmployee[task.emp_id]++;
      });
      const excessCompletedTasks = Object.keys(completedTasksCountByEmployee).map(emp_id => {
        const completedCount = completedTasksCountByEmployee[emp_id];
        const targetCount = targetsByEmployee[emp_id] || 0;
        const excess = completedCount - targetCount;
        return { emp_id, excess };
      });
      res.status(200).json(excessCompletedTasks);
    } catch (error) {
      console.error("Error calculating excess completed tasks:", error);
      res.status(500).json({ error: "Error calculating excess completed tasks", message: error.message });
    }
  });


module.exports = router;
