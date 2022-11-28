const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        minLength: 4,
        maxLength: 20,
        type: String,
        required: true,
    },
    password: {
        minLength: 6,
        maxLength: 20,
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('users', usersSchema);