const User = require('../userSchema');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204); //No content
    }

    const refreshToken = cookies.jwt;

    const checkUser = await User.findOne({ refreshToken }).exec();

    if (!checkUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    checkUser.refreshToken = '';
    const result = await checkUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}
module.exports = { handleLogout };