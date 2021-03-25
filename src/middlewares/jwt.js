const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
        
    if(!authHeader) return res.status(401).send({ error: 'No token provided' })

    const parts = authHeader.split(' ')

    if(!parts.length === 2) return res.status(401).send({ error: 'Token error' })

    const [ type, token] = parts
    if(!/^Bearer$/i.test(type)) return res.status(401).send({ error:  "Token, mal formatted"})

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token Invalid' })

        req.token = decoded.token

        return next()
    })
}

