require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
// const axios = require('../api/axios');
const User = require('./userSchema.js');
const Task = require('./taskSchema.js');

async function connect() {
    await mongoose.connect(process.env.URI,
        () => {
            console.log("connected")
        }, e => {
            console.error(e)
        }
    );
}

async function addUser() {
    try {
        const newUser = new User({
            username: 'isaac',
            password: '123456',
        });
        await newUser.save();
        console.log("user added successfully");
    } catch (error) {
        console.error(error);
    }
}
async function addTask(users, taskName, date, length) {
    const newTask = new Task({
        Usernames: users,
        TaskName: taskName,
        Length: length,
        Date: date
    });
    await newTask.save();
    console.log("task added successfully");
}


async function deleteTask(id) {
    try {
        const task = await Task.findOne({ _id: id });
        console.log(task.TaskName);
        task.deleteOne();
        console.log(`Task deleted successfully`);
    } catch (error) {
        console.log('deletion failed. try a different id');
    }
}

const app = express();
app.listen(5000, () => { console.log("Started on port 5000") });
app.use(cookieParser());
app.use(express.json());

app.use('/')
app.use("/addUser", (req) => {
    addUser();
});


connect();