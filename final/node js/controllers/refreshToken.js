const User = require('../userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    const checkUser = await User.findOne({ refreshToken }).exec();

    if (!checkUser) {
        return res.status(401).json({ 'message': 'Username & password do not match' });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || checkUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken })
        }
    );
}
module.exports = { handleRefreshToken };