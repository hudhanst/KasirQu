const express = require('express')
const router = express.Router()

const auth = require('../Middleware/auth')

const Transaksi = require('../../Models/Transaksi')
const Barang = require('../../Models/Barang')

//// @router  GET api/transaksi/list
//// @desc    Get Transaksi transaksi List
//// @access  Private
router.get('/list', auth, (req, res) => {
    // const date = new Date()
    // const currentdate = date.toDateString()
    // const costumdate = new Date(2020, 2, 20)
    // console.log(costumdate)
    // console.log(costumdate.toISOString())
    // console.log(currentdate)
    Transaksi.find()
        // .where('NamaKasir').equals('superuser')
        // .where('TanggalTransaksi').equals(currentdate)
        .select('_id NamaKasir TanggalTransaksi Tipe TotalPembayaran')
        .then((ListTransaksi) => {
            console.log('Transaksi list dipanggil')
            res.status(200).json({ ListTransaksi, msg: 'Transaksi list berhasil dipanggil' })
        })
        .catch(err => {
            console.log(`Erorr saat pemanggilan list Transaksi => ${err}`)
            res.status(404).json({ msg: 'ada kesalahan pada proses pemanggilan list Transaksi', errorDetail: err })
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
    const { NamaKasir, DetailTransaksi, Diskon } = req.body
    if (Diskon === 100 || Diskon === '100') {
        req.body.TotalPembayaran = 1
    }
    if ((!NamaKasir) || (!DetailTransaksi) || (!req.body.TotalPembayaran)) {
        return res.status(400).json({ msg: 'data yang dikirimkan kurang' })
    }

    const transaksibarcodes = DetailTransaksi.map((item) => {
        return item.Barcode
    })
    const isDuplicateBarcode = transaksibarcodes.some((item, idx) => {
        return transaksibarcodes.indexOf(item) != idx
    })

    DetailTransaksi.forEach((data, index) => {
        Barang.findOne({ Barcode: data.Barcode })
            .then((barang) => {
                if (!barang) {
                    req.body.DetailTransaksi = null
                    // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                    return res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
                }
                if (isDuplicateBarcode == true) {
                    let jumlahitembarcode = 0
                    DetailTransaksi.forEach((trans, indx) => {
                        if (data.Barcode === trans.Barcode) {
                            jumlahitembarcode = jumlahitembarcode + trans.Jumlah
                        }
                    })
                    if (barang.Stok < jumlahitembarcode) {
                        req.body.DetailTransaksi = null
                        return res.status(400).json({ msg: `stok barang tidak mencukupi barcode=${data.Barcode}` })
                    }
                } else {
                    if (barang.Stok < data.Jumlah) {
                        req.body.DetailTransaksi = null
                        return res.status(400).json({ msg: `stok barang tidak mencukupi barcode=${data.Barcode}` })
                    }
                }
                if (index === DetailTransaksi.length - 1) {
                    DetailTransaksi.forEach((item, hitungan) => {
                        Barang.findByIdAndUpdate(item.Id, {
                            $inc: { Stok: -item.Jumlah }
                        })
                            .then(() => {
                                if (hitungan === DetailTransaksi.length - 1) {
                                    const newTransaksi = new Transaksi({
                                        NamaKasir: req.body.NamaKasir,
                                        Tipe: 'Transaksi',
                                        DetailTransaksi: req.body.DetailTransaksi,
                                        TotalPembayaran: req.body.TotalPembayaran,
                                        Diskon: req.body.Diskon ? req.body.Diskon : null,
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
                    req.body.DetailTransaksi = null
                    // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                    return res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
                }
                if (index === DetailTransaksi.length - 1) {
                    DetailTransaksi.forEach((item, hitungan) => {
                        Barang.findByIdAndUpdate(item.Id, {
                            $set: { HargaModal: item.HargaModal, HargaJual: item.HargaJual },
                            $inc: { Stok: item.Jumlah }
                        })
                            .then(() => {
                                if (hitungan === DetailTransaksi.length - 1) {
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
                                req.body.DetailTransaksi = null
                                // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
                                console.log(`Erorr saat Transaksi Belanja update Barang ${data.Barcode} => ${err}`)
                                return res.status(500).json({ msg: 'ada kesalahan pada proses Transaksi Belanja Update Barang', errorDetail: err })
                            })

                    })
                }
            })

    })

    // DetailTransaksi.forEach((data) => {
    //     Barang.findOne({ Barcode: data.Barcode }, (err, barang) => {
    //         if ((err) || (!barang)) {
    //             req.body.DetailTransaksi = null
    //             console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
    //             throw res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
    //             // return res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
    //         }
    //     })

    //     // Barang.findOne({ Barcode: data.Barcode })
    //     //     .then((barang) => {
    //     //         if (!barang) {
    //     //             req.body.DetailTransaksi = null
    //     //             // console.log('req.body.DetailTransaksi', req.body.DetailTransaksi)
    //     //             return res.status(400).json({ msg: `barang yang dimasukkan tidak ditemukan barcode=${data.Barcode}` })
    //     //         }
    //     //     })
    // })

    // DetailTransaksi.forEach(data => {
    //     Barang.findByIdAndUpdate(data.Id, {
    //         $set: { HargaModal: data.HargaModal, HargaJual: data.HargaJual },
    //         $inc: { Stok: data.Jumlah }
    //     })
    //         .catch(err => {
    //             console.log(`Erorr saat Transaksi update Barang ${data.Barcode} => ${err}`)
    //             return res.status(500).json({ msg: 'ada kesalahan pada proses Transaksi Update Barang', errorDetail: err })
    //         })
    // })
    // console.log('asd', req.body.DetailTransaksi)

    // const newTransaksi = new Transaksi({
    //     NamaKasir: req.body.NamaKasir,
    //     Tipe: 'Belanja',
    //     DetailTransaksi: req.body.DetailTransaksi,
    //     TotalPembayaran: req.body.TotalPembayaran,
    //     Ket: req.body.Ket ? req.body.Ket : null
    // })
    // // console.log('asd111', req.body.DetailTransaksi)

    // newTransaksi.save()
    //     .then((newtransaksi) => {
    //         console.log(`Transaksi Belanja ditambah = ${newtransaksi._id}`)
    //         console.log(`Transaksi Belanja = ${newtransaksi}`)
    //         res.status(200).json({ msg: 'Transaksi Belanja  berhasil ditambah' })
    //     })
    //     .catch(err => {
    //         console.log(`Erorr saat penambahan Transaksi Belanja => ${err}`)
    //         res.status(500).json({ msg: 'ada kesalahan pada proses penambahan Transaksi Belanja', errorDetail: err })
    //     })
})

module.exports = router