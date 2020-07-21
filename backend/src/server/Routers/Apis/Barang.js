const express = require('express')
const router = express.Router()
const path = require('path')

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

const { Get_Barang_List, Add_Barang } = require('./Functions/functions.Barang')
const { Get_JenisBarang_List } = require('./Functions/functions.JenisBarang')
const { Get_UserbyID } = require('./Functions/functions.User')
const { Create_Excel_File } = require('./Functions/functions.functions')
const { Add_to_History } = require('./Functions/functions.History')

const Barang = require('../../Models/Barang')
const JenisBarang = require('../../Models/JenisBarang')

// TODO update barang name???

//// @router  Post api/barang/cek/barcode
//// @desc    cek Barang barcode
//// @access  Private
router.post('/cek/barcode', auth, async (req, res) => {
    // console.log('cek/barcode')
    // console.log(req.body)
    const { Barcode } = req.body
    try {
        const ExistData = await Barang.findOne({ Barcode: Barcode })
        if (ExistData) {
            return res.status(401).json({ msg: 'Barcode Barang sudah ada tidak bisa sama' })
        } else {
            return res.status(200).json({ msg: 'Barcode Barang bisa digunakan' })
        }
    } catch (err) {
        console.log(`Erorr saat pemanggilan Barang cek barcode => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Barang cek barcode',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  Post api/barang/cek/name
//// @desc    cek Barang name
//// @access  Private
router.post('/cek/name', auth, async (req, res) => {
    // console.log('cek/name')
    // console.log(req.body)
    const { Name } = req.body
    try {
        const ExistData = await Barang.findOne({ Name: Name })
        if (ExistData) {
            return res.status(401).json({ msg: 'Name Barang sudah ada tidak bisa sama' })
        } else {
            return res.status(200).json({ msg: 'Name Barang bisa digunakan' })
        }
    } catch (err) {
        console.log(`Erorr saat pemanggilan Barang cek name => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Barang cek name',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }

})

//// @router  POST api/barang/tambah
//// @desc    Add new Barang
//// @access  Private
router.post('/tambah', upload.single('BarangPic'), auth, async (req, res) => {
    // console.log('tambah')
    // console.log(req.body)
    const { Barcode, Name, Jenis } = req.body
    const UserId = req.user.id
    try {
        ////// cek data
        if ((!Barcode) || (!Name) || (!Jenis)) {
            throw {
                msg: 'mohon lengkapi form registrasi',
            }
        }

        ////// convert data
        if (req.body.isDecimal) {
            if (req.body.isDecimal === 'true') {
                req.body.isDecimal = true
            } else if (req.body.isDecimal === 'false')
                req.body.isDecimal = false
        }

        ////// cek exist data
        const ExistData = await Barang.findOne({ $or: [{ Barcode: Barcode.toString().toLocaleLowerCase() }, { Name: Name.toString().toLocaleLowerCase() }] })
        if (ExistData) {
            throw {
                msg: 'Barang sudah ada',
            }
        }

        ////// prepare data before save
        const newBarang = req.file ?
            new Barang({
                Barcode: Barcode.toString().toLocaleLowerCase(),
                Name: Name.toString().toLocaleLowerCase(),
                Jenis: Jenis.toString().toLocaleLowerCase(),
                isDecimal: req.body.isDecimal ? req.body.isDecimal : null,
                SatuanJual: null,
                Ket: req.body.Ket ? req.body.Ket : null,
                BarangPic: req.file.path
            }) :
            new Barang({
                Barcode: Barcode.toString().toLocaleLowerCase(),
                Name: Name.toString().toLocaleLowerCase(),
                Jenis: Jenis.toString().toLocaleLowerCase(),
                isDecimal: req.body.isDecimal ? req.body.isDecimal : null,
                SatuanJual: null,
                Ket: req.body.Ket ? req.body.Ket : null,
            })

        Add_Barang(newBarang)
        Add_to_History(UserId, null, 'Barang', 'Add', JSON.stringify(newBarang), true)

        console.log('Barang ditambah')
        return res.status(200)
            .json({
                msg: 'Barang  berhasil ditambah'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Barang tambah => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Barang tambah',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }

})

//// @router  GET api/barang/list
//// @desc    Get Barang List
//// @access  Private
router.get('/list', auth, async (req, res) => {
    // console.log('list')
    try {
        const ListBarang = await Get_Barang_List(null, '-Ket -BarangPic')

        console.log('Barang list dipanggil')
        return res.status(200)
            .json({
                ListBarang: ListBarang ? ListBarang : [],
                msg: 'Barang list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan list Barang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan list Barang',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/barang/querylist
//// @desc    Post Barang querylist
//// @access  Private
router.post('/querylist', auth, async (req, res) => {
    // console.log('api/barang/querylist')
    // console.log(req.body)
    const NamaBarang = req.body.NamaBarang ? req.body.NamaBarang : []
    const JenisBarang = req.body.JenisBarang ? req.body.JenisBarang : []
    const Kepemilikan = req.body.Kepemilikan ? req.body.Kepemilikan : null
    const StokMin = req.body.StokMin ? req.body.StokMin : null
    const StokMax = req.body.StokMax ? req.body.StokMax : null
    const HargaModalMin = req.body.HargaModalMin ? req.body.HargaModalMin : null
    const HargaModalMax = req.body.HargaModalMax ? req.body.HargaModalMax : null
    const HargaJualMin = req.body.HargaJualMin ? req.body.HargaJualMin : null
    const HargaJualMax = req.body.HargaJualMax ? req.body.HargaJualMax : null
    const Ket = req.body.Ket ? req.body.Ket : null
    try {
        const BarangQuery = {}
        if (NamaBarang.length > 0) {
            const ListBarcode = NamaBarang.map(namabarang => namabarang.Barcode)
            Object.assign(BarangQuery, { Barcode: { $in: ListBarcode } })
        }

        if (JenisBarang.length > 0 || Kepemilikan) {
            if (Kepemilikan) {
                const ListKepemilikanJenisBarang = await Get_JenisBarang_List({ Kepemilikan: Kepemilikan })
                if (JenisBarang.length > 0) {
                    const ListNamaJenisBarang = JenisBarang.map(item => item.NamaJenisBarang)
                    const ListNamaKepemilikanJenisBarang = ListKepemilikanJenisBarang.map(item => item.NamaJenisBarang)

                    const InterSectionList = ListNamaJenisBarang.filter(item => ListNamaKepemilikanJenisBarang.includes(item))

                    // console.log('InterSectionList', InterSectionList)
                    if (InterSectionList.length > 0) {
                        Object.assign(BarangQuery, { Jenis: { $in: InterSectionList } })
                    } else {
                        Object.assign(BarangQuery, { Jenis: { $in: [] } })
                    }
                } else {
                    const ListNamaKepemilikanJenisBarang = ListKepemilikanJenisBarang.map(item => item.NamaJenisBarang)
                    Object.assign(BarangQuery, { Jenis: { $in: ListNamaKepemilikanJenisBarang } })
                }
            } else {
                const ListNamaJenisBarang = JenisBarang.map(item => item.NamaJenisBarang)
                Object.assign(BarangQuery, { Jenis: { $in: ListNamaJenisBarang } })
            }
        }

        if (StokMin || StokMax) {
            if (StokMin && StokMax) {
                Object.assign(BarangQuery, { Stok: { $gt: StokMin, $lt: StokMax } })
            } else if (StokMin) {
                Object.assign(BarangQuery, { Stok: { $gt: StokMin } })
            } else if (StokMax) {
                Object.assign(BarangQuery, { Stok: { $lt: StokMax } })
            }
        }

        if (HargaModalMin || HargaModalMax) {
            if (HargaModalMin && HargaModalMax) {
                Object.assign(BarangQuery, { HargaModal: { $gt: HargaModalMin, $lt: HargaModalMax } })
            } else if (HargaModalMin) {
                Object.assign(BarangQuery, { HargaModal: { $gt: HargaModalMin } })
            } else if (HargaModalMax) {
                Object.assign(BarangQuery, { HargaModal: { $lt: HargaModalMax } })
            }
        }

        if (HargaJualMin || HargaJualMax) {
            if (HargaJualMin && HargaJualMax) {
                Object.assign(BarangQuery, { HargaJual: { $gt: HargaJualMin, $lt: HargaJualMax } })
            } else if (HargaJualMin) {
                Object.assign(BarangQuery, { HargaJual: { $gt: HargaJualMin } })
            } else if (HargaJualMax) {
                Object.assign(BarangQuery, { HargaJual: { $lt: HargaJualMax } })
            }
        }

        if (Ket) {
            Object.assign(BarangQuery, { Ket: `/${Ket}/` })
        }

        // console.log('BarangQuery', BarangQuery)
        // const BarangSelect = '_id NamaJenisBarang Kepemilikan'
        const BarangSelect = null
        const QueryListBarang = await Get_Barang_List(BarangQuery, BarangSelect)

        // console.log('QueryListBarang', QueryListBarang)
        console.log('Barang querylist dipanggil')
        return res.status(200)
            .json({
                QueryListBarang: QueryListBarang ? QueryListBarang : [],
                msg: 'Barang querylist berhasil dipanggil'
            })


    } catch (err) {
        console.log(`Erorr saat pemanggilan Barang querylist => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Barang querylist',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/barang/jenisbaranglist/:id
//// @desc    Get Barang List base on JenisBarang
//// @access  Private
router.get('/jenisbaranglist/:id', auth, async (req, res) => {
    // console.log('jenisbaranglist/:id')
    try {
        const JenisBarangDetail = await JenisBarang.findById(req.params.id)
        if (!JenisBarang) {
            throw {
                msg: 'JenisBarang tidak dikenal',
            }
        }

        const ListBarang = await Get_Barang_List({ Jenis: JenisBarangDetail.NamaJenisBarang }, '-Ket -BarangPic -isDecimal -SatuanJual')

        console.log('Barang JenisBarang list dipanggil')
        return res.status(200)
            .json({
                ListBarang: ListBarang ? ListBarang : [],
                msg: 'Barang JenisBarang list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan list Barang JenisBarang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan list Barang JenisBarang',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/barang/detail/:id
//// @desc    Get Barang detail
//// @access  Private
router.get('/detail/:id', auth, async (req, res) => {
    // console.log('detail/:id')
    try {
        const barang = await Barang.findById(req.params.id)

        console.log('Barang detail dipanggil')
        return res.status(200)
            .json({
                barang: barang ? barang : null,
                msg: 'Barang detail berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan detail Barang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan detail Barang',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  Update api/barang/detail/:id/update
//// @desc    Update Barang
//// @access  Private
router.patch('/detail/:id/update', upload.single('BarangPic'), auth, async (req, res) => {
    // console.log('detail/:id/update')
    // console.log(req.body)
    const { Barcode } = req.body
    const UserId = req.user.id

    try {
        ////// cek data
        if (Barcode) {
            throw {
                msg: 'input yang anda masukkan tidak bisa diganti',
            }
        }

        ////// convert data input
        if (req.body.isDecimal) {
            if (req.body.isDecimal === 'true') {
                req.body.isDecimal = true
            } else if (req.body.isDecimal === 'false')
                req.body.isDecimal = false
        }
        if (req.body.SatuanJual) {
            const SatuanJual = []
            req.body.SatuanJual.forEach(element => {
                const objsatuanjual = JSON.parse(element)
                SatuanJual.push(objsatuanjual)
            })
            req.body.SatuanJual = SatuanJual
        }
        if (req.body.HargaJual) {
            req.body.SatuanJual[0].HargaJual = req.body.HargaJual
        }
        if (req.file) {
            req.body.BarangPic = req.file.path
        }
        const OldBarang = await Barang.findByIdAndUpdate(req.params.id, { $set: req.body })
        Add_to_History(UserId, null, 'Barang', 'Update', JSON.stringify(OldBarang), true)

        console.log('Barang updated')
        return res.status(200)
            .json({
                msg: 'Barang berhasil diupdate'
            })

    } catch (err) {
        console.log(`Erorr saat update Barang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Update Barang',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }

})

//// @router  Delete api/barang/detail/:id/delete
//// @desc    Delete Barang
//// @access  Private
router.delete('/detail/:id/delete', auth, async (req, res) => {
    // console.log('detail/:id/delete')
    const UserId = req.user.id
    try {
        const DeletedBarang = await Barang.findByIdAndDelete(req.params.id)

        Add_to_History(UserId, null, 'Barang', 'Delete', JSON.stringify(DeletedBarang), true)

        console.log(`Barang ${req.params.id} deleted`)
        return res.status(200)
            .json({
                msg: 'Barang berhasil didelete'
            })

    } catch (err) {
        console.log(`Erorr saat delete Barang => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses delete Barang',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/barang/export
//// @desc    Add Export Barang
//// @access  Private
router.post('/export', auth, async (req, res) => {
    // console.log('barang/export')
    // console.log(req.body)
    const UserId = req.user.id
    const RequestExportList = req.body.ExportData
    try {
        if (!RequestExportList.length > 0) {
            throw {
                msg: 'form tidak lengkap',
            }
        }
        const RequestList = RequestExportList.map(requestexportlist => requestexportlist._id)

        const ExportData = await Get_Barang_List({ _id: { $in: RequestList } }, null, true)
        // console.log('ExportData', JSON.stringify(ExportData[0]))

        const UserDetail = await Get_UserbyID(UserId)
        const Location = 'Barang'
        const ExcelFile = await Create_Excel_File(UserDetail.UserName, Location, ExportData, true)
        const filePath = path.join(__dirname, `../../../../downloads/${Location}/${ExcelFile}`)

        return res.download(filePath)
    } catch (err) {
        console.log(`Erorr saat pemanggilan Barang Export => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Barang Export',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/barang/import
//// @desc    Add Import new Barang
//// @access  Private
router.post('/import', auth, async (req, res) => {
    // console.log('barang/import')
    // console.log(req.body)
    const { ImportData } = req.body
    const UserId = req.user.id
    try {
        if ((!ImportData || !ImportData.length > 0)) {
            throw {
                msg: 'form tidak lengkap',
            }
        }
        const FixedImportData = []
        ////// recreate import data
        for (const element of ImportData) {
            if (FixedImportData.length > 0) {
                const ExistImportData = FixedImportData.find(item => item.Barcode.toString().toLocaleLowerCase() === element.Barcode.toString().toLocaleLowerCase())
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
        ////// cek if data struktur are correct
        for (const element of FixedImportData) {
            // console.log('SatuanJual', element.SatuanJual)
            const FixedImportData_SatuanJual = element.SatuanJual ? JSON.parse(element.SatuanJual) : []

            if (FixedImportData_SatuanJual.length > 0) {
                const newSatuanJual = []
                const DefaultSatuanJual = { NamaSatuan: 'satuan', MinBarang: 1, HargaJual: element.HargaJual ? element.HargaJual : 0 }
                newSatuanJual.push(DefaultSatuanJual)
                // console.log('newSatuanJual', newSatuanJual)
                for (const element_element of FixedImportData_SatuanJual) {
                    const newNamaSatuan = element_element.NamaSatuan ? element_element.NamaSatuan : null
                    const newMinBarang = element_element.MinBarang ? Number(element_element.MinBarang) : null
                    const newHargaJual = element_element.HargaJual ? Number(element_element.HargaJual) : null

                    if (newNamaSatuan || newMinBarang || newHargaJual) {
                        const newSatuan = { NamaSatuan: newNamaSatuan, MinBarang: newMinBarang, HargaJual: newHargaJual }
                        newSatuanJual.push(newSatuan)
                    } else {
                        throw {
                            msg: 'kesalahan input data satuan',
                        }
                    }
                }

                element.SatuanJual = newSatuanJual
                // console.log('SatuanJual', element.SatuanJual)

            }
            // console.log('SatuanJualAkhir', element.SatuanJual)
        }

        ////// cek data if data alredy exist in database
        for (const element of FixedImportData) {
            const ExistData = await Barang.findOne({ $or: [{ Barcode: element.Barcode.toString().toLocaleLowerCase() }, { Name: element.Name.toString().toLocaleLowerCase() }] })
            if (ExistData) {
                throw {
                    msg: `data Barang sudah ada = ${ExistData}`,
                }
            }
        }

        ////// add data to database
        for (const element of FixedImportData) {
            const newBarang = {
                Barcode: element.Barcode,
                Name: element.Name,
                Jenis: element.Jenis,
                Stok: element.Stok ? element.Stok : null,
                isDecimal: element.isDecimal ? element.isDecimal : null,
                HargaModal: element.HargaModal ? element.HargaModal : null,
                HargaJual: element.HargaJual ? element.HargaJual : null,
                SatuanJual: (element.SatuanJual && element.SatuanJual.length > 0) ? element.SatuanJual : null,
                Ket: element.Ket ? element.Ket : null,
            }

            // console.log('newBarang', newBarang)
            Add_Barang(newBarang)
            Add_to_History(UserId, null, 'Barang', 'Import/Add', JSON.stringify(newBarang), true)
        }
        console.log('Barang Import Berhasil')
        return res.status(200)
            .json({
                msg: 'Proses Import Barang Berhasil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan Barang Import => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Barang Import',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

module.exports = router