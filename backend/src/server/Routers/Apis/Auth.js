const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config_jwtSecret = require('../../config/keys').jwtSecret
const config_tokenexpiresIn = require('../../config/keys').tokenexpiresIn
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/auth')

////// import user model
const User = require('../../Models/User')

//// @router  POST api/auth/login
//// @desc    Auth user
//// @access  Public
router.post('/login', async (req, res) => {
    // console.log('login')
    try {
        const { UserName, Password } = req.body
        if (!UserName || !Password) {
            throw {
                msg: 'form tidak lengkap'
            }
        }
        const user = await User.findOne({ UserName: UserName })
        if (!user) {
            throw {
                msg: 'user tidak ditemukan'
            }
        }
        if (!user.isActive) {
            throw {
                msg: 'user tidak aktif'
            }
        }
        const isMatch = await bcrypt.compare(Password, user.Password)
        if (!isMatch) {
            throw {
                msg: 'username / password salah'
            }
        }

        const thisTime = new Date()
        // console.log('Log: thisTime', thisTime.toLocaleString())

        const newLastActive = await User.findByIdAndUpdate(user._id, { $set: { LastActive: thisTime } })
        // console.log('Log: newLastActive', newLastActive)
        const token = jwt.sign(
            { id: user.id },
            config_jwtSecret,
            { expiresIn: config_tokenexpiresIn },
        )

        console.log(`${user._id} Login, token = ${token}`)
        return res.status(200)
            .json({
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
    } catch (err) {
        console.log(`Erorr saat pemanggilan Login => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Login',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/auth/user
//// @desc    Get user data
//// @access  Private
router.get('/user', auth, async (req, res) => {
    // console.log('user')
    try {
        const user = await User.findById(req.user.id, '-Password -ProfilePicture -LastActive -RegisterDate')

        console.log('User Data dipanggil')
        return res.status(200).json(user)
    } catch (err) {
        console.log(`Erorr saat pemanggilan User Data => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(404).json(err)
    }
})

module.exports = router
