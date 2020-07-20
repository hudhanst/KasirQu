const express = require('express')
const router = express.Router()
// const fileSystem = require('fs')
const path = require('path')

const auth = require('../Middleware/auth')

const JenisBarang = require('../../Models/JenisBarang')
const Barang = require('../../Models/Barang')

const { Create_Excel_File } = require('./Functions/functions.functions')
const { Get_UserbyID } = require('./Functions/functions.User')
const { Get_JenisBarang_List, Add_JenisBarang } = require('./Functions/functions.JenisBarang')
const { Get_Barang_List } = require('./Functions/functions.Barang')
const { Add_to_History } = require('./Functions/functions.History')

//// @router  Post api/jenisbarang/cek
//// @desc    cek JenisBarang name
//// @access  Private
router.post('/cek', auth, async (req, res) => {
    // console.log('api/jenisbarang/cek')
    try {
        const { NamaJenisBarang } = req.body
        const ExistNamaJenisBarang = await JenisBarang.findOne({ NamaJenisBarang: NamaJenisBarang })
        if (ExistNamaJenisBarang) {
            return res.status(401).json({ msg: 'Jenis Barang sudah ada tidak bisa sama' })
        } else {
            return res.status(200).json({ msg: 'Jenis Barang bisa digunakan' })
        }
    } catch (err) {
        console.log(`Erorr saat pemanggilan JenisBarang cek => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan JenisBarang cek',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/jenisbarang/tambah
//// @desc    Add new JenisBarang
//// @access  Private
router.post('/tambah', auth, async (req, res) => {
    // console.log('api/jenisbarang/tambah')
    const { NamaJenisBarang, Kepemilikan, Ket } = req.body
    const UserId = req.user.id
    try {
        ////// varifikasi data
        if ((!NamaJenisBarang) || (!Kepemilikan)) {
            throw {
                msg: 'form tidak lengkap'
            }
        }

        ////// cek availability
        const ExistJenisBarang = await JenisBarang.findOne({ NamaJenisBarang: NamaJenisBarang.toString().toLocaleLowerCase() })
        if (ExistJenisBarang) {
            throw {
                msg: 'Jenis Barang sudah ada'
            }
        }

        ////// cek to database
        const newJenisBarang = {
            NamaJenisBarang: NamaJenisBarang.toString().toLocaleLowerCase(),
            Kepemilikan: Kepemilikan,
            Ket: Ket ? Ket : null
        }

        Add_JenisBarang(newJenisBarang)
        Add_to_History(UserId, null, 'JenisBarang', 'Add', JSON.stringify(newJenisBarang), true)

        console.log('JenisBarang ditambah')
        return res.status(200)
            .json({
                msg: 'JenisBarang  berhasil ditambah'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan JenisBarang tambah => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan JenisBarang tambah',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/jenisbarang/list
//// @desc    Get JenisBarang List
//// @access  Private
router.get('/list', auth, async (req, res) => {
    // console.log('api/jenisbarang/list')
    try {
        const listjenisbarang = await Get_JenisBarang_List(null, '_id NamaJenisBarang Kepemilikan')
        console.log('JenisBarang list dipanggil')
        return res.status(200)
            .json({
                listjenisbarang: listjenisbarang ? listjenisbarang : [],
                msg: 'JenisBarang list berhasil dipanggil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan list JenisBarang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan list JenisBaran',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
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

        // console.log('JenisBarangQuery', JenisBarangQuery)
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
router.get('/detail/:id', auth, async (req, res) => {
    // console.log('api/jenisbarang/detail/:id')
    try {
        const jenisbarang = await JenisBarang.findById(req.params.id)
        console.log(`JenisBarang detail dipanggil = ${req.params.id}`)
        return res.status(200)
            .json({
                jenisbarang: jenisbarang ? jenisbarang : [],
                msg: 'JenisBarang detail berhasil dipanggil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan detail JenisBarang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan detail JenisBaran',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  Update api/jenisbarang/detail/:id/update
//// @desc    Update JenisBarang
//// @access  Private
router.patch('/detail/:id/update', auth, async (req, res) => {
    // console.log('api/jenisbarang/detail/:id/update')
    const { NamaJenisBarang } = req.body
    const UserId = req.user.id
    try {
        if (NamaJenisBarang) {
            throw {
                msg: 'input yang anda masukkan tidak bisa diganti'
            }
        }
        const OldJenisBarang = await JenisBarang.findByIdAndUpdate(req.params.id, { $set: req.body })
        Add_to_History(UserId, null, 'JenisBarang', 'Update', JSON.stringify(OldJenisBarang), true)
        console.log(`JenisBarang updated = ${req.params.id}`)
        return res.status(200)
            .json({
                msg: 'JenisBarang berhasil diupdate'
            })
    } catch (err) {
        console.log(`Erorr saat update JenisBarang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Update JenisBaran',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  Delete api/jenisbarang/detail/:id/delete
//// @desc    Delete JenisBarang
//// @access  Private
router.delete('/detail/:id/delete', auth, async (req, res) => {
    // console.log('api/jenisbarang/detail/:id/delete')
    const UserId = req.user.id
    try {
        const DeletedJenisBarang = await JenisBarang.findByIdAndDelete(req.params.id)

        Add_to_History(UserId, null, 'JenisBarang', 'Delete', JSON.stringify(DeletedJenisBarang), true)

        const ListBarang = await Get_Barang_List({ Jenis: DeletedJenisBarang.NamaJenisBarang }, null)

        if (ListBarang.length > 0) {
            for (const listbarang of ListBarang) {
                const DeleteBarang = await Barang.findByIdAndDelete(listbarang._id)
                console.log(`Barang, JenisBarang ${listbarang._id} deleted`)
                Add_to_History(UserId, null, 'Barang/JenisBarang', 'Delete', JSON.stringify(DeleteBarang), true)
            }
        }
        console.log(`JenisBarang ${req.params.id} deleted`)
        return res.status(200)
            .json({
                msg: 'JenisBarang berhasil didelete'
            })
    } catch (err) {
        console.log(`Erorr saat delete JenisBarang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses delete JenisBaran',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
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
            Add_to_History(UserId, null, 'JenisBarang', 'Import/Add', JSON.stringify(newJenisBarang), true)
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

        const UserDetail = await Get_UserbyID(UserId)
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