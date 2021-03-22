const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['auth-token']
    if (!token) return res.status(401).send("Access denied")

    try {
        const valid = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = valid
        next();
    } catch (error) {
        res.status(400).send("invalid token")
    }
}

