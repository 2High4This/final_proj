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

        const endTime = moment(startDate).add((15 * taskLength), 'm');
        const checkTotal = new Date(endTime);
        console.log(i, checkTotal.getHours());

        if (checkTotal.getHours() > 23 || checkTotal.getHours() < 6) {
            startDate = moment(startDate).add(1, 'day');
            startDate = new Date(startDate).setHours(6, 0, 0);
            // startDate = startDate.setMinutes(0);
            // startDate = startDate.setSeconds(0);
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