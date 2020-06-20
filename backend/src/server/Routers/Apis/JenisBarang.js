const express = require('express')
const router = express.Router()

const auth = require('../Middleware/auth')

const JenisBarang = require('../../Models/JenisBarang')


////// TODO GET LIST BASE ON JENISBARANG (ON BARANG)
////// TODO UPDATE => UPDATE ON BARANGDATABASE
////// TODO DELETE => DELETE ON BARANGDATABASE



//// @router  Post api/jenisbarang/cek
//// @desc    cek JenisBarang name
//// @access  Private
router.post('/cek', auth, (req, res) => {
    const { NamaJenisBarang } = req.body
    JenisBarang.findOne({ NamaJenisBarang: NamaJenisBarang })
        .then((namajenisbarang) => {
            if (namajenisbarang) {
                return res.status(401).json({ msg: 'Jenis Barang sudah ada tidak bisa sama' })
            } else {
                return res.status(200).json({ msg: 'Jenis Barang bisa digunakan' })
            }
        })
})

//// @router  POST api/jenisbarang/tambah
//// @desc    Add new JenisBarang
//// @access  Private
router.post('/tambah', auth, (req, res) => {
    const { NamaJenisBarang, Ket } = req.body

    if (!NamaJenisBarang) {
        return res.status(400).json({ msg: 'mohon lengkapi form registrasi' })
    }

    JenisBarang.findOne({ NamaJenisBarang })
        .then(JenisBarangExist => {
            if (JenisBarangExist) {
                return res.status(400).json({ msg: 'Jenis Barang sudah ada' })
            } else {
                const newJenisBarang = new JenisBarang({
                    NamaJenisBarang,
                    Ket,
                })

                newJenisBarang.save()
                    .then((jenisbarang) => {
                        console.log(`JenisBarang ditambah = ${jenisbarang.NamaJenisBarang}`)
                        res.status(200).json({ msg: 'JenisBarang  berhasil ditambah' })
                    })
                    .catch(err => {
                        console.log(`Erorr saat penambahan JenisBarang => ${err}`)
                        res.status(404).json({ msg: 'ada kesalahan pada proses penambahan JenisBarang', errorDetail: err })
                    })
            }
        })
})

//// @router  GET api/jenisbarang/list
//// @desc    Get JenisBarang List
//// @access  Private
router.get('/list', auth, (req, res) => {
    JenisBarang.find()
    .select('_id, NamaJenisBarang')
    .then((listjenisbarang) => {
        console.log('JenisBarang list dipanggil')
        res.status(200).json({ listjenisbarang, msg: 'JenisBarang list berhasil dipanggil' })
    })
    .catch(err => {
        console.log(`Erorr saat pemanggilan list JenisBarang => ${err}`)
        res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list JenisBaran', errorDetail: err })
    })
})

//// @router  GET api/jenisbarang/detail/:id
//// @desc    Get JenisBarang detail
//// @access  Private
router.get('/detail/:id', auth, (req, res) => {
    JenisBarang.findById(req.params.id)
        .then((jenisbarang) => {
            console.log(`JenisBarang detail dipanggil = ${req.params.id}`)
            res.status(200).json({ jenisbarang, msg: 'JenisBarang detail berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan detail JenisBarang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan detail JenisBaran', errorDetail: err })
        })
})

//// @router  Update api/jenisbarang/detail/:id/update
//// @desc    Update JenisBarang
//// @access  Private
router.patch('/detail/:id/update', auth, (req, res) => {
    JenisBarang.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(() => {
            console.log(`JenisBarang updated = ${req.params.id}`)
            res.status(200).json({ msg: 'JenisBarang berhasil diupdate' })
        })
        .catch(err => {
            console.log(`Erorr saat update JenisBarang ${req.params.id} => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses Update JenisBaran', errorDetail: err })
        })
})

//// @router  Delete api/jenisbarang/detail/:id/delete
//// @desc    Delete JenisBarang
//// @access  Private
router.delete('/detail/:id/delete', auth, (req, res) => {
    JenisBarang.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log(`JenisBarang ${req.params.id} deleted`)
            res.status(200).json({ msg: 'JenisBarang berhasil didelete' })
        })
        .catch(err => {
            console.log(`Erorr saat delete JenisBarang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses delete JenisBaran', errorDetail: err })
        })
})

module.exports = router