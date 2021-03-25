require('dotenv').config()

module.exports = {
    secret: process.env.SECRET, 
    expires: process.env.EXPIRES,
    rounds: 10
}