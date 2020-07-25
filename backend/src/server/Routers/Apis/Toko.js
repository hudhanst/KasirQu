const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './uploads/toko/')
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

const config_tokoIdentitas = require('../../config/keys').tokoIdentitas

const auth = require('../Middleware/auth')
const Toko = require('../../Models/Toko')

const { Add_to_History } = require('./Functions/functions.History')

//// @router  POST api/toko/firsttimeuse/tokoconfig
//// @desc    Register toko for the first time
//// @access  Private
router.post('/firsttimeuse/tokoconfig', upload.single('Logo'), auth, async (req, res) => { ////// TODO auth???
    // console.log('firsttimeuse/tokoconfig')
    // console.log(req.body)
    try {
        const { NamaToko, Alamat, Kontak } = req.body
        const toko = await Toko.findOne({ Identitas: config_tokoIdentitas })
        if (toko) {
            throw {
                msg: 'toko sudah dibuat'
            }
        }

        if (!NamaToko || !Alamat) {
            throw {
                msg: 'mohon lengkapi form registrasi'
            }
        }

        const newToko = req.file ?
            new Toko({
                NamaToko,
                Alamat,
                Kontak,
                Logo: req.file.path
            }) :
            new Toko({
                NamaToko,
                Alamat,
                Kontak,
            })
        newToko.save()
        Add_to_History(null, 'Service', 'Toko', 'Create', JSON.stringify(newToko), true)

        console.log('Toko dibuat untuk pertama kali')
        return res.status(200)
            .json({
                msg: 'Toko berhasil dibuat'
            })

    } catch (err) {
        console.log(`Erorr saat pebuatan toko => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pembuatan toko harap lakukan secara manual pada halaman tentang toko',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/toko/detail
//// @desc    get toko detail
//// @access  Private
router.get('/detail', auth, async (req, res) => {
    // console.log('detail')
    try {
        const toko = await Toko.findOne({ Identitas: config_tokoIdentitas }, 'NamaToko Alamat Kontak Logo')

        console.log('TokoDetail dipanggil')
        return res.status(200)
            .json({
                toko: toko ? toko : null,
                msg: 'Barang  berhasil ditambah'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan TokoDetail => ${err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan TokoDetail',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  UPDATE api/toko/update
//// @desc    Update TokoDetail
//// @access  Private
router.patch('/update', upload.single('Logo'), auth, async (req, res) => {
    // console.log('update')
    try {
        const UserId = req.user.id
        if (req.file) {
            req.body.Logo = req.file.path
        }
        const toko = await Toko.findOne({ Identitas: config_tokoIdentitas })
        const OldToko = await Toko.findByIdAndUpdate(toko._id, { $set: req.body })
        Add_to_History(UserId, null, 'Toko', 'Update', JSON.stringify(OldToko), true)

        console.log('toko updated')
        return res.status(200)
            .json({
                msg: 'Toko update berhasil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan update toko => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan update Toko',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

module.exports = router