const router = require("express").Router();
let Task = require("../models/task.js");

router.route("/add").post((req, res) => {
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
    task_id,
    color,
    item_name,
    target,
    final_count,
    deadline,
    emp_id,
    approval,
    status,
  });

  newTask
    .save()
    .then(() => {
      res.json("Initial Task Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let taskId = req.params.id;
  //product.findOne(email)
  const task = await Task.findById(taskId)
    .then((task) => {
      res.status(200).send({ status: "task fetched", task });
    })
    .catch(() => {
      res
        .status(500)
        .send({ status: "error with get task", error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const taskId = req.params.id;
    const {
      task_id,
      color,
      item_name,
      target,
      final_count,
      deadline,
      emp_id,
      approval,
      status,
    } = req.body;
    const updateTask = {
      task_id,
      color,
      item_name,
      target,
      final_count,
      deadline,
      emp_id,
      approval,
      status,
    };
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateTask, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res
      .status(200)
      .json({ status: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});

module.exports = router;

router.route("/delete/:id").delete(async (req, res) => {
  let taskId = req.params.id;

  await Task.findByIdAndDelete(taskId)
    .then(() => {
      res.status(200).send({ status: "Task Deleted" });
    })
    .catch((err) => {
      console.lof(err.message);
      res
        .status(500)
        .send({ status: "Error with Delete Task", error: err.message });
    });
});


// this is released material add
router.route("/add").post((req, res) => {
  const item_name = req.body.item_name;
  const color = req.body.color;
  const target = Number(req.body.target);
  const emp_id = req.body.emp_id;
  const date = req.body.emp_id;

  const newTask = new Task({
    item_name,
    color,
    target,
    emp_id,
    date,
  });

  newTask
    .save()
    .then(() => {
      res.json("Initial Task Added");
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
