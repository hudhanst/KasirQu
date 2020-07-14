const express = require('express')
const router = express.Router()

const auth = require('../Middleware/auth')

const Transaksi = require('../../Models/Transaksi')
const Barang = require('../../Models/Barang')

//// @router  GET api/transaksi/list
//// @desc    Get Transaksi transaksi List
//// @access  Private
router.get('/list', auth, (req, res) => {
    const date = new Date()
    const dd = date.getUTCDate()
    const mm = date.getUTCMonth()
    const yyyy = date.getUTCFullYear()
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

module.exports = router