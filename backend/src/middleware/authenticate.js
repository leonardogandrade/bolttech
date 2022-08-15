const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ "error": "token not provided." });

    const parts = authHeader.split(' ');
    [scheme, token] = parts;

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: "jwt token verification error" });
        req.userid = decoded._id;
        return next();
    })
}