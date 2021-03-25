const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const User = require('../models/Users')

module.exports = {
    async index(req, res) {
        const user = await Users.findAll({attributes: [ 'id','name', 'email']})

        if(user === "" || user === null) {
            return res.status(200).send({ message: "Nenhum usuário encontrado" })
        }

        return res.status(200).send({ user })
    },

    // metodo para criação de usuario com criptografia de senha e criação de token
    async store(req, res) {
        let password = bcrypt.hashSync( req.body.password, authConfig.rounds)
        const { name, email } = req.body
        
        await Users.create({ name, password, email})
        .then(user => {
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            })
            return res.json({ message: "usuario criado com sucesso",
                user: user.name
            })
        }).catch ((error) => {
            res.status(500).send({ message: error })
        })

    },

    async update(req, res) {

    },

    async delete(req, res) {

    },
    async login(req, res) {
        let {email, password} = req.body;

        User.findOne({
            where: {
                email:email
            }
        }).then(user => {
            if(!user) {
                res.status(404).send({ message: "Usuário não encontrado!" })
            } else {
                if(bcrypt.compareSync(password, user.password)) {
                    // devolvemos o token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    })
                    // aqui vc pode retornar tudo o que vc quer de usuario, se retornar usser: user, vc vai ter ate a senha
                    return res.json({
                        user: user.name,
                        email: user.email,
                        type: 'Bearer',
                        token: token
                    })
                } else {
                    res.status(401).send({ message: "Senha incorreta" })
                }
            }
        })
    }
}