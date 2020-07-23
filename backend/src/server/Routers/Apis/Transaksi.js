const express = require('express')
const router = express.Router()
const path = require('path')

const auth = require('../Middleware/auth')

const { Get_Transaksi_List, Add_Transaksi_Belanja, Add_Transaksi_Transaksi } = require('./Functions/functions.Transaksi')
const { Get_Barang_List } = require('./Functions/functions.Barang')
const { Get_UserbyID } = require('./Functions/functions.User')
const { Add_to_History } = require('./Functions/functions.History')
const { Create_Excel_File } = require('./Functions/functions.functions')

const Transaksi = require('../../Models/Transaksi')
const Barang = require('../../Models/Barang')

//// @router  GET api/transaksi/list
//// @desc    Get Transaksi transaksi List
//// @access  Private
router.get('/list', auth, (req, res) => {
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()
    const yyyy = date.getFullYear()
    const currentdate = new Date(yyyy, mm, dd)
    const nextdate = new Date(yyyy, mm, dd + 1)
    Transaksi.find()
        .where('TanggalTransaksi').gt(currentdate).lt(nextdate)
        .select('_id NamaKasir TanggalTransaksi Tipe TotalPembayaran')
        .sort({ TanggalTransaksi: -1 })
        .then((ListTransaksi) => {
            console.log('Transaksi list dipanggil')
            res.status(200).json({ ListTransaksi, msg: 'Transaksi list berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan list Transaksi => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list Transaksi', errorDetail: err })
        })
})

//// @router  Post api/transaksi/querylist
//// @desc    Post Transaksi query transaksi List
//// @access  Private
router.post('/querylist', auth, (req, res) => {
    console.log('querylist', req.body)
    const TransaksiID = req.body.TransaksiID ? req.body.TransaksiID : null
    const UserName = req.body.UserName ? req.body.UserName : null
    const Jenis = req.body.Jenis ? req.body.Jenis : null
    const DateMin = req.body.DateMin ? req.body.DateMin : null
    const DateMax = req.body.DateMax ? req.body.DateMax : null
    const DiskonMin = req.body.DiskonMin ? req.body.DiskonMin : null
    const DiskonMax = req.body.DiskonMax ? req.body.DiskonMax : null
    const PotonganHargaMin = req.body.PotonganHargaMin ? req.body.PotonganHargaMin : null
    const PotonganHargaMax = req.body.PotonganHargaMax ? req.body.PotonganHargaMax : null
    const TotalTransaksiMin = req.body.TotalTransaksiMin ? req.body.TotalTransaksiMin : null
    const TotalTransaksiMax = req.body.TotalTransaksiMax ? req.body.TotalTransaksiMax : null
    const Ket = req.body.Ket ? req.body.Ket : null
    const TransaksiQueryQueryList = {}
    if (TransaksiID) {
        Object.assign(TransaksiQueryQueryList, { _id: TransaksiID })
    }
    if (UserName) {
        Object.assign(TransaksiQueryQueryList, { NamaKasir: UserName })
    }
    if (Jenis) {
        Object.assign(TransaksiQueryQueryList, { Tipe: Jenis })
    }
    if (DateMin || DateMax) {
        if (DateMin && DateMax) {
            Object.assign(TransaksiQueryQueryList, { TanggalTransaksi: { $gt: DateMin, $lt: DateMax } })
        } else if (DateMin) {
            Object.assign(TransaksiQueryQueryList, { TanggalTransaksi: { $gt: DateMin } })
        } else if (DateMax) {
            Object.assign(TransaksiQueryQueryList, { TanggalTransaksi: { $lt: DateMax } })
        }
    }
    if (DiskonMin || DiskonMax) {
        if (DiskonMin && DiskonMax) {
            Object.assign(TransaksiQueryQueryList, { Diskon: { $gt: DiskonMin, $lt: DiskonMax } })
        } else if (DiskonMin) {
            Object.assign(TransaksiQueryQueryList, { Diskon: { $gt: DiskonMin } })
        } else if (DiskonMax) {
            Object.assign(TransaksiQueryQueryList, { Diskon: { $lt: DiskonMax } })
        }
    }
    if (PotonganHargaMin || PotonganHargaMax) {
        if (PotonganHargaMin && PotonganHargaMax) {
            Object.assign(TransaksiQueryQueryList, { PotonganHarga: { $gt: PotonganHargaMin, $lt: PotonganHargaMax } })
        } else if (PotonganHargaMin) {
            Object.assign(TransaksiQueryQueryList, { PotonganHarga: { $gt: PotonganHargaMin } })
        } else if (PotonganHargaMax) {
            Object.assign(TransaksiQueryQueryList, { PotonganHarga: { $lt: PotonganHargaMax } })
        }
    }
    if (TotalTransaksiMin || TotalTransaksiMax) {
        if (TotalTransaksiMin && TotalTransaksiMax) {
            Object.assign(TransaksiQueryQueryList, { TotalPembayaran: { $gt: TotalTransaksiMin, $lt: TotalTransaksiMax } })
        } else if (TotalTransaksiMin) {
            Object.assign(TransaksiQueryQueryList, { TotalPembayaran: { $gt: TotalTransaksiMin } })
        } else if (TotalTransaksiMax) {
            Object.assign(TransaksiQueryQueryList, { TotalPembayaran: { $lt: TotalTransaksiMax } })
        }
    }
    if (Ket) {
        Object.assign(TransaksiQueryQueryList, { Ket: `/${Ket}/` })
    }
    console.log(TransaksiQueryQueryList)
    Transaksi.find(TransaksiQueryQueryList)
        .select('_id NamaKasir TanggalTransaksi Tipe TotalPembayaran')
        .sort({ TanggalTransaksi: -1 })
        .then((ListTransaksi) => {
            console.log('Transaksi querylist dipanggil')
            res.status(200).json({ ListTransaksi, msg: 'Transaksi querylist berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan querylist Transaksi => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan querylist Transaksi', errorDetail: err })
        })
})

// //// @router  GET api/transaksi/transaksi/list
// //// @desc    Get Transaksi transaksi List
// //// @access  Private
// router.get('/transaksi/list', auth, (req, res) => {
//     Transaksi.find(Tipe = 'Transaksi')
//         .select('_id NamaKasir TanggalTransaksi')
//         .then((ListTransaksi) => {
//             console.log('Transaksi Transaksi list dipanggil')
//             res.status(200).json({ ListTransaksi, msg: 'Transaksi Transaksi list berhasil dipanggil' })
//         })
//         .catch(err => {
//             console.log(`Erorr saat pemanggilan list Transaksi Transaksi => ${err}`)
//             res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list Transaksi Transaksi', errorDetail: err })
//         })
// })

// //// @router  GET api/transaksi/belanja/list
// //// @desc    Get Transaksi belanja List
// //// @access  Private
// router.get('/belanja/list', auth, (req, res) => {
//     Transaksi.find(Tipe = 'Belanja')
//         .select('_id NamaKasir TanggalTransaksi')
//         .then((ListTransaksi) => {
//             console.log('Transaksi Belanja list dipanggil')
//             res.status(200).json({ ListTransaksi, msg: 'Transaksi Belanja list berhasil dipanggil' })
//         })
//         .catch(err => {
//             console.log(`Erorr saat pemanggilan list Transaksi Belanja => ${err}`)
//             res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list Transaksi Belanja', errorDetail: err })
//         })
// })

//// @router  GET api/transaksi/detail/:id
//// @desc    Get Transaksi detail
//// @access  Private
router.get('/detail/:id', auth, (req, res) => {
    Transaksi.findById(req.params.id)
        .then((transaksi) => {
            console.log(`Transaksi detail dipanggil = ${req.params.id}`)
            res.status(200).json({ transaksi, msg: 'Transaksi detail berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan detail Transaksi => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan detail Transaksi', errorDetail: err })
        })
})

// function Ceck_Len(req, res, next) {
//     console.log('1')
//     console.log(req)
//     const data = req
//     const kkn = req
//     if ((!data) || (!kkn)) {
//         console.log(2)
//         return res.status(400).json({ msg: 'data yang dikirimkan kurang' })
//         // return {
//         //     status: 400,
//         //     msg: 'data yang dikirimkan kurang'
//         // }
//     } else {
//         if (data >= kkn) {
//             return true
//         } else {
//             return false
//         }
//     }
// }

// //// @router  POST api/transaksi/coba
// //// @desc    Add new Transaksi transaksi
// //// @access  Private
// router.post('/coba', (req, res) => {
//     const { Len } = req.body
//     const kkn = 80
//     function Ceck_Len(Len, KKN) {
//         if (!Len || !KKN) {
//             return res.status(400).json({ msg: 'data yang dikirimkan kurang' })
//         } else {
//             if (Len >= kkn) {
//                 return true
//             }
//         }
//     }
//     const Hasil = Ceck_Len(Len, kkn)
//     if (Hasil === true || Hasil === 'true') {
//         return res.status(200).json({ msg: 'anda lulus' })
//         // return Hasil
//     } else if (Hasil === false || Hasil === 'false') {
//         return res.status(200).json({ msg: 'anda belum lulus' })
//         // return Hasil
//     } else {
//         return Hasil
//     }
// })
//// @router  POST api/transaksi/transaksi/tambah
//// @desc    Add new Transaksi transaksi
//// @access  Private
router.post('/transaksi/tambah', auth, (req, res) => {
    // console.log('transaksi/tambah', req.body)
    // const { NamaKasir, DetailTransaksi, Diskon } = req.body
    const { NamaKasir, DetailTransaksi } = req.body
    // if (Diskon === 100 || Diskon === '100') {
    //     req.body.TotalPembayaran = 1
    // }
    // if ((!NamaKasir) || (!DetailTransaksi) || (!req.body.TotalPembayaran)) {
    if ((!NamaKasir) || (!DetailTransaksi)) {
        return res.status(400).json({ msg: 'data yang dikirimkan kurang' })
    }

    // const transaksibarcodes = DetailTransaksi.map((item) => {
    //     return item.Barcode
    // })
    // const isDuplicateBarcode = transaksibarcodes.some((item, idx) => {
    //     return transaksibarcodes.indexOf(item) != idx
    // })
    const TransaksiBarang = []
    DetailTransaksi.forEach(detailtransaksi => {
        if (TransaksiBarang.length >= 1) {
            const TransaksiBarangIndex = TransaksiBarang.findIndex(transaksibarang => transaksibarang.Barcode === detailtransaksi.Barcode)
            if (TransaksiBarangIndex >= 0) {
                TransaksiBarang[TransaksiBarangIndex].TotalBarang = TransaksiBarang[TransaksiBarangIndex].TotalBarang + detailtransaksi.TotalBarang
            } else {
                const newTransaksiBarang = { Barcode: detailtransaksi.Barcode, TotalBarang: detailtransaksi.TotalBarang }
                TransaksiBarang.push(newTransaksiBarang)
            }
        } else {
            const newTransaksiBarang = { Barcode: detailtransaksi.Barcode, TotalBarang: detailtransaksi.TotalBarang }
            TransaksiBarang.push(newTransaksiBarang)
        }
    })
    // console.log('TransaksiBarang', TransaksiBarang)

    // DetailTransaksi.forEach((data, index) => {
    TransaksiBarang.forEach((data, index) => {
        Barang.findOne({ Barcode: data.Barcode })
            .then((barang) => {
                if (!barang) {
                    req.body.DetailTransaksi = null
                    // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                    return res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
                }
                if (barang.Stok < data.TotalBarang) {
                    // console.log(1)
                    // console.log('Stok', barang.Stok)
                    // console.log('TotalBarang', data.TotalBarang)
                    req.body.DetailTransaksi = null
                    // throw Error(`stok barang tidak mencukupi barcode=${data.Barcode}`)
                    return res.status(400).json({ msg: `stok barang tidak mencukupi barcode=${data.Barcode}` })
                    // kemungkinan error karna pengiriman lebih dari satu respon (array tidak berhenti ketika ada error) solusi hapus res.jsno
                }
                // if (isDuplicateBarcode === true) {
                //     let jumlahitembarcode = 0
                //     DetailTransaksi.forEach((trans, indx) => {
                //         if (data.Barcode === trans.Barcode) {
                //             jumlahitembarcode = jumlahitembarcode + trans.TotalBarang
                //         }
                //     })
                //     if (barang.Stok < jumlahitembarcode) {
                //         console.log('asd')
                //         req.body.DetailTransaksi = null
                //         return res.status(400).json({ msg: `stok barang tidak mencukupi barcode=${data.Barcode}` })
                //     }
                // } else {
                //     if (barang.Stok < data.TotalBarang) {
                //         console.log(2)
                //         req.body.DetailTransaksi = null
                //         return res.status(400).json({ msg: `stok barang tidak mencukupi barcode=${data.Barcode}` })
                //     }
                // }
                if (index === TransaksiBarang.length - 1) {
                    TransaksiBarang.forEach((item, hitungan) => {
                        Barang.findByIdAndUpdate(item.Id, {
                            $inc: { Stok: -item.TotalBarang }
                        })
                            .then(() => {
                                if (hitungan === TransaksiBarang.length - 1) {
                                    const newTransaksi = new Transaksi({
                                        NamaKasir: req.body.NamaKasir,
                                        Tipe: 'Transaksi',
                                        DetailTransaksi: req.body.DetailTransaksi,
                                        Diskon: req.body.Diskon ? req.body.Diskon : 0,
                                        PotonganHarga: req.body.PotonganHarga ? req.body.PotonganHarga : 0,
                                        TotalPembayaran: req.body.TotalPembayaran,
                                        Ket: req.body.Ket ? req.body.Ket : null
                                    })
                                    // console.log('newTransaksi', req.body.DetailTransaksi)
                                    // console.log('newTransaksi100', newTransaksi)

                                    newTransaksi.save()
                                        .then((newtransaksi) => {
                                            console.log(`Transaksi Transaksi ditambah = ${newtransaksi._id}`)
                                            console.log(`Transaksi Transaksi = ${newtransaksi}`)
                                            res.status(200).json({ msg: 'Transaksi Transaksi  berhasil ditambah' })
                                        })
                                        .catch(err => {
                                            console.log(`Erorr saat penambahan Transaksi Transaksi => ${err}`)
                                            res.status(500).json({ msg: 'ada kesalahan pada proses penambahan Transaksi Transaksi', errorDetail: err })
                                        })
                                }
                            })
                            .catch(err => {
                                req.body.DetailTransaksi = null
                                // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                                console.log(`Erorr saat Transaksi Transaksi update Barang ${data.Barcode} => ${err}`)
                                return res.status(500).json({ msg: 'ada kesalahan pada proses Transaksi Transaksi Update Barang', errorDetail: err })
                            })

                    })
                }
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ msg: 'ada kesalahan pada data yang dikirim', errorDetail: err })
            })
    })
})

//// @router  POST api/transaksi/belanja/tambah
//// @desc    Add new Transaksi belanja
//// @access  Private
router.post('/belanja/tambah', auth, (req, res) => {
    // console.log('belanja/tambah', req.body)
    const { NamaKasir, DetailTransaksi, TotalPembayaran } = req.body
    if ((!NamaKasir) || (!DetailTransaksi) || (!TotalPembayaran)) {
        return res.status(400).json({ msg: 'data yang dikirimkan kurang' })
    }

    DetailTransaksi.forEach(data => {
        if (data.HargaModal === 0 || data.HargaJual === 0 || data.Jumlah <= 0) {
            req.body.DetailTransaksi = null
            return res.status(400).json({ msg: 'HargaModal, HargaJual atau Jumlah tidak boleh 0 atau kurang' })
        }
    })

    DetailTransaksi.forEach((data, index) => {
        Barang.findOne({ Barcode: data.Barcode })
            .then((barang) => {
                if (!barang) {
                    ////// cek apakah barang tidak ada
                    req.body.DetailTransaksi = null
                    // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                    return res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
                }
                if (index === DetailTransaksi.length - 1) {
                    DetailTransaksi.forEach((item, hitungan) => {
                        ////// proses update barang
                        Barang.update({ // findByIdAndUpdate
                            _id: item.Id,
                            "SatuanJual.NamaSatuan": "satuan"
                        }, {
                            $set: {
                                HargaModal: item.HargaModal,
                                HargaJual: item.HargaJual,
                                "SatuanJual.$.HargaJual": item.HargaJual
                            },
                            $inc: {
                                Stok: item.Jumlah
                            }
                        })
                            .then(() => {
                                if (hitungan === DetailTransaksi.length - 1) {
                                    ////// proses pencatatan transaksi
                                    const newTransaksi = new Transaksi({
                                        NamaKasir: req.body.NamaKasir,
                                        Tipe: 'Belanja',
                                        DetailTransaksi: req.body.DetailTransaksi,
                                        TotalPembayaran: req.body.TotalPembayaran,
                                        Ket: req.body.Ket ? req.body.Ket : null
                                    })
                                    // console.log('newTransaksi', req.body.DetailTransaksi)
                                    // console.log('newTransaksi100', newTransaksi)

                                    newTransaksi.save()
                                        .then((newtransaksi) => {
                                            console.log(`Transaksi Belanja ditambah = ${newtransaksi._id}`)
                                            console.log(`Transaksi Belanja = ${newtransaksi}`)
                                            res.status(200).json({ msg: 'Transaksi Belanja  berhasil ditambah' })
                                        })
                                        .catch(err => {
                                            console.log(`Erorr saat penambahan Transaksi Belanja => ${err}`)
                                            res.status(500).json({ msg: 'ada kesalahan pada proses penambahan Transaksi Belanja', errorDetail: err })
                                        })
                                }
                            })
                            .catch(err => {
                                ////// proses catch update barang
                                req.body.DetailTransaksi = null
                                // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                                console.log(`Erorr saat Transaksi Belanja update Barang ${data.Barcode} => ${err}`)
                                return res.status(500).json({ msg: 'ada kesalahan pada proses Transaksi Belanja Update Barang', errorDetail: err })
                            })

                    })
                }
            })

    })
})

//// @router  POST api/transaksi/export
//// @desc    Add Export Transaksi
//// @access  Private
router.post('/export', auth, async (req, res) => {
    // console.log('transaksi/export')
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

        const ExportData = await Get_Transaksi_List({ _id: { $in: RequestList } }, null, true)
        // console.log('ExportData', JSON.stringify(ExportData[0]))

        const UserDetail = await Get_UserbyID(UserId)
        const Location = 'Transaksi'
        const ExcelFile = await Create_Excel_File(UserDetail.UserName, Location, ExportData, true)
        const filePath = path.join(__dirname, `../../../../downloads/${Location}/${ExcelFile}`)

        return res.download(filePath)
    } catch (err) {
        console.log(`Erorr saat pemanggilan Transaksi Export => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Transaksi Export',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/transaksi/import
//// @desc    Add Import new Transaksi
//// @access  Private
router.post('/import', auth, async (req, res) => {
    // console.log('transaksi/import')
    // console.log(req.body)
    const { ImportData } = req.body
    const UserId = req.user.id
    try {
        if ((!ImportData || ImportData.length < 1)) {
            throw {
                msg: 'form tidak lengkap',
            }
        }
        const FixedImportData = (ImportData && ImportData.length > 0) ? ImportData : []

        ////// cek if data struktur are correct
        const ListBarang = await Get_Barang_List(null, null, true)
        const ListBarang_Barcode = ListBarang ? ListBarang.map(item => item.Barcode) : []
        for (const element of FixedImportData) {
            const FixedImportData_NamaKasir = element.NamaKasir
            const FixedImportData_Tipe = element.Tipe
            const FixedImportData_DetailTransaksi = element.DetailTransaksi ? JSON.parse(element.DetailTransaksi) : []
            const FixedImportData_TotalPembayaran = element.TotalPembayaran

            if (!FixedImportData_NamaKasir || !FixedImportData_Tipe || FixedImportData_DetailTransaksi.length < 1 || FixedImportData_TotalPembayaran <= 0) {
                throw {
                    msg: `data struktur tidak lengkap, ${JSON.stringify(FixedImportData)}`,
                }
            }

            const FixedDetailTransaksi = []
            for (const element_element of FixedImportData_DetailTransaksi) {
                if (FixedImportData_Tipe === 'Belanja') {
                    const Belanja_Barcode = element_element.Barcode ? element_element.Barcode : null
                    const Belanja_Jumlah = element_element.Jumlah ? element_element.Jumlah : 0
                    const Belanja_HargaModal = element_element.HargaModal ? element_element.HargaModal : 0
                    const Belanja_HargaJual = element_element.HargaJual ? element_element.HargaJual : 0
                    if (!Belanja_Barcode || Belanja_Jumlah < 1 || Belanja_HargaModal < 1 || Belanja_HargaJual < 1) {
                        throw {
                            msg: `data struktur detail transaksi tidak lengkap, ${JSON.stringify(FixedImportData_DetailTransaksi)}`,
                        }
                    }
                    const isBarangExist = ListBarang_Barcode.includes(Belanja_Barcode)
                    if (!isBarangExist) {
                        // console.log('Belanja_Barcode', Belanja_Barcode)
                        throw {
                            msg: `barang di stuktur detail tidak dikenali, ${Belanja_Barcode}`,
                        }
                    }
                    const Belanja_Id = element_element.Id ? element_element.Id : null
                    const Belanja_NamaBarang = element_element.NamaBarang ? element_element.NamaBarang : null
                    if (!Belanja_Id || !Belanja_NamaBarang) {
                        const DetailBarang = await Barang.findOne({ Barcode: Belanja_Barcode })
                        if (DetailBarang) {
                            const newBarangId = Belanja_Id ? Belanja_Id : DetailBarang._id
                            const newBarangName = Belanja_NamaBarang ? Belanja_NamaBarang : DetailBarang.Name
                            const newDetailTransaksi = {
                                Id: newBarangId,
                                Barcode: Belanja_Barcode,
                                NamaBarang: newBarangName,
                                Jumlah: Belanja_Jumlah,
                                HargaModal: Belanja_HargaModal,
                                HargaJual: Belanja_HargaJual,
                                TotalModal: Belanja_Jumlah * Belanja_HargaModal
                            }
                            FixedDetailTransaksi.push(newDetailTransaksi)
                        } else {
                            throw {
                                msg: `barang input salah, ${Belanja_Barcode}`,
                            }
                        }
                    } else {
                        const newDetailTransaksi = {
                            Id: Belanja_Id,
                            Barcode: Belanja_Barcode,
                            NamaBarang: Belanja_NamaBarang,
                            Jumlah: Belanja_Jumlah,
                            HargaModal: Belanja_HargaModal,
                            HargaJual: Belanja_HargaJual,
                            TotalModal: Belanja_Jumlah * Belanja_HargaModal
                        }
                        FixedDetailTransaksi.push(newDetailTransaksi)
                    }
                } else if (FixedImportData_Tipe === 'Transaksi') {
                    for (const element_element of FixedImportData_DetailTransaksi) {
                        const Transaksi_Barcode = element_element.Barcode ? element_element.Barcode : null
                        const Transaksi_Jumlah = element_element.Jumlah ? element_element.Jumlah : 0
                        const Transaksi_Satuan = element_element.Satuan ? element_element.Satuan : null

                        if (!Transaksi_Barcode || Transaksi_Jumlah < 1 || !Transaksi_Satuan) {
                            throw {
                                msg: `data struktur detail transaksi tidak lengkap, ${JSON.stringify(FixedImportData_DetailTransaksi)}`,
                            }
                        }
                        const isBarangExist = ListBarang_Barcode.includes(Transaksi_Barcode)
                        if (!isBarangExist) {
                            // console.log('Transaksi_Barcode', Transaksi_Barcode)
                            throw {
                                msg: `barang di stuktur detail tidak dikenali, ${Transaksi_Barcode}`,
                            }
                        }
                        const Transaksi_Id = element_element.Id ? element_element.Id : null
                        const Transaksi_NamaBarang = element_element.NamaBarang ? element_element.NamaBarang : null
                        const Transaksi_HargaSatuan = element_element.HargaSatuan ? element_element.HargaSatuan : 0
                        const Transaksi_TotalBarang = element_element.TotalBarang ? element_element.TotalBarang : 0
                        if (!Transaksi_Id || !Transaksi_NamaBarang || (Transaksi_HargaSatuan < 1 || Transaksi_TotalBarang < 1)) {
                            const DetailBarang = await Barang.findOne({ Barcode: Transaksi_Barcode })
                            if (DetailBarang) {
                                const newTransaksiId = Transaksi_Id ? Transaksi_Id : DetailBarang._id
                                const newTransaksiNamaBarang = Transaksi_NamaBarang ? Transaksi_NamaBarang : DetailBarang.Name
                                if (Transaksi_HargaSatuan < 1 || Transaksi_TotalBarang < 1) {
                                    const SatuanJual = DetailBarang.SatuanJual
                                    const SatuanDetail = SatuanJual.find(item => Transaksi_Satuan === item.NamaSatuan)
                                    if (!SatuanDetail) {
                                        throw {
                                            msg: `satuan jual input salah/tidak ditemukan, ${Transaksi_Barcode}`,
                                        }
                                    } else {
                                        const newTransaksiHargaSatuan = Transaksi_HargaSatuan ? Transaksi_HargaSatuan : SatuanDetail.HargaJual
                                        const newTransaksiTotalBarang = Transaksi_TotalBarang ? Transaksi_TotalBarang : SatuanDetail.MinBarang * Transaksi_Jumlah

                                        const newDetailTransaksi = {
                                            Id: newTransaksiId,
                                            Barcode: Transaksi_Barcode,
                                            NamaBarang: newTransaksiNamaBarang,
                                            Satuan: Transaksi_Satuan,
                                            Jumlah: Transaksi_Jumlah,
                                            HargaSatuan: newTransaksiHargaSatuan,
                                            TotalBarang: newTransaksiTotalBarang,
                                            HargaTotal: newTransaksiHargaSatuan * newTransaksiTotalBarang,
                                        }
                                        FixedDetailTransaksi.push(newDetailTransaksi)
                                    }
                                } else {
                                    const newDetailTransaksi = {
                                        Id: newTransaksiId,
                                        Barcode: Transaksi_Barcode,
                                        NamaBarang: newTransaksiNamaBarang,
                                        Satuan: Transaksi_Satuan,
                                        Jumlah: Transaksi_Jumlah,
                                        HargaSatuan: Transaksi_HargaSatuan,
                                        TotalBarang: Transaksi_TotalBarang,
                                        HargaTotal: Transaksi_HargaSatuan * Transaksi_TotalBarang,
                                    }
                                    FixedDetailTransaksi.push(newDetailTransaksi)
                                }
                            } else {
                                throw {
                                    msg: `barang input salah, ${Transaksi_Barcode}`,
                                }
                            }
                        } else {
                            const newDetailTransaksi = {
                                Id: Transaksi_Id,
                                Barcode: Transaksi_Barcode,
                                NamaBarang: Transaksi_NamaBarang,
                                Satuan: Transaksi_Satuan,
                                Jumlah: Transaksi_Jumlah,
                                HargaSatuan: Transaksi_HargaSatuan,
                                TotalBarang: Transaksi_TotalBarang,
                                HargaTotal: Transaksi_HargaSatuan * Transaksi_TotalBarang,
                            }
                            FixedDetailTransaksi.push(newDetailTransaksi)
                        }
                    }
                } else {
                    console.log('tipe tidak sesuai')
                }
            }
            element.DetailTransaksi = FixedDetailTransaksi
        }

        // ////// cek data if data alredy exist in database
        // for (const element of FixedImportData) {
        //     const newId = element._id ? element._id : null
        //     if (newId) {
        //         const ExistData = await Transaksi.findOne({ _id: newId })
        //         if (ExistData) {
        //             throw {
        //                 msg: `Id ganda = ${newId}`,
        //             }
        //         }
        //     }
        // }

        ////// add data to database
        for (const element of FixedImportData) {
            const NamaKasir = element.NamaKasir
            const TanggalTransaksi = element.TanggalTransaksi ? element.TanggalTransaksi : null
            const Tipe = element.Tipe
            const DetailTransaksi = element.DetailTransaksi
            const Diskon = element.Diskon ? element.Diskon : null
            const PotonganHarga = element.PotonganHarga ? element.PotonganHarga : null
            const TotalPembayaran = element.TotalPembayaran
            const Ket = element.Ket ? element.Ket : null

            const newTransaksi = {
                NamaKasir: NamaKasir,
                TanggalTransaksi: TanggalTransaksi,
                Tipe: Tipe,
                DetailTransaksi: DetailTransaksi,
                Diskon: Diskon,
                PotonganHarga: PotonganHarga,
                TotalPembayaran: TotalPembayaran,
                Ket: Ket,
            }

            // console.log('newTransaksi', newTransaksi)

            if (Tipe === 'Belanja') {
                Add_Transaksi_Belanja(newTransaksi, UserId)
                // Add_to_History(UserId, null, 'Barang/Transaksi/Belanja', 'Belanja/Update', JSON.stringify(newTransaksi), true)
                Add_to_History(UserId, null, 'Transaksi/Belanja', 'Import/Add', JSON.stringify(newTransaksi), true)
            } else if (Tipe === 'Transaksi') {
                Add_Transaksi_Transaksi(newTransaksi, UserId)
                // Add_to_History(UserId, null, 'Barang/Transaksi/Transaksi', 'Transaksi/Update', JSON.stringify(newTransaksi), true)
                Add_to_History(UserId, null, 'Transaksi/Transaksi', 'Import/Add', JSON.stringify(newTransaksi), true)
            } else {
                console.log('tipe tidak sesuai')
            }


        }
        console.log('Transaksi Import Berhasil')
        return res.status(200)
            .json({
                msg: 'Proses Transaksi Barang Berhasil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan Transaksi Import => ${err.errorDetail ? JSON.stringify(err.errorDetail) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Transaksi Import',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})


module.exports = router