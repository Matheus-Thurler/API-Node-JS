const express = require('express')
const router = express.Router()

// IMPORTE PARA USO DO MIDDLEWARE
// const authMiddleware = require('../src/middlewares/jwt') 

const userControler = require('../src/controllers/UserController')

router.get('/', (req, res) => {
    return res.send("bem vindo")
})

// EXEMPLO DE ROTA COM MIDDLEWARE, ROTA SOMENTE SE TIVER O TOKEN DO USUARIO

// router.post('/users', authMiddleware, userControler.store)

router.get('/users', userControler.index)
router.post('/users', userControler.store)
router.post('/login', userControler.login)


module.exports = router;