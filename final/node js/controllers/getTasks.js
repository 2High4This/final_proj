const tasks = require("../taskSchema");

const getTasks = async (req, res) => {
  const userName = req.query.requestedName;

  if (!userName) {
    return res.status(400).json({ message: "Username is missing." });
  }

  const getUserTasks = await tasks.find({ Usernames: userName }).exec();

  res.json(getUserTasks);
};

module.exports = { getTasks };
