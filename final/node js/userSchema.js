const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        minLength: 6,
        maxLength: 20,
        type: String,
        required: true,
    },
    password: {
        minLength: 8,
        type: String,
        required: true,
    },
    refreshToken: String
});

module.exports = mongoose.model('users', usersSchema);