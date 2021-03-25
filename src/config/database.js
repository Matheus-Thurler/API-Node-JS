require('dotenv').config()

module.exports = {
    host : process.env.HOST,
    dialect: process.env.DIALECT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true
    }
}