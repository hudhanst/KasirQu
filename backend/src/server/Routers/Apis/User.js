const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config_jwtSecret = require('../../config/keys').jwtSecret
const config_coupon = require('../../config/keys').coupon
const jwt = require('jsonwebtoken')

////// import auth
const auth = require('../Middleware/auth')
////// import module
const User = require('../../Models/User')

//// @router  GET api/users
//// @desc    get list all user 
//// @access  Private
router.get('/', auth, (req, res) => {
    User.find()
        .sort({ RegisterDate: -1 })
        .then(users => res.json(users))
})
//// @router  GET api/users/user/:id
//// @desc    get a user detail
//// @access  Private
router.get('/user/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ msg: 'data tidak ditemukan' }))
})
//// @router  POST api/users/firsttimeuse/register/superuser
//// @desc    Register for new use
//// @access  Public
router.post('/firsttimeuse/register/superuser', (req, res) => {
    const { UserName, Name, Password, coupon } = req.body
    if (coupon === config_coupon) {
        User.findOne({ isSuperUser: true })
            .then((user) => {
                if (user) {
                    return res.status(401).json({ msg: 'super user telah dibuat, hanya bisa digunakan sekali' })
                } else {
                    console.log(1)

                    const newUser = new User({
                        UserName: UserName,
                        Name: Name,
                        Password: Password,
                        isKasir: true,
                        isAdmin: true,
                        isSuperUser: true,
                    })
                    ////// create salt & hash
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.Password, salt, (err, hash) => {
                            if (err) throw err
                            console.log(2)
                            newUser.Password = hash
                            newUser.save()
                                .then(user => {
                                    ////// create jwt pattern
                                    jwt.sign(
                                        { id: user.id },
                                        config_jwtSecret,
                                        { expiresIn: 3600 },
                                        (err, token) => {
                                            if (err) throw err
                                            ////// responses
                                            res.json({
                                                token: token, ////// contain jwt pattern we sign above (id.jwtSecret.expire.err/responses)
                                                user: {
                                                    id: user.id,
                                                    UserName: user.UserName,
                                                    Name: user.Name,
                                                    Password: user.Password,
                                                    isActive: user.isActive,
                                                    isKasir: user.isKasir,
                                                    isAdmin: user.isAdmin,
                                                    isSuperUser: user.isSuperUser,
                                                    LastActive: user.LastActive,
                                                    RegisterDate: user.RegisterDate,
                                                }
                                            })
                                        })
                                })
                        })
                    })
                }
            })
    } else {
        return res.status(400).json({ msg: 'kupon yang anda masukkan salah' })
    }
})
//// @router  POST api/users/register
//// @desc    Register new user
//// @access  Private
router.post('/register', auth, (req, res) => {
    const { UserName, Name, Password, isKasir, isAdmin, isSuperUser } = req.body
    // const { UserName, Name, Password } = req.body

    ////// simple validation
    if (!UserName || !Name || !Password) {
        return res.status(400).json({ msg: 'mohon lengkapi form registrasi' })
    }
    if ((typeof isKasir !== 'undefined' && typeof isKasir !== 'boolean') ||
        (typeof isAdmin !== 'undefined' && typeof isAdmin !== 'boolean') ||
        (typeof isSuperUser !== 'undefined' && typeof isSuperUser !== 'boolean')) {
        return res.status(400).json({ msg: 'mohon masukkan input yang benar' })
    }
    ////// chec if user exist
    User.findOne({ UserName })
        .then(UserNameExist => {
            if (UserNameExist) {
                return res.status(400).json({ msg: 'UserName sudah ada' })
            } else {
                const newUser = new User({
                    UserName,
                    Name,
                    Password,
                    isKasir,
                    isAdmin,
                    isSuperUser,
                })

                ////// create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.Password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.Password = hash
                        newUser.save()
                            .then(user => {
                                res.status(200)
                                    .json({
                                        user: {
                                            id: user.id,
                                            UserName: user.UserName,
                                            Name: user.Name,
                                            Password: user.Password,
                                            isActive: user.isActive,
                                            isKasir: user.isKasir,
                                            isAdmin: user.isAdmin,
                                            isSuperUser: user.isSuperUser,
                                            LastActive: user.LastActive,
                                            RegisterDate: user.RegisterDate,
                                        }
                                    })
                            })
                    })
                })
            }
        })
})

//// @router  UPDATE api/users/user/:id/update
//// @desc    Update an User
//// @access  Private
router.patch('/user/:id/update', auth, (req, res) => {
    const { UserName, LastActive, RegisterDate, Password, isActive, isKasir, isAdmin, isSuperUser } = req.body
    if (UserName || LastActive || RegisterDate) {
        return res.status(401).json({ msg: 'input yang anda masukkan tidak bisa diganti' })
    }
    if ((typeof isActive !== 'undefined' && typeof isActive !== 'boolean') ||
        (typeof isKasir !== 'undefined' && typeof isKasir !== 'boolean') ||
        (typeof isAdmin !== 'undefined' && typeof isAdmin !== 'boolean') ||
        (typeof isSuperUser !== 'undefined' && typeof isSuperUser !== 'boolean')) {
        return res.status(400).json({ msg: 'mohon masukkan input yang benar' })
    }
    if (Password) {
        ////// retrieve the password field
        var password = req.body.Password

        ////// create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(String(password), salt, (err, hash) => {
                if (err) {
                    throw err
                } else {
                    req.body.Password = hash
                    User.findByIdAndUpdate(req.params.id, { $set: req.body })
                        .then(() => res.status(200).json({ msg: 'update berhasil' }))
                        .catch(err => res.status(404).json({ msg: 'ada kesalahan pada proses update', errorDetail: err }))
                }
            })
        })
    }
    else {
        User.findByIdAndUpdate(req.params.id, { $set: req.body })
            .then(() => res.status(200).json({ msg: 'update berhasil' }))
            .catch(err => res.status(404).json({ msg: 'ada kesalahan pada proses update', errorDetail: err }))
    }
})

//// @router  DELETE api/users/user/:id/delete
//// @desc    Delete an User
//// @access  Private
router.delete('/user/:id/delete', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove())
        .then(() => res.status(200).json({ msg: 'delet sukses' }))
        .catch(err => res.status(404).json({ msg: 'ada kesalahan pada proses delete', errorDetail: err }))
})

module.exports = router