const task = require('../taskSchema');
const jwt = require('./verifyToken');
const moment = require('../../../maybe/node_modules/moment');

const addTask = async (req, res) => {

    // gets usernames array, start day, length.
    const username = req.body.usernames;
    const TaskName = req.body.title;

    const startDate = req.body.start;
    // const startDate = moment(req.body.start).add(2, 'h');
    const endDate = moment(startDate).add(1, 'h');

    if (!username) {
        return res.status(400).json({ 'message': 'No usernames given.' });
    }
    if (jwt(req, res)) {
        console.log("passed");
        const searchEmptyTime = async (username, startDate) => {

        }
        const response = new task({
            Usernames: [username[0]],
            TaskName,
            startDate,
            endDate
        });
        await response.save();
        res.status(201).json({ 'success': `Task '${TaskName}' has created!` });
    }
}

module.exports = { addTask };