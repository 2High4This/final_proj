const task = require("../taskSchema");
const moment = require("../../../maybe/node_modules/moment");

const addTask = async (req, res) => {
  // gets usernames array, start day, length.
  const usernames = req.body.usernames;
  const TaskName = req.body.title;
  const taskLength = req.body.lengthIn15;
  const allDay = req.body.allDay;

  var startDate = new Date(req.body.start);
  var time = [];

  if (!usernames) {
    return res.status(400).json({ message: "No usernames given." });
  }

  for (let i = 0; i < usernames.length; i++) {
    time = time.concat(await task.find({ Usernames: usernames[i] }));
  }
  for (let i = 0; i < time.length; i++) {
    const date = new Date(time[i].endDate);

    const newTaskEndDate = new Date(
      moment(startDate).add(15 * taskLength, "m")
    );

    if (allDay) {
      if (moment(newTaskEndDate).dayOfYear() === moment(date).dayOfYear()) {
        startDate = new Date(moment(startDate).add(1, "day"));
        i = 0;
      }
    } else {
      if (newTaskEndDate.getHours() >= 23 || newTaskEndDate.getHours() <= 6) {
        startDate = moment(startDate).add(1, "day");
        startDate = new Date(startDate).setHours(6, 0, 0);
      }
      if (newTaskEndDate < date) {
        startDate = moment(startDate).add(15, "m");
        i = 0;
      }
    }
  }

  const startTime = new Date(startDate);
  const newTaskEndDate = moment(startTime).add(15 * taskLength, "m");

  const response = new task({
    Usernames: usernames,
    TaskName,
    startDate: startTime,
    endDate: newTaskEndDate,
    allDay,
  });

  await response.save();
  res.status(201).json({ success: `Task '${TaskName}' has created!` });
};

module.exports = { addTask };
