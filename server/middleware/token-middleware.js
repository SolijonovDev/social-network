const jwt = require("jsonwebtoken")

async function TokenMiddleware(req, res, next) {
    try {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            return res.status(401).json({ message: "ne avtorizovan" })
        }
        const token = authHeaders.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "ne avtorizovan" })
        }
        const infoUser = await jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = infoUser;
        next()
    } catch (e) {
        console.log('middleware error',e)
        return res.status(401).json({ message: "ne avtorizovan" })
    }
}

module.exports = TokenMiddleware;