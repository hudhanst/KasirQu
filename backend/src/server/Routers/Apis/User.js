const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './uploads/users/')
    },
    filename: (req, file, cd) => {
        cd(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const fileFilter = (req, file, cd) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cd(null, true)
    } else {
        cd(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30
    },
    fileFilter: fileFilter
})

const config_jwtSecret = require('../../config/keys').jwtSecret
const config_coupon = require('../../config/keys').coupon
const config_tokenexpiresIn = require('../../config/keys').tokenexpiresIn

////// import auth
const auth = require('../Middleware/auth')
////// import module
const User = require('../../Models/User')

//// @router  GET api/users
//// @desc    get list all user 
//// @access  Private
router.get('/', auth, (req, res) => {
    User.find()
        .select('_id, UserName')
        .sort({ RegisterDate: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ msg: 'ada kesalahan', error: err }))
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
router.post('/firsttimeuse/register/superuser', upload.single('ProfilePicture'), (req, res) => {
    const { UserName, Name, Password, coupon } = req.body
    if (coupon === config_coupon) {
        User.findOne({ isSuperUser: true })
            .then((user) => {
                if (user) {
                    return res.status(401).json({ msg: 'super user telah dibuat, hanya bisa digunakan sekali' })
                } else {

                    const newUser = req.file ?
                        new User({
                            UserName,
                            Name,
                            Password,
                            isKasir: true,
                            isAdmin: true,
                            isSuperUser: true,
                            ProfilePicture: req.file.path
                        }) :
                        new User({
                            UserName,
                            Name,
                            Password,
                            isKasir: true,
                            isAdmin: true,
                            isSuperUser: true,
                        })
                    ////// create salt & hash
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.Password, salt, (err, hash) => {
                            if (err) throw err
                            // console.log(2)
                            newUser.Password = hash
                            newUser.save()
                                .then(user => {
                                    ////// create jwt pattern
                                    jwt.sign(
                                        { id: user.id },
                                        config_jwtSecret,
                                        { expiresIn: config_tokenexpiresIn },
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
                                                    ProfilePicture: user.ProfilePicture,
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
router.post('/register', upload.single('ProfilePicture'), auth, (req, res) => {
    const { UserName, Name, Password, isKasir, isAdmin, isSuperUser } = req.body
    // const { UserName, Name, Password } = req.body

    if (req.body.isKasir) {
        if (req.body.isKasir === 'true') {
            req.body.isKasir = true
        } else if (req.body.isKasir === 'false')
            req.body.isKasir = false
    }
    if (req.body.isAdmin) {
        if (req.body.isAdmin === 'true') {
            req.body.isAdmin = true
        } else if (req.body.isAdmin === 'false')
            req.body.isAdmin = false
    }
    if (req.body.isSuperUser) {
        if (req.body.isSuperUser === 'true') {
            req.body.isSuperUser = true
        } else if (req.body.isSuperUser === 'false')
            req.body.isSuperUser = false
    }

    ////// simple validation
    if (!UserName || !Name || !Password) {
        return res.status(400).json({ msg: 'mohon lengkapi form registrasi' })
    }
    if ((typeof req.body.isKasir !== 'undefined' && typeof req.body.isKasir !== 'boolean') ||
        (typeof req.body.isAdmin !== 'undefined' && typeof req.body.isAdmin !== 'boolean') ||
        (typeof req.body.isSuperUser !== 'undefined' && typeof req.body.isSuperUser !== 'boolean')) {
        return res.status(400).json({ msg: 'mohon masukkan input yang benar' })
    }
    ////// chec if user exist
    User.findOne({ UserName })
        .then(UserNameExist => {
            if (UserNameExist) {
                return res.status(400).json({ msg: 'UserName sudah ada' })
            } else {
                const newUser = req.file ?
                    new User({
                        UserName,
                        Name,
                        Password,
                        isKasir,
                        isAdmin,
                        isSuperUser,
                        ProfilePicture: req.file.path
                    }) :
                    new User({
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
                                console.log(`registered = id${user.id}`)
                                res.status(200).json({
                                    msg: 'Registrasi sukses',
                                    user: {
                                        id: user.id,
                                        UserName: user.UserName,
                                        Name: user.Name,
                                        Password: user.Password,
                                        isActive: user.isActive,
                                        isKasir: user.isKasir,
                                        isAdmin: user.isAdmin,
                                        isSuperUser: user.isSuperUser,
                                        ProfilePicture: user.ProfilePicture,
                                        LastActive: user.LastActive,
                                        RegisterDate: user.RegisterDate,
                                    }
                                })
                            })
                            .catch(err => {
                                console.log(`Erorr saat register => ${err}`)
                                res.status(404).json({ msg: 'ada kesalahan pada proses registrasi', errorDetail: err })
                            })
                    })
                })
            }
        })
})

//// @router  UPDATE api/users/user/:id/update
//// @desc    Update an User
//// @access  Private
router.patch('/user/:id/update', upload.single('ProfilePicture'), auth, (req, res) => {
    const { UserName, LastActive, RegisterDate } = req.body
    if (UserName || LastActive || RegisterDate) {
        return res.status(401).json({ msg: 'input yang anda masukkan tidak bisa diganti' })
    }
    if (req.body.isActive) {
        if (req.body.isActive === 'true') {
            req.body.isActive = true
        } else if (req.body.isActive === 'false')
            req.body.isActive = false
    }
    if (req.body.isKasir) {
        if (req.body.isKasir === 'true') {
            req.body.isKasir = true
        } else if (req.body.isKasir === 'false')
            req.body.isKasir = false
    }
    if (req.body.isAdmin) {
        if (req.body.isAdmin === 'true') {
            req.body.isAdmin = true
        } else if (req.body.isAdmin === 'false')
            req.body.isAdmin = false
    }
    if (req.body.isSuperUser) {
        if (req.body.isSuperUser === 'true') {
            req.body.isSuperUser = true
        } else if (req.body.isSuperUser === 'false')
            req.body.isSuperUser = false
    }
    if (req.file) {
        req.body.ProfilePicture = req.file.path
    }
    if ((typeof req.body.isActive !== 'undefined' && typeof req.body.isActive !== 'boolean') ||
        (typeof req.body.isKasir !== 'undefined' && typeof req.body.isKasir !== 'boolean') ||
        (typeof req.body.isAdmin !== 'undefined' && typeof req.body.isAdmin !== 'boolean') ||
        (typeof req.body.isSuperUser !== 'undefined' && typeof req.body.isSuperUser !== 'boolean')) {
        return res.status(400).json({ msg: 'mohon masukkan input yang benar' })
    }
    if (req.body.Password) {
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
                        .then(() => {
                            console.log(`updated = id${req.params.id}`)
                            res.status(200).json({ msg: 'update berhasil' })
                        })
                        .catch(err => {
                            console.log(`Erorr saat update id${req.params.id} => ${err}`)
                            res.status(404).json({ msg: 'ada kesalahan pada proses update', errorDetail: err })
                        })
                }
            })
        })
    } else {
        delete req.body.Password
        User.findByIdAndUpdate(req.params.id, { $set: req.body })
            .then(() => {
                console.log(`updated = id${req.params.id}`)
                res.status(200).json({ msg: 'update berhasil' })
            })
            .catch(err => {
                console.log(`Erorr saat update id${req.params.id} => ${err}`)
                res.status(404).json({ msg: 'ada kesalahan pada proses update', errorDetail: err })
            })
    }
})

//// @router  DELETE api/users/user/:id/delete
//// @desc    Delete an User
//// @access  Private
router.delete('/user/:id/delete', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove())
        .then(() => {
            console.log(`deleted = id${req.params.id}`)
            res.status(200).json({ msg: 'delet sukses' })
        })
        .catch(err => {
            console.log(`Erorr saat Delete id${req.params.id} => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses delete', errorDetail: err })
        })
})

module.exports = router