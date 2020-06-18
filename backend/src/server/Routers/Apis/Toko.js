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

//// @router  POST api/toko/firsttimeuse/tokoconfig
//// @desc    Register toko for the first time
//// @access  Private
router.post('/firsttimeuse/tokoconfig', upload.single('Logo'), auth, (req, res) => {
    // console.log(req.body)
    const { NamaToko, Alamat, Kontak } = req.body
    Toko.findOne({ Identitas: config_tokoIdentitas })
        .then((toko) => {
            if (toko) {
                return res.status(401).json({ msg: 'toko sudah dibuat' })
            } else {
                if (!NamaToko || !Alamat) {
                    return res.status(400).json({ msg: 'mohon lengkapi form registrasi' })
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
                    .then(() => {
                        console.log(`Toko dibuat untuk pertama kali`)
                        res.status(200).json({ msg: 'Toko berhasil dibuat' })
                    })
                    .catch(err => {
                        console.log(`Erorr saat pebuatan toko => ${err}`)
                        res.status(400).json({ msg: 'ada kesalahan pada proses pembuatan toko harap lakukan secara manual pada halaman tentang toko', errorDetail: err })
                    })
            }
        })
})

//// @router  GET api/toko/detail
//// @desc    get toko detail
//// @access  Private
router.get('/detail', auth, (req, res) => {
    Toko.findOne({ Identitas: config_tokoIdentitas })
        .select('NamaToko Alamat Kontak Logo')
        .then((toko) => {
            console.log(`TokoDetail dipanggil`)
            res.status(200).json({ toko, msg: 'TokoDetail dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan TokoDetail => ${err}`)
            res.status(400).json({ msg: 'ada kesalahan pada proses pemanggilan TokoDetail', errorDetail: err })
        })
})

//// @router  UPDATE api/toko/update
//// @desc    Update TokoDetail
//// @access  Private
router.patch('/update', upload.single('Logo'), auth, (req, res) => {
    if (req.file) {
        req.body.Logo = req.file.path
    }
    Toko.findOne({ Identitas: config_tokoIdentitas })
        .then((toko) => {
            Toko.findByIdAndUpdate(toko._id, { $set: req.body })
                .then(() => {
                    console.log(`toko updated`)
                    res.status(200).json({ msg: 'update berhasil' })
                })
                .catch(err => {
                    console.log(`Erorr saat update toko => ${err}`)
                    res.status(404).json({ msg: 'ada kesalahan pada proses update toko', errorDetail: err })
                })
        })
        .catch(err => {
            console.log(`Erorr saat pencarian TokoDetail => ${err}`)
            res.status(500).json({ msg: 'ada kesalahan pada proses pencarian TokoDetail', errorDetail: err })
        })

})

module.exports = router