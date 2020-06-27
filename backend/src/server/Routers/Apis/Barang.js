const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './uploads/barang/')
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

const auth = require('../Middleware/auth')

const Barang = require('../../Models/Barang')
const JenisBarang = require('../../Models/JenisBarang')

//// @router  Post api/barang/cek/barcode
//// @desc    cek Barang barcode
//// @access  Private
router.post('/cek/barcode', auth, (req, res) => {
    const { Barcode } = req.body
    Barang.findOne({ Barcode: Barcode })
        .then((barcode) => {
            if (barcode) {
                return res.status(401).json({ msg: 'Barcode Barang sudah ada tidak bisa sama' })
            } else {
                return res.status(200).json({ msg: 'Barcode Barang bisa digunakan' })
            }
        })
})

//// @router  Post api/barang/cek/name
//// @desc    cek Barang name
//// @access  Private
router.post('/cek/name', auth, (req, res) => {
    const { Name } = req.body
    Barang.findOne({ Name: Name })
        .then((name) => {
            if (name) {
                return res.status(401).json({ msg: 'Name Barang sudah ada tidak bisa sama' })
            } else {
                return res.status(200).json({ msg: 'Name Barang bisa digunakan' })
            }
        })
})

//// @router  POST api/barang/tambah
//// @desc    Add new Barang
//// @access  Private
router.post('/tambah', upload.single('BarangPic'), auth, (req, res) => {
    const { Barcode, Name, Jenis, Ket } = req.body
    if ((!Barcode) || (!Name) || (!Jenis)) {
        return res.status(400).json({ msg: 'mohon lengkapi form registrasi' })
    }

    Barang.findOne({ $or: [{ Barcode: Barcode }, { Name: Name }] })
        .then(barang => {
            if (barang) {
                return res.status(400).json({ msg: 'Barang sudah ada' })
            } else {
                const newBarang = req.file ?
                    new Barang({
                        Barcode,
                        Name,
                        Jenis,
                        Ket,
                        BarangPic: req.file.path
                    }) :
                    new Barang({
                        Barcode,
                        Name,
                        Jenis,
                        Ket,
                    })

                newBarang.save()
                    .then((newbarang) => {
                        console.log(`Barang ditambah = ${newbarang.Barcode} = ${newbarang.Name}`)
                        res.status(200).json({ msg: 'Barang  berhasil ditambah' })
                    })
                    .catch(err => {
                        console.log(`Erorr saat penambahan Barang => ${err}`)
                        res.status(404).json({ msg: 'ada kesalahan pada proses penambahan Barang', errorDetail: err })
                    })
            }
        })
})

//// @router  GET api/barang/list
//// @desc    Get Barang List
//// @access  Private
router.get('/list', auth, (req, res) => {
    Barang.find()
        .select('-Ket -BarangPic')
        .then((ListBarang) => {
            console.log('Barang list dipanggil')
            res.status(200).json({ ListBarang, msg: 'Barang list berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan list Barang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list Barang', errorDetail: err })
        })
})

//// @router  GET api/barang/jenisbaranglist/:id
//// @desc    Get Barang List base on JenisBarang
//// @access  Private
router.get('/jenisbaranglist/:id', auth, (req, res) => {
    JenisBarang.findById(req.params.id)
        .then((jenisbarang) => {
            console.log(`JenisBarang ${jenisbarang.NamaJenisBarang} list dipanggil`)
            Barang.find()
                .where('Jenis').equals(jenisbarang.NamaJenisBarang)
                .select('-Ket -BarangPic')
                .then((ListBarang) => {
                    console.log('Barang list dipanggil')
                    res.status(200).json({ ListBarang, msg: 'Barang list berhasil dipanggil' })
                })
                .catch(err => {
                    console.log(`Erorr saat pemanggilan list Barang => ${err}`)
                    res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list Barang', errorDetail: err })
                })
        })
        .catch((err) => {
            console.log(`Erorr saat pemanggilan list JenisBarang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list JenisBarang', errorDetail: err })
        })
})

//// @router  GET api/barang/detail/:id
//// @desc    Get Barang detail
//// @access  Private
router.get('/detail/:id', auth, (req, res) => {
    Barang.findById(req.params.id)
        .then((barang) => {
            console.log(`Barang detail dipanggil = ${req.params.id}`)
            res.status(200).json({ barang, msg: 'Barang detail berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan detail Barang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan detail Barang', errorDetail: err })
        })
})

//// @router  Update api/barang/detail/:id/update
//// @desc    Update Barang
//// @access  Private
router.patch('/detail/:id/update', upload.single('BarangPic'), auth, (req, res) => {
    const { Barcode } = req.body
    if (Barcode) {
        return res.status(401).json({ msg: 'input yang anda masukkan tidak bisa diganti' })
    }
    if (req.file) {
        req.body.BarangPic = req.file.path
    }
    Barang.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(() => {
            console.log(`Barang updated = ${req.params.id}`)
            res.status(200).json({ msg: 'Barang berhasil diupdate' })
        })
        .catch(err => {
            console.log(`Erorr saat update Barang ${req.params.id} => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses Update Barang', errorDetail: err })
        })
})

//// @router  Delete api/barang/detail/:id/delete
//// @desc    Delete Barang
//// @access  Private
router.delete('/detail/:id/delete', auth, (req, res) => {
    Barang.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log(`Barang ${req.params.id} deleted`)
            res.status(200).json({ msg: 'Barang berhasil didelete' })
        })
        .catch(err => {
            console.log(`Erorr saat delete Barang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses delete Barang', errorDetail: err })
        })
})

module.exports = router