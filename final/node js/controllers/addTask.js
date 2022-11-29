const task = require('../taskSchema');
const moment = require('../../../maybe/node_modules/moment');

const addTask = async (req, res) => {

    // gets usernames array, start day, length.
    const usernames = req.body.usernames;
    const TaskName = req.body.title;
    var startDate = new Date(req.body.start);
    const taskLength = req.body.lengthIn15;
    var time = [];

    if (!usernames) {
        return res.status(400).json({ 'message': 'No usernames given.' });
    }

    for (let i = 0; i < usernames.length; i++) {
        time = time.concat(await task.find({ Usernames: usernames[i] }));
    }

    const allUserTime = time;
    const userTasks = allUserTime.map(p => p.endDate);


    for (let i = 0; i < userTasks.length; i++) {
        let date = new Date(userTasks[i]);

        if (startDate.getHours > 23 && startDate.getHours < 6) {
            startDate.setHours(6);
            startDate.setMinutes(0);
            startDate.setSeconds(0);
        }
        if (startDate < date) {
            startDate = moment(startDate).add(15, 'm');
            i--;
        }

    }

    const startTime = startDate;
    const endTime = moment(startTime).add((15 * taskLength), 'm');

    const response = new task({
        Usernames: usernames,
        TaskName,
        startDate: startTime,
        endDate: endTime
    });

    await response.save();
    res.status(201).json({ 'success': `Task '${TaskName}' has created!` });

}

module.exports = { addTask };