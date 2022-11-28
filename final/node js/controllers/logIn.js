const User = require('../userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const logIn = async (req, res) => {

    const currUsername = req.body.username;
    const currPassword = req.body.password;

    if (!currUsername || !currPassword) {
        return res.status(400).json({ 'message': 'Username or Password are missing.' });
    }

    const checkUser = await User.findOne({ username: currUsername }).exec();

    if (!checkUser) {
        return res.status(401).json({ 'message': 'Username & password do not match' });
    }

    const checkPassword = await bcrypt.compare(currPassword, checkUser.password);

    if (checkPassword) {
        const accessToken = jwt.sign(
            { "username": checkUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { "username": checkUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        checkUser.refreshToken = refreshToken;
        await checkUser.save();

        res.cookie('jwt ', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(201).json({ 'success': `Token sent successfully`, 'accessToken': `${accessToken}` });
    } else {
        res.status(401).json({ 'message': 'Username & password do not match' });
    }
}
module.exports = { logIn };