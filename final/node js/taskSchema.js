const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    Usernames: { type: Array },

    TaskName: {
        type: String,
        minLength: 4,
        maxLength: 25,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('tasks', tasksSchema);

