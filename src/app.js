const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const routes = require('./routes.js')

require('./database')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(routes)

module.exports = app;