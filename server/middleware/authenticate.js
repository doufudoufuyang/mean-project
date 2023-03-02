const path = require('path')
require('dotenv').config({ path : path.join(__dirname, '../../.env')})
const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
                return res.sendStatus(401)
            }
            req.payload = decode
            next()
        })
    } else {
        return res.sendStatus(403)
    }
}

const authorizationJWT = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error || decode.role !== 'admin') {
                return res.sendStatus(401)
            }
            req.payload = decode
            next()
        })
    } else {
        return res.sendStatus(403)
    }
}

module.exports = { authenticateJWT, authorizationJWT }