const User = require('../userSchema');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in mongo
    const isDuplicate = await User.findOne({ username: username }).exec();
    if (isDuplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPass = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = User({
            "username": username,
            "password": hashedPass
        });
        
        await result.save()

        res.status(201).json({ 'success': `User ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { addUser };