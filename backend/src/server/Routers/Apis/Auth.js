const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config_jwtSecret = require('../../config/keys').jwtSecret
const config_tokenexpiresIn = require('../../config/keys').tokenexpiresIn
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/auth')

////// import user model
const User = require('../../Models/User')

//// @router  POST api/auth
//// @desc    Auth user
//// @access  Public
router.post('/', (req, res) => {
    const { UserName, Password } = req.body
    if (!UserName || !Password) {
        return res.status(400).json({ msg: 'form tidak lengkap' })
    }
    User.findOne({ UserName })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'user tidak ditemukan' })

            ////// validate password
            bcrypt.compare(Password, user.Password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'username / password salah' })

                    var today = Date()
                    User.findOneAndUpdate(UserName, { $set: { LastActive: today } })
                        .then(() => {
                            jwt.sign(
                                { id: user.id },
                                config_jwtSecret,
                                { expiresIn: config_tokenexpiresIn },
                                (err, token) => {
                                    if (err) throw err

                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            UserName: user.UserName,
                                            Name: user.Name,
                                            isActive: user.isActive,
                                            isKasir: user.isKasir,
                                            isAdmin: user.isAdmin,
                                            isSuperUser: user.isSuperUser
                                        }
                                    })
                                }
                            )
                        })
                        .catch((err) => res.status(500).json(err))
                })
        })
})

//// @router  GET api/auth/user
//// @desc    Get user data
//// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-Password -LastActive -RegisterDate')
        .then(user => res.json(user))
        .catch((err) => res.status(404).json(err))
})

module.exports = router
