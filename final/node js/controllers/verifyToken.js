const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    const sentHeader = req.headers['authorization'];
    if (!sentHeader) {
        return res.status(401);
    } //Unauthorized

    const token = sentHeader.split(' ');

    jwt.verify(
        token[1],
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) {
                console.log("failed");
                return res.sendStatus(403);
            }  //forbidden, token corrupted
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyToken;