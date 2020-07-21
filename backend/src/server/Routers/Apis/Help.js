const express = require('express')
const router = express.Router()

const auth = require('../Middleware/auth')

const { Report_Get_BarangList } = require('./Functions/functions.Help')
const { Get_Transaksi_List } = require('./Functions/functions.Transaksi')
const { Get_Barang_List } = require('./Functions/functions.Barang')
const { Get_JenisBarang_List } = require('./Functions/functions.JenisBarang')

////// REPORT

//// @router  GET api/help/incomereport/reportbaranglist
//// @desc    Get Help incomereport reportbaranglist
//// @access  Private
router.get('/incomereport/reportbaranglist', auth, async (req, res) => {
    try {
        const date = new Date()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        const now = new Date(yyyy, mm)
        const next = new Date(yyyy, mm + 1)

        const TransaksiListQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: now, $lt: next } }
        const TransaksiListSelect = 'DetailTransaksi Diskon PotonganHarga TotalPembayaran'
        // const { ReportList, ReportData } = await Report_Get_BarangList(TransaksiListQuery, TransaksiListSelect)
        const ReportList = await Report_Get_BarangList(TransaksiListQuery, TransaksiListSelect)
        console.log('Help reportbaranglist dipanggil')
        return res.status(200)
            .json({
                ReportList: ReportList ? ReportList : [],
                // ReportData: ReportData ? ReportData : [],
                msg: 'Report barang list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Report ReportBarangList => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Report Report Barang List',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

// //// @router  POST api/help/incomereport/queryreportbaranglist
// //// @desc    Post Help incomereport queryreportbaranglist
// //// @access  Private
// router.post('/incomereport/queryreportbaranglist', auth, async (req, res) => {
//     // console.log('/incomereport/queryreportbaranglist', req.body)
//     const {
//         JenisBarang, //
//         Kepemilikan, //
//         DateMin,
//         DateMax,
//     } = req.body
//     const TransaksiQuery = {}
//     Object.assign(TransaksiQuery, { Tipe: 'Transaksi' })
//     if (DateMin || DateMax) {
//         if (DateMin && DateMax) {
//             Object.assign(TransaksiQuery, { TanggalTransaksi: { $gt: DateMin, $lt: DateMax } })
//         } else if (DateMin) {
//             Object.assign(TransaksiQuery, { TanggalTransaksi: { $gt: DateMin } })
//         } else if (DateMax) {
//             Object.assign(TransaksiQuery, { TanggalTransaksi: { $lt: DateMax } })
//         }
//     }
//     try {
//         const TransaksiListSelect = 'DetailTransaksi Diskon PotonganHarga TotalPembayaran'
//         const ReportList = await Report_Get_BarangList(TransaksiQuery, TransaksiListSelect)
//         if ((JenisBarang || Kepemilikan) && (ReportList.length > 0)) {
//             const JenisBarangList = Kepemilikan ? await Get_JenisBarang_List({ Kepemilikan: Kepemilikan }) : null
//             let JenisBarangListData = JenisBarangList ? JenisBarangList.map(jenisbaranglist => { return jenisbaranglist.NamaJenisBarang }) : []

//             if (JenisBarang) {
//                 if (JenisBarangListData.length > 0) {
//                     const JenisBarangListDataIndex = JenisBarangListData.findIndex(jenisbaranglistdata => jenisbaranglistdata === JenisBarang)
//                     if (JenisBarangListDataIndex >= 0) {
//                         JenisBarangListData = []
//                         JenisBarangListData.push(JenisBarang)
//                     } else {
//                         JenisBarangListData = []
//                     }
//                 } else {
//                     JenisBarangListData.push(JenisBarang)
//                 }
//             }
//             // console.log('JenisBarangListData', JenisBarangListData)

//             // const QueryReportList = ReportList.filter(reportlist => JenisBarang ? reportlist.JenisBarang === JenisBarang : true && Kepemilikan ? JenisBarangListData.includes(reportlist.JenisBarang) : true)
//             const QueryReportList = ReportList.filter(reportlist => JenisBarangListData.includes(reportlist.JenisBarang))
//             // console.log('QueryReportList', QueryReportList)
//             console.log('Help queryreportbaranglist dipanggil')
//             return res.status(200)
//                 .json({
//                     QueryReportList: QueryReportList ? QueryReportList : [],
//                     msg: 'Query Report barang list berhasil dipanggil'
//                 })
//         } else {
//             const QueryReportList = ReportList
//             console.log('QueryReportList', QueryReportList)
//             console.log('Help queryreportbaranglist dipanggil')
//             return res.status(200)
//                 .json({
//                     QueryReportList: QueryReportList ? QueryReportList : [],
//                     msg: 'Query Report barang list berhasil dipanggil'
//                 })
//         }
//     } catch (err) {
//         console.log(`Erorr saat pemanggilan Help Report ReportBarangList => ${err.errorDetail ? err.errorDetail : err}`)
//         return res.status(400).json({
//             msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Report Report Barang List',
//             errorDetail: err.errorDetail ? err.errorDetail : err
//         })
//     }
// })

//// @router  GET api/help/incomereport/reportkeuanganlist
//// @desc    Get Help incomereport reportkeuanganlist
//// @access  Private
router.get('/incomereport/reportkeuanganlist', auth, async (req, res) => {
    // console.log('/incomereport/reportkeuanganlist')
    try {
        const date = new Date()
        const dd = date.getDate()
        // console.log(dd)
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const ReportKeuanganList = []
        while (i <= dd) {
            // console.log(i)
            const now = new Date(yyyy, mm, i)
            const next = new Date(yyyy, mm, i + 1)
            let KeuntunganHarian = 0
            let DiskonHarian = 0
            let PotonganHargaHarian = 0
            const ListTransaksi = []
            const ListTransaksiHarian = await Get_Transaksi_List({ Tipe: 'Transaksi', TanggalTransaksi: { $gt: now, $lt: next } })
            ListTransaksiHarian.forEach(element => {
                // console.log('TotalPembayaran', element.TotalPembayaran)
                KeuntunganHarian = KeuntunganHarian + (element.TotalPembayaran ? Number(element.TotalPembayaran) : 0)
                DiskonHarian = DiskonHarian + (element.Diskon ? Number(element.Diskon) : 0)
                PotonganHargaHarian = PotonganHargaHarian + (element.PotonganHarga ? Number(element.PotonganHarga) : 0)
                const newListTransaksi = {
                    id: element._id,
                    Diskon: element.Diskon,
                    PotonganHarga: element.PotonganHarga,
                    TotalPembayaran: element.TotalPembayaran,
                }
                ListTransaksi.push(newListTransaksi)
                // console.log('KeuntunganHarian', KeuntunganHarian)
            })
            const newReportKeuanganList = {
                Tanggal: now.toLocaleDateString(),
                KeuntunganHarian: KeuntunganHarian,
                DiskonHarian: DiskonHarian,
                PotonganHargaHarian: PotonganHargaHarian,
                ListTransaksi: ListTransaksi,
            }
            ReportKeuanganList.push(newReportKeuanganList)
            i = i + 1
        }
        // console.log(ReportKeuanganList)
        return res.status(200)
            .json({
                ReportKeuanganList: ReportKeuanganList ? ReportKeuanganList : [],
                msg: 'IncomeReport Keuangan list berhasil dipanggil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan Help IncomeReport ReportKeuanganList => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help IncomeReport Report Keuangan List',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/help/outcomereport/reportbaranglist
//// @desc    Get Help outcomereport reportbaranglist
//// @access  Private
router.get('/outcomereport/reportbaranglist', auth, async (req, res) => {
    // console.log('/outcomereport/reportbaranglist')
    try {
        const date = new Date()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        const now = new Date(yyyy, mm)
        const next = new Date(yyyy, mm + 1)

        const TransaksiListQuery = { Tipe: 'Belanja', TanggalTransaksi: { $gt: now, $lt: next } }
        const TransaksiList = await Get_Transaksi_List(TransaksiListQuery, null)
        const ReportList = []
        if (TransaksiList.length > 0) {
            const ListBarang = await Get_Barang_List(null, 'Barcode Jenis')
            TransaksiList.forEach(element => {
                const DetailTransaksi = element.DetailTransaksi
                DetailTransaksi.forEach(detailtransaksi => {
                    // console.log('detailtransaksi', detailtransaksi)
                    const DetailTransaksi_Barcode = detailtransaksi.Barcode
                    const DetailTransaksi_NamaBarang = detailtransaksi.NamaBarang
                    const DetailTransaksi_Jumlah = detailtransaksi.Jumlah ? Number(detailtransaksi.Jumlah) : 0
                    const DetailTransaksi_TotalModal = detailtransaksi.TotalModal ? Number(detailtransaksi.TotalModal) : 0

                    const DataBarang = ListBarang.find(listbarang => listbarang.Barcode === DetailTransaksi_Barcode)
                    const DataBarang_JenisBarang = DataBarang.Jenis ? DataBarang.Jenis : ''

                    if (ReportList.length > 0) {
                        const ReportListIndex = ReportList.findIndex(reportlist => reportlist.Barcode === DetailTransaksi_Barcode)
                        if (ReportListIndex >= 0) {
                            ReportList[ReportListIndex].Jumlah = ReportList[ReportListIndex].Jumlah + DetailTransaksi_Jumlah
                            ReportList[ReportListIndex].TotalModal = ReportList[ReportListIndex].TotalModal + DetailTransaksi_TotalModal
                        } else {
                            const newReportList = {
                                Barcode: DetailTransaksi_Barcode,
                                NamaBarang: DetailTransaksi_NamaBarang,
                                JenisBarang: DataBarang_JenisBarang,
                                Jumlah: DetailTransaksi_Jumlah, // ++
                                TotalModal: DetailTransaksi_TotalModal // ++
                            }
                            ReportList.push(newReportList)
                        }
                    } else {
                        const newReportList = {
                            Barcode: DetailTransaksi_Barcode,
                            NamaBarang: DetailTransaksi_NamaBarang,
                            JenisBarang: DataBarang_JenisBarang,
                            Jumlah: DetailTransaksi_Jumlah,
                            TotalModal: DetailTransaksi_TotalModal
                        }
                        ReportList.push(newReportList)
                    }
                })
            })
        }
        // console.log('ReportList', ReportList)
        console.log('Help outcomereport reportbaranglist dipanggil')
        return res.status(200)
            .json({
                ReportList: ReportList ? ReportList : [],
                msg: 'Report outcomereport barang list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Report outcomereport ReportBarangList => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Report outcomereport Report Barang List',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/help/outcomereport/reportmodallist
//// @desc    Get Help outcomereport reportmodallist
//// @access  Private
router.get('/outcomereport/reportmodallist', auth, async (req, res) => {
    // console.log('/outcomereport/reportmodallist')
    try {
        const date = new Date()
        const dd = date.getDate()
        // console.log(dd)
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const ReportModalList = []
        while (i <= dd) {
            // console.log(i)
            const now = new Date(yyyy, mm, i)
            const next = new Date(yyyy, mm, i + 1)
            let ModalHarian = 0
            const ListTransaksiHarian = await Get_Transaksi_List({ Tipe: 'Belanja', TanggalTransaksi: { $gt: now, $lt: next } })
            ListTransaksiHarian.forEach(element => {
                // console.log('TotalPembayaran', element.TotalPembayaran)
                const Transaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                ModalHarian = ModalHarian + Transaksi_TotalPembayaran
            })
            const newReportModalList = {
                Tanggal: now.toLocaleDateString(),
                ModalHarian: ModalHarian,
            }
            ReportModalList.push(newReportModalList)
            i = i + 1
        }
        // console.log('ReportModalList', ReportModalList)
        return res.status(200)
            .json({
                ReportModalList: ReportModalList ? ReportModalList : [],
                msg: 'outcomereport Modal list berhasil dipanggil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan Help outcomereport reportmodallist => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help outcomereport report modal list',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

////// END-REPORT

////// GRAPH

//// @router  GET api/help/graph/asetlist
//// @desc    Get Help Graph asetlist
//// @access  Private
router.get('/graph/asetlist', auth, async (req, res) => {
    try {
        const AsetList = await Get_Barang_List()
        console.log('Help Graph asetlist dipanggil')
        return res.status(200)
            .json({
                AsetList: AsetList ? AsetList : [],
                msg: 'Graph aset list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph aset list => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph aset list',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/help/graph/queryasetlist
//// @desc    post Help Graph queryasetlist
//// @access  Private
router.post('/graph/queryasetlist', auth, async (req, res) => {
    // console.log('/graph/queryasetlist', req.body)

    const Kepemilikan = req.body.Kepemilikan ? req.body.Kepemilikan : null
    const Barang = req.body.Barang ? req.body.Barang : []
    const JenisBarang = req.body.JenisBarang ? req.body.JenisBarang : []
    const StokMin = req.body.StokMin ? req.body.StokMin : null
    const StokMax = req.body.StokMax ? req.body.StokMax : null
    const HargaJualMin = req.body.HargaJualMin ? req.body.HargaJualMin : null
    const HargaJualMax = req.body.HargaJualMax ? req.body.HargaJualMax : null
    const Ket = req.body.Ket ? req.body.Ket : null

    try {
        ////// create query
        const AsetQuery = {}
        if (Kepemilikan || JenisBarang.length > 0) {
            const QueryListJenisBarang = []
            if (Kepemilikan) {
                const ListDataJenisBarang = await Get_JenisBarang_List({ Kepemilikan: Kepemilikan }, null)
                const ListJenisBarang = ListDataJenisBarang.map((item) => item.NamaJenisBarang)
                ListJenisBarang.forEach(element => {
                    QueryListJenisBarang.push(element)
                })
            }
            if (JenisBarang.length > 0) {
                const JenisBarangList = JenisBarang.map((item) => item.NamaJenisBarang)
                if (QueryListJenisBarang.length > 0) {
                    // console.log('JenisBarangList', JenisBarangList)
                    // console.log('QueryListJenisBarang', QueryListJenisBarang)
                    // const FoundJenisBarangList = JenisBarangList.find(value => QueryListJenisBarang.includes(value))
                    const FoundJenisBarangList = []
                    JenisBarangList.map((jenisbaranglist) => {
                        FoundJenisBarangList[QueryListJenisBarang.findIndex(querylistjenisbarang => querylistjenisbarang === jenisbaranglist)] = jenisbaranglist
                    })
                    // console.log('FoundJenisBarangList', FoundJenisBarangList)
                    QueryListJenisBarang.length = 0
                    if (FoundJenisBarangList.length > 0) {
                        FoundJenisBarangList.forEach(element => {
                            QueryListJenisBarang.push(element)
                        })
                    }
                } else {
                    JenisBarangList.forEach(element => {
                        QueryListJenisBarang.push(element)
                    })
                }
            }
            Object.assign(AsetQuery, { Jenis: { $in: QueryListJenisBarang } })
        }
        if (Barang.length > 0) {
            const ListQueryBarcode = Barang.map((item) => item.Barcode)
            Object.assign(AsetQuery, { Barcode: { $in: ListQueryBarcode } })
        }
        if (StokMin || StokMax) {
            if (StokMin && StokMax) {
                Object.assign(AsetQuery, { Stok: { $gt: StokMin, $lt: StokMax } })
            } else if (StokMin) {
                Object.assign(AsetQuery, { Stok: { $gt: StokMin } })
            } else if (StokMax) {
                Object.assign(AsetQuery, { Stok: { $lt: StokMax } })
            }
        }
        if (HargaJualMin || HargaJualMax) {
            if (HargaJualMin && HargaJualMax) {
                Object.assign(AsetQuery, { HargaJual: { $gt: HargaJualMin, $lt: HargaJualMax } })
            } else if (HargaJualMin) {
                Object.assign(AsetQuery, { HargaJual: { $gt: HargaJualMin } })
            } else if (HargaJualMax) {
                Object.assign(AsetQuery, { HargaJual: { $lt: HargaJualMax } })
            }
        }
        if (Ket) {
            Object.assign(AsetQuery, { Ket: `/${Ket}/` })
        }

        // console.log('AsetQuery', AsetQuery)
        const AsetSelect = '_id Barcode Name Jenis Stok HargaModal'
        const AsetList = await Get_Barang_List(AsetQuery, AsetSelect)
        console.log('Help Graph queryasetlist dipanggil')
        return res.status(200)
            .json({
                AsetList: AsetList ? AsetList : [],
                msg: 'Graph query aset list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph query aset list => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph query aset list',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

////// END-GRAPH


module.exports = router