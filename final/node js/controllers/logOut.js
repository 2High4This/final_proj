const User = require('../userSchema');

const handleLogout = async (req, res) => {

    const user = req.body.username;
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204); //No content
    }

    const checkUser = await User.findOne({ user }).exec();

    checkUser.refreshToken = '';
    const result = await checkUser.save();
    console.log("success");

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(201);
}

module.exports = { handleLogout };