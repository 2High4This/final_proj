const task = require("../taskSchema");

const deleteTask = async (req, res) => {
  const taskId = req.body.id;
  if (!taskId) {
    return res
      .status(400)
      .json({ message: "Task doesn't have an id. contact db" });
  }

  const myTask = await task.findById(taskId);
  task.deleteOne(myTask).exec();
  res.status(201).json({ success: `Task deleted successfully!` });
};

module.exports = { deleteTask };
