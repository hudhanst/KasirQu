const express = require('express')
const router = express.Router()
// const fileSystem = require('fs')
const path = require('path')

const auth = require('../Middleware/auth')

const JenisBarang = require('../../Models/JenisBarang')
const Barang = require('../../Models/Barang')

const { Create_Excel_File } = require('./Functions/functions.functions')
const { Get_UsetbyID } = require('./Functions/functions.User')
const { Get_JenisBarang_List, Add_JenisBarang } = require('./Functions/functions.JenisBarang')
const { Add_to_History } = require('./Functions/functions.History')

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
    const { NamaJenisBarang, Kepemilikan, Ket } = req.body

    if ((!NamaJenisBarang) || (!Kepemilikan)) {
        return res.status(400).json({ msg: 'form tidak lengkap' })
    }

    JenisBarang.findOne({ NamaJenisBarang: NamaJenisBarang.toLocaleLowerCase() })
        .then(JenisBarangExist => {
            if (JenisBarangExist) {
                return res.status(400).json({ msg: 'Jenis Barang sudah ada' })
            } else {
                const newJenisBarang = new JenisBarang({
                    NamaJenisBarang: NamaJenisBarang.toLocaleLowerCase(),
                    Kepemilikan: req.body.Kepemilikan,
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
        .select('_id NamaJenisBarang Kepemilikan')
        .then((listjenisbarang) => {
            console.log('JenisBarang list dipanggil')
            res.status(200).json({ listjenisbarang, msg: 'JenisBarang list berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan list JenisBarang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list JenisBaran', errorDetail: err })
        })
})

//// @router  POST api/jenisbarang/querylist
//// @desc    Post JenisBarang querylist
//// @access  Private
router.post('/querylist', auth, async (req, res) => {
    // console.log('api/jenisbarang/querylist')
    // console.log(req.body)
    const JenisBarang = req.body.JenisBarang ? req.body.JenisBarang : []
    const Kepemilikan = req.body.Kepemilikan ? req.body.Kepemilikan : null
    const Ket = req.body.Ket ? req.body.Ket : null
    try {
        const JenisBarangQuery = {}
        if (JenisBarang.length > 0) {
            const ListNamaJenisBarang = JenisBarang.map(jenisbarang => jenisbarang.NamaJenisBarang)
            Object.assign(JenisBarangQuery, { NamaJenisBarang: { $in: ListNamaJenisBarang } })
        }
        if (Kepemilikan) {
            Object.assign(JenisBarangQuery, { Kepemilikan: Kepemilikan })
        }
        if (Ket) {
            Object.assign(JenisBarangQuery, { Ket: `/${Ket}/` })
        }

        console.log('JenisBarangQuery', JenisBarangQuery)
        const JenisBarangSelect = '_id NamaJenisBarang Kepemilikan'
        const QueryListJenisBarang = await Get_JenisBarang_List(JenisBarangQuery, JenisBarangSelect)

        console.log('JenisBarang querylist dipanggil')
        return res.status(200)
            .json({
                QueryListJenisBarang: QueryListJenisBarang ? QueryListJenisBarang : [],
                msg: 'JenisBarang querylist berhasil dipanggil'
            })


    } catch (err) {
        console.log(`Erorr saat pemanggilan JenisBarang querylist => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan JenisBarang querylist',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
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
    const { NamaJenisBarang } = req.body
    if (NamaJenisBarang) {
        return res.status(401).json({ msg: 'input yang anda masukkan tidak bisa diganti' })
    }

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
        .then((jenisbarang) => {
            // console.log(jenisbarang)
            Barang.find()
                .where('Jenis').equals(jenisbarang.NamaJenisBarang)
                .then((barang) => {
                    // console.log('barang', barang)
                    if (barang && barang.length > 0) {
                        // console.log('ada barang')
                        barang.forEach(item => {
                            Barang.findByIdAndDelete(item._id)
                                .then(() => {
                                    console.log(`Barang ${item.Barcode} berhasil dihapus`)
                                })
                                .catch((err) => {
                                    console.log(`Barang ${item.Barcode} error saat penghapusan ${err}`)
                                })
                        })
                    }
                })
                .catch((err) => {
                    console.log(`Barang ${barang.Barcode} error saat pencarian ${err}`)
                })
            console.log(`JenisBarang ${req.params.id} deleted ${jenisbarang}`)
            res.status(200).json({ msg: 'JenisBarang berhasil didelete' })
        })
        .catch(err => {
            console.log(`Erorr saat delete JenisBarang => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses delete JenisBaran', errorDetail: err })
        })
})

//// @router  POST api/jenisbarang/import
//// @desc    Add Import new JenisBarang
//// @access  Private
router.post('/import', auth, async (req, res) => {
    // console.log('jenisbarang/import')
    // console.log(req.body)
    // console.log(req.user)
    const { ImportData } = req.body
    const UserId = req.user.id
    try {
        if ((!ImportData || !ImportData.length > 0)) {
            // return res.status(400).json({ msg: 'form tidak lengkap' })
            throw {
                msg: 'form tidak lengkap',
            }
        }
        const FixedImportData = []
        ////// recreate import data
        for (const element of ImportData) {
            if (FixedImportData.length > 0) {
                const ExistImportData = FixedImportData.find(fixedimportdata => fixedimportdata.NamaJenisBarang.toString().toLocaleLowerCase() === element.NamaJenisBarang.toString().toLocaleLowerCase())
                if (ExistImportData) {
                    throw {
                        msg: 'data input ganda',
                    }
                } else {
                    FixedImportData.push(element)
                }
            } else {
                FixedImportData.push(element)
            }
        }

        ////// cek data if data alredy exist in database
        for (const element of FixedImportData) {
            const ExistJenisBarang = await JenisBarang.findOne({ NamaJenisBarang: element.NamaJenisBarang.toString().toLocaleLowerCase() })
            if (ExistJenisBarang) {
                throw {
                    msg: 'data NamaJenisBarang sudah ada',
                }
            }
        }

        ////// add data to database
        for (const element of FixedImportData) {
            const newJenisBarang = {
                NamaJenisBarang: element.NamaJenisBarang.toString().toLocaleLowerCase(),
                Kepemilikan: element.Kepemilikan,
                Ket: element.Ket ? element.Ket : null
            }

            Add_JenisBarang(newJenisBarang)
            Add_to_History(UserId, null, 'Import/Add', JSON.stringify(newJenisBarang), true)
        }
        console.log('JenisBarang Import Berhasil')
        return res.status(200)
            .json({
                msg: 'Proses Import JenisBarang Berhasil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan JenisBarang Import => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan JenisBarang Import',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/jenisbarang/export
//// @desc    Add Export JenisBarang
//// @access  Private
router.post('/export', auth, async (req, res) => {
    // console.log('jenisbarang/export')
    // console.log(req.body)
    const UserId = req.user.id
    const RequestExportList = req.body.ExportData
    try {
        if (!RequestExportList.length > 0) {
            throw {
                msg: 'form tidak lengkap',
            }
        }
        const RequestNamaJenisBarangList = RequestExportList.map(requestexportlist => requestexportlist.NamaJenisBarang)

        const ExportData = await Get_JenisBarang_List({ NamaJenisBarang: { $in: RequestNamaJenisBarangList } }, '_id NamaJenisBarang Kepemilikan Ket', true)
        // console.log('__dirname',__dirname)

        const UserDetail = await Get_UsetbyID(UserId)
        const Location = 'JenisBarang'
        const ExcelFile = await Create_Excel_File(UserDetail.UserName, Location, ExportData)
        // console.log('ExcelFile',ExcelFile)
        const filePath = path.join(__dirname, `../../../../downloads/${Location}/${ExcelFile}`)

        // res.sendFile(filePath)
        return res.download(filePath)
        // return res.status(200)
        //     .download(filePath)
        //     .json({
        //         FileName: ExcelFile ? ExcelFile : '',
        //         msg: 'Proses Export JenisBarang Berhasil'
        //     })
    } catch (err) {
        console.log(`Erorr saat pemanggilan JenisBarang Export => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan JenisBarang Export',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

module.exports = router