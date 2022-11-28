const task = require('../taskSchema');
const moment = require('../../../maybe/node_modules/moment');

const addTask = async (req, res) => {

    // gets usernames array, start day, length.
    const usernames = req.body.usernames;
    console.log(usernames);
    const TaskName = req.body.title;

    const startDate = req.body.start;
    // const startDate = moment(req.body.start).add(2, 'h');
    const endDate = moment(startDate).add(1, 'h');

    if (!usernames) {
        return res.status(400).json({ 'message': 'No usernames given.' });
    }

    console.log("passed");
    const searchEmptyTime = async (username, startDate) => {

    }
    const response = new task({
        Usernames: [usernames[0]],
        TaskName,
        startDate,
        endDate
    });
    await response.save();
    res.status(201).json({ 'success': `Task '${TaskName}' has created!` });

}

module.exports = { addTask };