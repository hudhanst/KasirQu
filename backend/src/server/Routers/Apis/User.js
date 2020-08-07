const express = require('express')
const router = express.Router()

const config_StaticFolderPath = require('../../config/keys').StaticFolderPath

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, `./${config_StaticFolderPath}/users/`)

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

const { Add_to_History } = require('./Functions/functions.History')

//// @router  GET api/users
//// @desc    get list all user 
//// @access  Private
router.get('/', auth, async (req, res) => {
    // console.log('/')
    try {
        const users = await User.find(null, '_id, UserName')
        console.log('Users list')
        return res.status(200).json(users)
    } catch (err) {
        console.log(`Erorr saat pemanggilan Users list => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Users list',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})
//// @router  GET api/users/user/:id
//// @desc    get a user detail
//// @access  Private
router.get('/user/:id', auth, async (req, res) => {
    // console.log('user/:id')
    try {
        const users = await User.findById(req.params.id)

        console.log('Users detail')
        return res.status(200).json(users)
    } catch (err) {
        console.log(`Erorr saat pemanggilan Users detail => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Users detail',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})
//// @router  POST api/users/firsttimeuse/register/superuser
//// @desc    Register for new use
//// @access  Public
router.post('/firsttimeuse/register/superuser', upload.single('ProfilePicture'), async (req, res) => { ////// not cek yet
    // console.log('firsttimeuse/register/superuser')
    try {
        const { UserName, Name, Password, coupon } = req.body
        if (coupon !== config_coupon) {
            throw {
                msg: 'kupon yang anda masukkan salah'
            }
        }
        const ExistUser = await User.findOne({ isSuperUser: true })
        if (ExistUser) {
            throw {
                msg: 'super user telah dibuat, hanya bisa digunakan sekali'
            }
        }

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
            bcrypt.hash(String(newUser.Password), salt, async (err, hash) => {
                if (err) throw err
                newUser.Password = hash
                const user = await newUser.save()
                Add_to_History(null, 'Service', 'User', 'Create', JSON.stringify(user), true)

                console.log(`superuser sudah dibuat = id${user.id}`)

                ////// create jwt pattern
                jwt.sign(
                    { id: user.id },
                    config_jwtSecret,
                    { expiresIn: config_tokenexpiresIn },
                    (err, token) => {
                        if (err) throw err
                        ////// responses
                        return res.status(200)
                            .json({
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
    } catch (err) {
        console.log(`Erorr saat pembuatan supersuper user => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pembuatan supersuper user',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})
//// @router  POST api/users/register
//// @desc    Register new user
//// @access  Private
router.post('/register', upload.single('ProfilePicture'), auth, async (req, res) => {
    // console.log('register')
    try {
        const { UserName, Name, Password, isKasir, isAdmin, isSuperUser } = req.body
        const UserId = req.user.id

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
            throw {
                msg: 'mohon lengkapi form registrasi'
            }
        }
        if ((typeof req.body.isKasir !== 'undefined' && typeof req.body.isKasir !== 'boolean') ||
            (typeof req.body.isAdmin !== 'undefined' && typeof req.body.isAdmin !== 'boolean') ||
            (typeof req.body.isSuperUser !== 'undefined' && typeof req.body.isSuperUser !== 'boolean')) {
            throw {
                msg: 'mohon masukkan input yang benar'
            }
        }
        ////// chec if user exist
        const UserNameExist = await User.findOne({ UserName: UserName.toString().toLocaleLowerCase() })

        if (UserNameExist) {
            throw {
                msg: 'UserName sudah ada'
            }
        }
        const newUser = req.file ?
            new User({
                UserName: UserName.toString().toLocaleLowerCase(),
                Name: UserName,
                Password: Password,
                isKasir: req.body.isKasir ? req.body.isKasir : undefined,
                isAdmin: req.body.isAdmin ? req.body.isAdmin : undefined,
                isSuperUser: req.body.isSuperUser ? req.body.isSuperUser : undefined,
                ProfilePicture: req.file.path
            }) :
            new User({
                UserName: UserName.toString().toLocaleLowerCase(),
                Name: UserName,
                Password: Password,
                isKasir: req.body.isKasir ? req.body.isKasir : undefined,
                isAdmin: req.body.isAdmin ? req.body.isAdmin : undefined,
                isSuperUser: req.body.isSuperUser ? req.body.isSuperUser : undefined,
                isSuperUser,
            })

        ////// create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(String(newUser.Password), salt, async (err, hash) => {
                if (err) throw err
                newUser.Password = hash
                const user = await newUser.save()
                console.log('Log: user', user)
                Add_to_History(UserId, null, 'User', 'Add', JSON.stringify(user), true)

                console.log('Registrasi sukses')
                return res.status(200)
                    .json({
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
        })
    } catch (err) {
        console.log(`Erorr saat pemanggilan User Register => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan User Register',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  UPDATE api/users/user/:id/update
//// @desc    Update an User
//// @access  Private
router.patch('/user/:id/update', upload.single('ProfilePicture'), auth, async (req, res) => {
    // console.log('user/:id/update')
    try {
        const { UserName, LastActive, RegisterDate } = req.body
        const UserId = req.user.id

        if (UserName || LastActive || RegisterDate) {
            throw {
                msg: 'input yang anda masukkan tidak bisa diganti'
            }
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
            throw {
                msg: 'mohon masukkan input yang benar'
            }
        }
        if (req.body.Password) {
            ////// retrieve the password field
            const password = req.body.Password

            ////// create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(String(password), salt, (err, hash) => {
                    if (err) {
                        throw err
                    } else {
                        req.body.Password = hash
                        User.findByIdAndUpdate(req.params.id, { $set: req.body })
                            .then((updateuser) => {
                                console.log(`updated = id${req.params.id}`)
                                Add_to_History(UserId, null, 'User', 'Update', JSON.stringify(updateuser), true)
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
                .then((updateuser) => {
                    console.log(`updated = id${req.params.id}`)
                    Add_to_History(UserId, null, 'User', 'Update', JSON.stringify(updateuser), true)
                    res.status(200).json({ msg: 'update berhasil' })
                })
                .catch(err => {
                    console.log(`Erorr saat update id${req.params.id} => ${err}`)
                    res.status(404).json({ msg: 'ada kesalahan pada proses update', errorDetail: err })
                })
        }
    } catch (err) {
        console.log(`Erorr saat pemanggilan User update => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan User update',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  DELETE api/users/user/:id/delete
//// @desc    Delete an User
//// @access  Private
router.delete('/user/:id/delete', auth, async (req, res) => {
    // console.log('user/:id/delete')
    try {
        const UserId = req.user.id

        const user = await User.findById(req.params.id)
        const DeletedUser = await user.remove()
        Add_to_History(UserId, null, 'User', 'Delete', JSON.stringify(DeletedUser), true)

        console.log(`deleted = id${req.params.id}`)
        return res.status(200)
            .json({
                msg: 'User  delet sukses'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan User delete => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan User delete',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

module.exports = router