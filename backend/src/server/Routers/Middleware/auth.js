const config_jwtSecret = require('../../config/keys').jwtSecret
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    //////
    if (!token) return res.status(401).json({ msg: 'akses denied' })

    try {
        ////// verfy token
        const decode = jwt.verify(token, config_jwtSecret)
        ////// add user from payload
        req.user = decode
        next()
    } catch (e) {
        res.status(400).json({ msg: 'akses invalid' })
    }
}
module.exports = auth