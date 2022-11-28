const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    Usernames: [String],
    TaskName: {
        type: String,
        minLength: 4,
        maxLength: 25,
        required: true,
    },
    Length: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('tasks', tasksSchema);

