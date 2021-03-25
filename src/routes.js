const express = require('express')
const router = express.Router()
// const authMiddleware = require('../src/middlewares/jwt')

const userControler = require('../src/controllers/UserController')
// const videoControler = require('../src/controllers/VideoController')

router.get('/', (req, res) => {
    return res.send("bem vindo")
})

router.get('/users', userControler.index)
router.post('/users', userControler.store)
router.post('/login', userControler.login)

// router.post('/video', videoControler.store)

module.exports = router;