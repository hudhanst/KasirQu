const express = require('express')
const router = express.Router()

const auth = require('../Middleware/auth')

const { Report_Get_BarangList } = require('./Functions/functions.Help')
const { Get_Transaksi_List } = require('./Functions/functions.Transaksi')
const { Get_Barang_List } = require('./Functions/functions.Barang')
const { Get_JenisBarang_List } = require('./Functions/functions.JenisBarang')
const Transaksi = require('../../Models/Transaksi')

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
        const ReportList = await Report_Get_BarangList(TransaksiListQuery, TransaksiListSelect)
        console.log('Help reportbaranglist dipanggil')
        return res.status(200)
            .json({
                ReportList: ReportList ? ReportList : [],
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
                    const DataBarang_JenisBarang = DataBarang ? (DataBarang.Jenis ? DataBarang.Jenis : '') : ''

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

//// @router  GET api/help/graph/aset
//// @desc    Get Help Graph aset
//// @access  Private
router.get('/graph/aset', auth, async (req, res) => {
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

//// @router  POST api/help/graph/query/aset
//// @desc    post Help Graph query aset
//// @access  Private
router.post('/graph/query/aset', auth, async (req, res) => {
    // console.log('/graph/query/aset', req.body)


    try {
        const Kepemilikan = req.body.Kepemilikan ? req.body.Kepemilikan : null
        const Barang = req.body.Barang ? req.body.Barang : []
        const JenisBarang = req.body.JenisBarang ? req.body.JenisBarang : []
        const StokMin = req.body.StokMin ? req.body.StokMin : null
        const StokMax = req.body.StokMax ? req.body.StokMax : null
        const HargaJualMin = req.body.HargaJualMin ? req.body.HargaJualMin : null
        const HargaJualMax = req.body.HargaJualMax ? req.body.HargaJualMax : null
        const Ket = req.body.Ket ? req.body.Ket : null
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

//// @router  GET api/help/graph/uangmasuk
//// @desc    Get Help Graph UangMasuk
//// @access  Private
router.get('/graph/uangmasuk', auth, async (req, res) => {
    // console.log('graph/uangmasuk')
    try {
        const date = new Date()
        const dd = date.getDate()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const UangMasuk = []
        while (i <= dd) {
            const thisDay = new Date(yyyy, mm, i)
            const nextDay = new Date(yyyy, mm, i + 1)
            let UangMasukHarian = 0
            const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisDay, $lt: nextDay } }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                UangMasukHarian = UangMasukHarian + ListTransaksi_TotalPembayaran
            })
            const newUangMasuk = {
                Tanggal: thisDay.toLocaleDateString(),
                UangMasuk: UangMasukHarian
            }
            UangMasuk.push(newUangMasuk)
            i = i + 1
        }

        console.log('Help Graph UangMasuk dipanggil')
        return res.status(200)
            .json({
                UangMasuk: UangMasuk ? UangMasuk : [],
                msg: 'Graph UangMasuk berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph UangMasuk => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph UangMasuk',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/help/graph/query/uangmasuk
//// @desc    post Help Graph query UangMasuk
//// @access  Private
router.post('/graph/query/uangmasuk', auth, async (req, res) => {
    // console.log('/graph/query/uangmasuk', req.body)

    try {
        const { GrafikView } = req.body
        if (!GrafikView) {
            throw {
                msg: 'data tidak lengkap',
            }
        }
        const DateMin = req.body.DateMin ? req.body.DateMin : null
        const DateMax = req.body.DateMax ? req.body.DateMax : null
        const TotalTransaksiMin = req.body.TotalTransaksiMin ? req.body.TotalTransaksiMin : null
        const TotalTransaksiMax = req.body.TotalTransaksiMax ? req.body.TotalTransaksiMax : null

        ////// create query
        const UangMasukQuery = {}

        if (TotalTransaksiMin || TotalTransaksiMax) {
            if (TotalTransaksiMin && TotalTransaksiMax) {
                Object.assign(UangMasukQuery, { TotalPembayaran: { $gt: TotalTransaksiMin, $lt: TotalTransaksiMax } })
            } else if (TotalTransaksiMin) {
                Object.assign(UangMasukQuery, { TotalPembayaran: { $gt: TotalTransaksiMin } })
            } else if (TotalTransaksiMax) {
                Object.assign(UangMasukQuery, { TotalPembayaran: { $lt: TotalTransaksiMax } })
            }
        }

        // console.log('UangMasukQuery', UangMasukQuery)
        const UangMasuk = []
        const OldestTransaksi = DateMin ? DateMin : await Transaksi.findOne({ Tipe: 'Transaksi' }, null, { sort: { 'TanggalTransaksi': 1 } })
        const NewestTransaksi = DateMax ? DateMax : await Transaksi.findOne({ Tipe: 'Transaksi' }, null, { sort: { 'TanggalTransaksi': -1 } })
        const OldestDate = new Date(DateMin ? DateMin : OldestTransaksi.TanggalTransaksi)
        const NewestDate = new Date(DateMax ? DateMax : NewestTransaksi.TanggalTransaksi)
        const OldestDate_dd = OldestDate.getDate()
        const OldestDate_mm = OldestDate.getMonth()
        const OldestDate_yyyy = OldestDate.getFullYear()
        if (GrafikView === 'bulanan') {
            const NewestDate_mm = NewestDate.getMonth()
            const NewestDate_yyyy = NewestDate.getFullYear()
            const DivMonth = (NewestDate_mm - OldestDate_mm + ((12 * NewestDate_yyyy) - (12 * OldestDate_yyyy)))
            let i = 0
            while (i <= (DivMonth > 0 ? DivMonth : 0)) {
                const thisMonth = new Date(OldestDate_yyyy, OldestDate_mm + i)
                const nextMonth = new Date(OldestDate_yyyy, OldestDate_mm + (i + 1))
                let UangMasukBulanan = 0

                const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisMonth, $lt: nextMonth }, ...UangMasukQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                    UangMasukBulanan = UangMasukBulanan + ListTransaksi_TotalPembayaran
                })

                const newUangMasuk = {
                    Tanggal: thisMonth.toLocaleDateString(),
                    UangMasuk: UangMasukBulanan
                }
                UangMasuk.push(newUangMasuk)
                i = i + 1
            }
        } else {
            const DivDays = (NewestDate - OldestDate) > 0 ? (NewestDate - OldestDate) / (24 * 3600 * 1000) : 1
            let i = 0
            while (i <= DivDays) {
                const thisDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + i)
                const nextDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + (i + 1))
                let UangMasukHarian = 0

                const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisDate, $lt: nextDate }, ...UangMasukQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                    UangMasukHarian = UangMasukHarian + ListTransaksi_TotalPembayaran
                })

                const newUangMasuk = {
                    Tanggal: thisDate.toLocaleDateString(),
                    UangMasuk: UangMasukHarian
                }
                UangMasuk.push(newUangMasuk)
                i = i + 1
            }
        }

        // console.log('Log: UangMasuk', UangMasuk)
        console.log('Help Graph query UangMasuk dipanggil')
        return res.status(200)
            .json({
                UangMasuk: UangMasuk ? UangMasuk : [],
                msg: 'Graph query UangMasuk berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph query UangMasuk => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph query UangMasuk',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/help/graph/uangkeluar
//// @desc    Get Help Graph UangKeluar
//// @access  Private
router.get('/graph/uangkeluar', auth, async (req, res) => {
    // console.log('graph/uangkeluar')
    try {
        const date = new Date()
        const dd = date.getDate()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const UangKeluar = []
        while (i <= dd) {
            const thisDay = new Date(yyyy, mm, i)
            const nextDay = new Date(yyyy, mm, i + 1)
            let UangKeluarHarian = 0
            const DefatulTransaksiQuery = { Tipe: 'Belanja', TanggalTransaksi: { $gt: thisDay, $lt: nextDay } }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                UangKeluarHarian = UangKeluarHarian + ListTransaksi_TotalPembayaran
            })
            const newUangKeluar = {
                Tanggal: thisDay.toLocaleDateString(),
                UangKeluar: UangKeluarHarian
            }
            UangKeluar.push(newUangKeluar)
            i = i + 1
        }

        console.log('Help Graph UangKeluar dipanggil')
        return res.status(200)
            .json({
                UangKeluar: UangKeluar ? UangKeluar : [],
                msg: 'Graph UangKeluar berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph UangKeluar => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph UangKeluar',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/help/graph/query/uangkeluar
//// @desc    post Help Graph query UangKeluar
//// @access  Private
router.post('/graph/query/uangkeluar', auth, async (req, res) => {
    // console.log('/graph/query/uangmasuk', req.body)

    try {
        const { GrafikView } = req.body
        if (!GrafikView) {
            throw {
                msg: 'data tidak lengkap',
            }
        }
        const DateMin = req.body.DateMin ? req.body.DateMin : null
        const DateMax = req.body.DateMax ? req.body.DateMax : null
        const TotalTransaksiMin = req.body.TotalTransaksiMin ? req.body.TotalTransaksiMin : null
        const TotalTransaksiMax = req.body.TotalTransaksiMax ? req.body.TotalTransaksiMax : null

        ////// create query
        const UangKeluarQuery = {}

        if (TotalTransaksiMin || TotalTransaksiMax) {
            if (TotalTransaksiMin && TotalTransaksiMax) {
                Object.assign(UangKeluarQuery, { TotalPembayaran: { $gt: TotalTransaksiMin, $lt: TotalTransaksiMax } })
            } else if (TotalTransaksiMin) {
                Object.assign(UangKeluarQuery, { TotalPembayaran: { $gt: TotalTransaksiMin } })
            } else if (TotalTransaksiMax) {
                Object.assign(UangKeluarQuery, { TotalPembayaran: { $lt: TotalTransaksiMax } })
            }
        }

        // console.log('UangKeluarQuery', UangKeluarQuery)
        const UangKeluar = []
        const OldestTransaksi = DateMin ? DateMin : await Transaksi.findOne({ Tipe: 'Belanja' }, null, { sort: { 'TanggalTransaksi': 1 } })
        const NewestTransaksi = DateMax ? DateMax : await Transaksi.findOne({ Tipe: 'Belanja' }, null, { sort: { 'TanggalTransaksi': -1 } })
        const OldestDate = new Date(DateMin ? DateMin : OldestTransaksi.TanggalTransaksi)
        const NewestDate = new Date(DateMax ? DateMax : NewestTransaksi.TanggalTransaksi)
        const OldestDate_dd = OldestDate.getDate()
        const OldestDate_mm = OldestDate.getMonth()
        const OldestDate_yyyy = OldestDate.getFullYear()
        if (GrafikView === 'bulanan') {
            const NewestDate_mm = NewestDate.getMonth()
            const NewestDate_yyyy = NewestDate.getFullYear()
            const DivMonth = (NewestDate_mm - OldestDate_mm + ((12 * NewestDate_yyyy) - (12 * OldestDate_yyyy)))
            let i = 0
            while (i <= (DivMonth > 0 ? DivMonth : 0)) {
                const thisMonth = new Date(OldestDate_yyyy, OldestDate_mm + i)
                const nextMonth = new Date(OldestDate_yyyy, OldestDate_mm + (i + 1))
                let UangKeluarBulanan = 0

                const DefatulTransaksiQuery = { Tipe: 'Belanja', TanggalTransaksi: { $gt: thisMonth, $lt: nextMonth }, ...UangKeluarQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                    UangKeluarBulanan = UangKeluarBulanan + ListTransaksi_TotalPembayaran
                })

                const newUangKeluar = {
                    Tanggal: thisMonth.toLocaleDateString(),
                    UangKeluar: UangKeluarBulanan
                }
                UangKeluar.push(newUangKeluar)
                i = i + 1
            }
        } else {
            const DivDays = (NewestDate - OldestDate) > 0 ? (NewestDate - OldestDate) / (24 * 3600 * 1000) : 1
            let i = 0
            while (i <= DivDays) {
                const thisDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + i)
                const nextDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + (i + 1))
                let UangKeluarHarian = 0

                const DefatulTransaksiQuery = { Tipe: 'Belanja', TanggalTransaksi: { $gt: thisDate, $lt: nextDate }, ...UangKeluarQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                    UangKeluarHarian = UangKeluarHarian + ListTransaksi_TotalPembayaran
                })

                const newUangKeluar = {
                    Tanggal: thisDate.toLocaleDateString(),
                    UangKeluar: UangKeluarHarian
                }
                UangKeluar.push(newUangKeluar)
                i = i + 1
            }
        }

        // console.log('Log: UangKeluar', UangKeluar)
        console.log('Help Graph query UangKeluar dipanggil')
        return res.status(200)
            .json({
                UangKeluar: UangKeluar ? UangKeluar : [],
                msg: 'Graph query UangKeluar berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph query UangKeluar => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph query UangKeluar',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/help/graph/uanglose
//// @desc    Get Help Graph UangLose
//// @access  Private
router.get('/graph/uanglose', auth, async (req, res) => {
    // console.log('graph/uanglose')
    try {
        const date = new Date()
        const dd = date.getDate()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const UangLose = []
        while (i <= dd) {
            const thisDay = new Date(yyyy, mm, i)
            const nextDay = new Date(yyyy, mm, i + 1)
            let UangLoseHarian = 0
            const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisDay, $lt: nextDay } }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                let TotalTagihan = 0
                const ListTransaksi_DetailTransaksi = element.DetailTransaksi ? element.DetailTransaksi : []
                ListTransaksi_DetailTransaksi.forEach(element_element => {
                    const DetailTransaksi_HargaTotal = element_element.HargaTotal ? Number(element_element.HargaTotal) : 0
                    TotalTagihan = TotalTagihan + DetailTransaksi_HargaTotal
                })
                const DivinTransaksi = TotalTagihan - ListTransaksi_TotalPembayaran
                if (DivinTransaksi > 0) {
                    UangLoseHarian = UangLoseHarian + DivinTransaksi
                } else {
                    UangLoseHarian = UangLoseHarian + 0
                }
            })
            const newUangLose = {
                Tanggal: thisDay.toLocaleDateString(),
                UangLose: UangLoseHarian
            }
            UangLose.push(newUangLose)
            i = i + 1
        }

        console.log('Help Graph UangLose dipanggil')
        return res.status(200)
            .json({
                UangLose: UangLose ? UangLose : [],
                msg: 'Graph UangLose berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph UangLose => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph UangLose',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/help/graph/query/uanglose
//// @desc    post Help Graph query UangLose
//// @access  Private
router.post('/graph/query/uanglose', auth, async (req, res) => {
    // console.log('/graph/query/uanglose', req.body)

    try {
        const { GrafikView } = req.body
        if (!GrafikView) {
            throw {
                msg: 'data tidak lengkap',
            }
        }
        const DateMin = req.body.DateMin ? req.body.DateMin : null
        const DateMax = req.body.DateMax ? req.body.DateMax : null
        const DiskonMin = req.body.DiskonMin ? req.body.DiskonMin : null
        const DiskonMax = req.body.DiskonMax ? req.body.DiskonMax : null
        const PotonganMin = req.body.PotonganMin ? req.body.PotonganMin : null
        const PotonganMax = req.body.PotonganMax ? req.body.PotonganMax : null

        ////// create query
        const UangLoseQuery = {}

        if (DiskonMin || DiskonMax) {
            if (DiskonMin && DiskonMax) {
                Object.assign(UangLoseQuery, { Diskon: { $gt: DiskonMin, $lt: DiskonMax } })
            } else if (DiskonMin) {
                Object.assign(UangLoseQuery, { Diskon: { $gt: DiskonMin } })
            } else if (DiskonMax) {
                Object.assign(UangLoseQuery, { Diskon: { $lt: DiskonMax } })
            }
        }

        if (PotonganMin || PotonganMax) {
            if (PotonganMin && PotonganMax) {
                Object.assign(UangLoseQuery, { PotonganHarga: { $gt: PotonganMin, $lt: PotonganMax } })
            } else if (PotonganMin) {
                Object.assign(UangLoseQuery, { PotonganHarga: { $gt: PotonganMin } })
            } else if (PotonganMax) {
                Object.assign(UangLoseQuery, { PotonganHarga: { $lt: PotonganMax } })
            }
        }

        // console.log('UangLoseQuery', UangLoseQuery)
        const UangLose = []
        const OldestTransaksi = DateMin ? DateMin : await Transaksi.findOne({ Tipe: 'Transaksi' }, null, { sort: { 'TanggalTransaksi': 1 } })
        const NewestTransaksi = DateMax ? DateMax : await Transaksi.findOne({ Tipe: 'Transaksi' }, null, { sort: { 'TanggalTransaksi': -1 } })
        const OldestDate = new Date(DateMin ? DateMin : OldestTransaksi.TanggalTransaksi)
        const NewestDate = new Date(DateMax ? DateMax : NewestTransaksi.TanggalTransaksi)
        const OldestDate_dd = OldestDate.getDate()
        const OldestDate_mm = OldestDate.getMonth()
        const OldestDate_yyyy = OldestDate.getFullYear()
        if (GrafikView === 'bulanan') {
            const NewestDate_mm = NewestDate.getMonth()
            const NewestDate_yyyy = NewestDate.getFullYear()
            const DivMonth = (NewestDate_mm - OldestDate_mm + ((12 * NewestDate_yyyy) - (12 * OldestDate_yyyy)))
            let i = 0
            while (i <= (DivMonth > 0 ? DivMonth : 0)) {
                const thisMonth = new Date(OldestDate_yyyy, OldestDate_mm + i)
                const nextMonth = new Date(OldestDate_yyyy, OldestDate_mm + (i + 1))
                let UangLoseBulanan = 0

                const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisMonth, $lt: nextMonth }, ...UangLoseQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                    const ListTransaksi_Diskon = element.Diskon ? Number(element.Diskon) : 0
                    const ListTransaksi_PotonganHarga = element.PotonganHarga ? Number(element.PotonganHarga) : 0
                    let TotalTagihan = 0
                    const ListTransaksi_DetailTransaksi = element.DetailTransaksi ? element.DetailTransaksi : []
                    ListTransaksi_DetailTransaksi.forEach(element_element => {
                        const DetailTransaksi_HargaTotal = element_element.HargaTotal ? Number(element_element.HargaTotal) : 0
                        TotalTagihan = TotalTagihan + DetailTransaksi_HargaTotal
                    })
                    const DivinTransaksi = (ListTransaksi_Diskon > 0 && ListTransaksi_PotonganHarga > 0) ?
                        TotalTagihan - ListTransaksi_TotalPembayaran : ((ListTransaksi_Diskon > 0) ?
                            ((TotalTagihan * ListTransaksi_Diskon) / 100) : ListTransaksi_PotonganHarga)
                    if (DivinTransaksi > 0) {
                        UangLoseBulanan = UangLoseBulanan + DivinTransaksi
                    } else {
                        UangLoseBulanan = UangLoseBulanan + 0
                    }
                })

                const newUangLose = {
                    Tanggal: thisMonth.toLocaleDateString(),
                    UangLose: UangLoseBulanan
                }
                UangLose.push(newUangLose)
                i = i + 1
            }
        } else {
            const DivDays = (NewestDate - OldestDate) > 0 ? (NewestDate - OldestDate) / (24 * 3600 * 1000) : 1
            let i = 0
            while (i <= DivDays) {
                const thisDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + i)
                const nextDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + (i + 1))
                let UangLoseHarian = 0

                const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisDate, $lt: nextDate }, ...UangLoseQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    const ListTransaksi_TotalPembayaran = element.TotalPembayaran ? Number(element.TotalPembayaran) : 0
                    const ListTransaksi_Diskon = element.Diskon ? Number(element.Diskon) : 0
                    const ListTransaksi_PotonganHarga = element.PotonganHarga ? Number(element.PotonganHarga) : 0
                    let TotalTagihan = 0
                    const ListTransaksi_DetailTransaksi = element.DetailTransaksi ? element.DetailTransaksi : []
                    ListTransaksi_DetailTransaksi.forEach(element_element => {
                        const DetailTransaksi_HargaTotal = element_element.HargaTotal ? Number(element_element.HargaTotal) : 0
                        TotalTagihan = TotalTagihan + DetailTransaksi_HargaTotal
                    })
                    const DivinTransaksi = (ListTransaksi_Diskon > 0 && ListTransaksi_PotonganHarga > 0) ?
                        TotalTagihan - ListTransaksi_TotalPembayaran : ((ListTransaksi_Diskon > 0) ?
                            ((TotalTagihan * ListTransaksi_Diskon) / 100) : ListTransaksi_PotonganHarga)
                    if (DivinTransaksi > 0) {
                        UangLoseHarian = UangLoseHarian + DivinTransaksi
                    } else {
                        UangLoseHarian = UangLoseHarian + 0
                    }
                })

                const newUangLose = {
                    Tanggal: thisDate.toLocaleDateString(),
                    UangLose: UangLoseHarian
                }
                UangLose.push(newUangLose)
                i = i + 1
            }
        }

        // console.log('Log: UangLose', UangLose)
        console.log('Help Graph query UangLose dipanggil')
        return res.status(200)
            .json({
                UangLose: UangLose ? UangLose : [],
                msg: 'Graph query UangLose berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph query UangLose => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph query UangLose',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/help/graph/intensitastransaksi
//// @desc    Get Help Graph IntensitasTransaksi
//// @access  Private
router.get('/graph/intensitastransaksi', auth, async (req, res) => {
    // console.log('graph/intensitastransaksi')
    try {
        const date = new Date()
        const dd = date.getDate()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const IntensitasTransaksi = []
        while (i <= dd) {
            const thisDay = new Date(yyyy, mm, i)
            const nextDay = new Date(yyyy, mm, i + 1)
            let IntensitasTransaksiHarian = 0
            const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisDay, $lt: nextDay } }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                IntensitasTransaksiHarian = IntensitasTransaksiHarian + 1
            })
            const newIntensitasTransaksi = {
                Tanggal: thisDay.toLocaleDateString(),
                IntensitasTransaksi: IntensitasTransaksiHarian
            }
            IntensitasTransaksi.push(newIntensitasTransaksi)
            i = i + 1
        }

        console.log('Help Graph IntensitasTransaksi dipanggil')
        return res.status(200)
            .json({
                IntensitasTransaksi: IntensitasTransaksi ? IntensitasTransaksi : [],
                msg: 'Graph IntensitasTransaksi berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph IntensitasTransaksi => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph IntensitasTransaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/help/graph/query/intensitastransaksi
//// @desc    post Help Graph query IntensitasTransaksi
//// @access  Private
router.post('/graph/query/intensitastransaksi', auth, async (req, res) => {
    // console.log('/graph/query/intensitastransaksi', req.body)

    try {
        const { GrafikView } = req.body
        if (!GrafikView) {
            throw {
                msg: 'data tidak lengkap',
            }
        }
        const NamaKasir = req.body.NamaKasir ? req.body.NamaKasir : null
        const DateMin = req.body.DateMin ? req.body.DateMin : null
        const DateMax = req.body.DateMax ? req.body.DateMax : null
        const Jenis = req.body.Jenis ? req.body.Jenis : null
        const DiskonMin = req.body.DiskonMin ? req.body.DiskonMin : null
        const DiskonMax = req.body.DiskonMax ? req.body.DiskonMax : null
        const PotonganHargaMin = req.body.PotonganHargaMin ? req.body.PotonganHargaMin : null
        const PotonganHargaMax = req.body.PotonganHargaMax ? req.body.PotonganHargaMax : null
        const TotalPembayaranMin = req.body.TotalPembayaranMin ? req.body.TotalPembayaranMin : null
        const TotalPembayaranMax = req.body.TotalPembayaranMax ? req.body.TotalPembayaranMax : null

        ////// create query
        const IntensitasTransaksiQuery = {}

        if (NamaKasir) {
            Object.assign(IntensitasTransaksiQuery, { NamaKasir: NamaKasir })
        }

        if (DiskonMin || DiskonMax) {
            if (DiskonMin && DiskonMax) {
                Object.assign(IntensitasTransaksiQuery, { Diskon: { $gt: DiskonMin, $lt: DiskonMax } })
            } else if (DiskonMin) {
                Object.assign(IntensitasTransaksiQuery, { Diskon: { $gt: DiskonMin } })
            } else if (DiskonMax) {
                Object.assign(IntensitasTransaksiQuery, { Diskon: { $lt: DiskonMax } })
            }
        }

        if (PotonganHargaMin || PotonganHargaMax) {
            if (PotonganHargaMin && PotonganHargaMax) {
                Object.assign(IntensitasTransaksiQuery, { PotonganHarga: { $gt: PotonganHargaMin, $lt: PotonganHargaMax } })
            } else if (PotonganHargaMin) {
                Object.assign(IntensitasTransaksiQuery, { PotonganHarga: { $gt: PotonganHargaMin } })
            } else if (PotonganHargaMax) {
                Object.assign(IntensitasTransaksiQuery, { PotonganHarga: { $lt: PotonganHargaMax } })
            }
        }

        if (TotalPembayaranMin || TotalPembayaranMax) {
            if (TotalPembayaranMin && TotalPembayaranMax) {
                Object.assign(IntensitasTransaksiQuery, { TotalPembayaran: { $gt: TotalPembayaranMin, $lt: TotalPembayaranMax } })
            } else if (TotalPembayaranMin) {
                Object.assign(IntensitasTransaksiQuery, { TotalPembayaran: { $gt: TotalPembayaranMin } })
            } else if (TotalPembayaranMax) {
                Object.assign(IntensitasTransaksiQuery, { TotalPembayaran: { $lt: TotalPembayaranMax } })
            }
        }

        // console.log('IntensitasTransaksiQuery', IntensitasTransaksiQuery)
        const IntensitasTransaksi = []
        const OldestTransaksi = DateMin ? DateMin : await Transaksi.findOne({ Tipe: Jenis ? Jenis : 'Transaksi' }, null, { sort: { 'TanggalTransaksi': 1 } })
        const NewestTransaksi = DateMax ? DateMax : await Transaksi.findOne({ Tipe: Jenis ? Jenis : 'Transaksi' }, null, { sort: { 'TanggalTransaksi': -1 } })
        const OldestDate = new Date(DateMin ? DateMin : OldestTransaksi.TanggalTransaksi)
        const NewestDate = new Date(DateMax ? DateMax : NewestTransaksi.TanggalTransaksi)
        const OldestDate_dd = OldestDate.getDate()
        const OldestDate_mm = OldestDate.getMonth()
        const OldestDate_yyyy = OldestDate.getFullYear()
        if (GrafikView === 'bulanan') {
            const NewestDate_mm = NewestDate.getMonth()
            const NewestDate_yyyy = NewestDate.getFullYear()
            const DivMonth = (NewestDate_mm - OldestDate_mm + ((12 * NewestDate_yyyy) - (12 * OldestDate_yyyy)))
            let i = 0
            while (i <= (DivMonth > 0 ? DivMonth : 0)) {
                const thisMonth = new Date(OldestDate_yyyy, OldestDate_mm + i)
                const nextMonth = new Date(OldestDate_yyyy, OldestDate_mm + (i + 1))
                let IntensitasTransaksiBulanan = 0

                const DefatulTransaksiQuery = { Tipe: Jenis ? Jenis : 'Transaksi', TanggalTransaksi: { $gt: thisMonth, $lt: nextMonth }, ...IntensitasTransaksiQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    IntensitasTransaksiBulanan = IntensitasTransaksiBulanan + 1
                })

                const newIntensitasTransaksi = {
                    Tanggal: thisMonth.toLocaleDateString(),
                    IntensitasTransaksi: IntensitasTransaksiBulanan
                }
                IntensitasTransaksi.push(newIntensitasTransaksi)
                i = i + 1
            }
        } else if (GrafikView === 'harian') {
            const DivDays = (NewestDate - OldestDate) > 0 ? (NewestDate - OldestDate) / (24 * 3600 * 1000) : 1
            let i = 0
            while (i <= DivDays) {
                const thisDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + i)
                const nextDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + (i + 1))
                let IntensitasTransaksiHarian = 0

                const DefatulTransaksiQuery = { Tipe: Jenis ? Jenis : 'Transaksi', TanggalTransaksi: { $gt: thisDate, $lt: nextDate }, ...IntensitasTransaksiQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
                ListTransaksi.forEach(element => {
                    IntensitasTransaksiHarian = IntensitasTransaksiHarian + 1
                })

                const newIntensitasTransaksi = {
                    Tanggal: thisDate.toLocaleDateString(),
                    IntensitasTransaksi: IntensitasTransaksiHarian
                }
                IntensitasTransaksi.push(newIntensitasTransaksi)
                i = i + 1
            }
        } else if (GrafikView === 'pr_harian') {
            let TotalTransaksi = 0
            let rawIntensitasTransaksi = []
            let i = 0
            while (i < 7) {
                const DefaultDate = new Date(2017, 0, 2 + i)
                const DayofDate = DefaultDate.toLocaleDateString('id-ID', { weekday: 'long' })
                const DefaultIntensitasTransaksiData = { Hari: DayofDate, IntensitasTransaksi: 0 }
                rawIntensitasTransaksi.push(DefaultIntensitasTransaksiData)
                i = i + 1
            }
            const DefatulTransaksiQuery = { Tipe: Jenis ? Jenis : 'Transaksi', TanggalTransaksi: { $gt: OldestDate, $lt: NewestDate }, ...IntensitasTransaksiQuery }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                TotalTransaksi = TotalTransaksi + 1
                const newDate = new Date(element.TanggalTransaksi)
                const DayofDate = newDate.toLocaleDateString('id-ID', { weekday: 'long' })
                const IndexDay = rawIntensitasTransaksi.findIndex(item => item.Hari === DayofDate)
                if (IndexDay >= 0) {
                    rawIntensitasTransaksi[IndexDay].IntensitasTransaksi = rawIntensitasTransaksi[IndexDay].IntensitasTransaksi + 1
                } else {
                    console.log('ada data tidak terdata')
                }
            })

            rawIntensitasTransaksi.forEach(element => {
                const newIntensitasTransaksi = { Tanggal: element.Hari, IntensitasTransaksi: Math.floor((element.IntensitasTransaksi * 100) / (TotalTransaksi > 0 ? TotalTransaksi : 1)) }
                IntensitasTransaksi.push(newIntensitasTransaksi)
            })
        } else if (GrafikView === 'pr_jam') {
            let TotalTransaksi = 0
            let rawIntensitasTransaksi = []
            let i = 0
            while (i < 24) {
                const DefaultIntensitasTransaksiData = { Jam: i, IntensitasTransaksi: 0 }
                rawIntensitasTransaksi.push(DefaultIntensitasTransaksiData)
                i = i + 1
            }
            const DefatulTransaksiQuery = { Tipe: Jenis ? Jenis : 'Transaksi', TanggalTransaksi: { $gt: OldestDate, $lt: NewestDate }, ...IntensitasTransaksiQuery }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                TotalTransaksi = TotalTransaksi + 1
                const newDate = new Date(element.TanggalTransaksi)
                const newDate_Hours = newDate.getHours()
                const IndexFound = rawIntensitasTransaksi.findIndex(item => item.Jam === newDate_Hours)
                if (IndexFound >= 0) {
                    rawIntensitasTransaksi[IndexFound].IntensitasTransaksi = rawIntensitasTransaksi[IndexFound].IntensitasTransaksi + 1
                } else {
                    console.log('ada data tidak terdata')
                }
            })

            rawIntensitasTransaksi.forEach(element => {
                const newIntensitasTransaksi = {
                    Tanggal: element.Jam >= 10 ? `${element.Jam}.00 - ${element.Jam}.59` : `0${element.Jam}.00 - 0${element.Jam}.59`,
                    IntensitasTransaksi: Math.floor((element.IntensitasTransaksi * 100) / (TotalTransaksi > 0 ? TotalTransaksi : 1))
                }
                IntensitasTransaksi.push(newIntensitasTransaksi)
            })
        } else {
            throw {
                msg: 'GrafikView tidak terdaftar',
            }
        }

        // console.log('Log: IntensitasTransaksi', IntensitasTransaksi)
        console.log('Help Graph query IntensitasTransaksi dipanggil')
        return res.status(200)
            .json({
                IntensitasTransaksi: IntensitasTransaksi ? IntensitasTransaksi : [],
                msg: 'Graph query IntensitasTransaksi berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph query IntensitasTransaksi => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph query IntensitasTransaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/help/graph/intensitasbarangtransaksi
//// @desc    Get Help Graph IntensitasBarangTransaksi
//// @access  Private
router.get('/graph/intensitasbarangtransaksi', auth, async (req, res) => {
    // console.log('graph/intensitasbarangtransaksi')
    try {
        const date = new Date()
        const dd = date.getDate()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        let i = 1
        const IntensitasBarangTransaksi = []
        while (i <= dd) {
            const thisDay = new Date(yyyy, mm, i)
            const nextDay = new Date(yyyy, mm, i + 1)
            let IntensitasBarang = []
            const DefatulTransaksiQuery = { Tipe: 'Transaksi', TanggalTransaksi: { $gt: thisDay, $lt: nextDay } }
            const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)
            ListTransaksi.forEach(element => {
                const ListTransaksi_DetailTransaksi = element.DetailTransaksi
                ListTransaksi_DetailTransaksi.forEach(element_element => {
                    const DetailTransaksi_Barcode = element_element.Barcode
                    const DetailTransaksi_NamaBarang = element_element.NamaBarang

                    const IndexBarang = IntensitasBarang.findIndex(item => item.Barcode === DetailTransaksi_Barcode)

                    if (IndexBarang >= 0) {
                        IntensitasBarang[IndexBarang].IntensitasBarangTransaksi = IntensitasBarang[IndexBarang].IntensitasBarangTransaksi + 1
                    } else {
                        const newBarangTransaksiHarian = {
                            Barcode: DetailTransaksi_Barcode,
                            NamaBarang: DetailTransaksi_NamaBarang,
                            IntensitasBarangTransaksi: 1
                        }
                        IntensitasBarang.push(newBarangTransaksiHarian)
                    }
                })
            })
            const newIntensitasBarangTransaksi = {
                Tanggal: thisDay.toLocaleDateString(),
                IntensitasBarangTransaksi: IntensitasBarang
            }
            IntensitasBarangTransaksi.push(newIntensitasBarangTransaksi)
            i = i + 1
        }

        console.log('Help Graph IntensitasBarangTransaksi dipanggil')
        return res.status(200)
            .json({
                IntensitasBarangTransaksi: IntensitasBarangTransaksi ? IntensitasBarangTransaksi : [],
                msg: 'Graph IntensitasBarangTransaksi berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph IntensitasBarangTransaksi => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph IntensitasBarangTransaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/help/graph/query/intensitasbarangtransaksi
//// @desc    post Help Graph query IntensitasBarangTransaksi
//// @access  Private
router.post('/graph/query/intensitasbarangtransaksi', auth, async (req, res) => {
    // console.log('/graph/query/intensitasbarangtransaksi', req.body)

    try {
        const { GrafikView } = req.body
        if (!GrafikView) {
            throw {
                msg: 'data tidak lengkap',
            }
        }
        const DateMin = req.body.DateMin ? req.body.DateMin : null
        const DateMax = req.body.DateMax ? req.body.DateMax : null
        const Tipe = req.body.Tipe ? req.body.Tipe : null
        const Kepemilikan = req.body.Kepemilikan ? req.body.Kepemilikan : null
        const JenisBarang = req.body.JenisBarang ? req.body.JenisBarang : []
        const Barang = req.body.Barang ? req.body.Barang : []

        ////// create query
        const IntensitasBarangTransaksiQuery = {}
        ////// create query
        const BarangQuery = {}
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
                    const FoundJenisBarangList = []
                    JenisBarangList.map((jenisbaranglist) => {
                        FoundJenisBarangList[QueryListJenisBarang.findIndex(querylistjenisbarang => querylistjenisbarang === jenisbaranglist)] = jenisbaranglist
                    })
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
            Object.assign(BarangQuery, { Jenis: { $in: QueryListJenisBarang } })
        }
        if (Barang.length > 0) {
            const ListQueryBarcode = Barang.map((item) => item.Barcode)
            Object.assign(BarangQuery, { Barcode: { $in: ListQueryBarcode } })
        }

        // console.log('IntensitasBarangTransaksiQuery', IntensitasBarangTransaksiQuery)
        const IntensitasBarangTransaksi = []
        const OldestTransaksi = DateMin ? DateMin : await Transaksi.findOne({ Tipe: Tipe ? Tipe : 'Transaksi' }, null, { sort: { 'TanggalTransaksi': 1 } })
        const NewestTransaksi = DateMax ? DateMax : await Transaksi.findOne({ Tipe: Tipe ? Tipe : 'Transaksi' }, null, { sort: { 'TanggalTransaksi': -1 } })
        const OldestDate = new Date(DateMin ? DateMin : OldestTransaksi.TanggalTransaksi)
        const NewestDate = new Date(DateMax ? DateMax : NewestTransaksi.TanggalTransaksi)
        const OldestDate_dd = OldestDate.getDate()
        const OldestDate_mm = OldestDate.getMonth()
        const OldestDate_yyyy = OldestDate.getFullYear()
        if (GrafikView === 'bulanan') {


            const NewestDate_mm = NewestDate.getMonth()
            const NewestDate_yyyy = NewestDate.getFullYear()
            const DivMonth = (NewestDate_mm - OldestDate_mm + ((12 * NewestDate_yyyy) - (12 * OldestDate_yyyy)))
            let i = 0
            while (i <= (DivMonth > 0 ? DivMonth : 0)) {
                const thisMonth = new Date(OldestDate_yyyy, OldestDate_mm + i)
                const nextMonth = new Date(OldestDate_yyyy, OldestDate_mm + (i + 1))
                const IntensitasBarang = []

                const DefatulTransaksiQuery = { Tipe: Tipe ? Tipe : 'Transaksi', TanggalTransaksi: { $gt: thisMonth, $lt: nextMonth }, ...IntensitasBarangTransaksiQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)

                const BarangList = (Kepemilikan || JenisBarang.length > 0 || Barang.length > 0) ? await Get_Barang_List(BarangQuery, 'Barcode', true) : null
                const BarangList_Barcode = BarangList ? BarangList.map(item => item.Barcode) : null
                ListTransaksi.forEach(element => {
                    const rawListTransaksi_DetailTransaksi = element.DetailTransaksi
                    const ListTransaksi_DetailTransaksi = BarangList_Barcode ? rawListTransaksi_DetailTransaksi.filter(item => BarangList_Barcode.includes(item.Barcode)) : rawListTransaksi_DetailTransaksi ////// do query
                    ListTransaksi_DetailTransaksi.forEach(element_element => {
                        const DetailTransaksi_Barcode = element_element.Barcode
                        const DetailTransaksi_NamaBarang = element_element.NamaBarang

                        const IndexBarang = IntensitasBarang.findIndex(item => item.Barcode === DetailTransaksi_Barcode)

                        if (IndexBarang >= 0) {
                            IntensitasBarang[IndexBarang].IntensitasBarangTransaksi = IntensitasBarang[IndexBarang].IntensitasBarangTransaksi + 1
                        } else {
                            const newBarangTransaksiHarian = {
                                Barcode: DetailTransaksi_Barcode,
                                NamaBarang: DetailTransaksi_NamaBarang,
                                IntensitasBarangTransaksi: 1
                            }
                            IntensitasBarang.push(newBarangTransaksiHarian)
                        }
                    })
                })
                const newIntensitasBarangTransaksi = {
                    Tanggal: thisMonth.toLocaleDateString(),
                    IntensitasBarangTransaksi: IntensitasBarang
                }
                IntensitasBarangTransaksi.push(newIntensitasBarangTransaksi)
                i = i + 1
            }
        } else if (GrafikView === 'harian') {
            const DivDays = (NewestDate - OldestDate) > 0 ? (NewestDate - OldestDate) / (24 * 3600 * 1000) : 1
            let i = 0
            while (i <= DivDays) {
                const thisDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + i)
                const nextDate = new Date(OldestDate_yyyy, OldestDate_mm, OldestDate_dd + (i + 1))
                const IntensitasBarang = []

                const DefatulTransaksiQuery = { Tipe: Tipe ? Tipe : 'Transaksi', TanggalTransaksi: { $gt: thisDate, $lt: nextDate }, ...IntensitasBarangTransaksiQuery }
                const ListTransaksi = await Get_Transaksi_List(DefatulTransaksiQuery, null, true)

                const BarangList = (Kepemilikan || JenisBarang.length > 0 || Barang.length > 0) ? await Get_Barang_List(BarangQuery, 'Barcode', true) : null
                const BarangList_Barcode = BarangList ? BarangList.map(item => item.Barcode) : null
                ListTransaksi.forEach(element => {
                    const rawListTransaksi_DetailTransaksi = element.DetailTransaksi
                    const ListTransaksi_DetailTransaksi = BarangList_Barcode ? rawListTransaksi_DetailTransaksi.filter(item => BarangList_Barcode.includes(item.Barcode)) : rawListTransaksi_DetailTransaksi ////// do query
                    ListTransaksi_DetailTransaksi.forEach(element_element => {
                        const DetailTransaksi_Barcode = element_element.Barcode
                        const DetailTransaksi_NamaBarang = element_element.NamaBarang

                        const IndexBarang = IntensitasBarang.findIndex(item => item.Barcode === DetailTransaksi_Barcode)

                        if (IndexBarang >= 0) {
                            IntensitasBarang[IndexBarang].IntensitasBarangTransaksi = IntensitasBarang[IndexBarang].IntensitasBarangTransaksi + 1
                        } else {
                            const newBarangTransaksiHarian = {
                                Barcode: DetailTransaksi_Barcode,
                                NamaBarang: DetailTransaksi_NamaBarang,
                                IntensitasBarangTransaksi: 1
                            }
                            IntensitasBarang.push(newBarangTransaksiHarian)
                        }
                    })
                })
                const newIntensitasBarangTransaksi = {
                    Tanggal: thisDate.toLocaleDateString(),
                    IntensitasBarangTransaksi: IntensitasBarang
                }
                IntensitasBarangTransaksi.push(newIntensitasBarangTransaksi)
                i = i + 1
            }
        } else {
            throw {
                msg: 'GrafikView tidak terdaftar',
            }
        }

        // console.log('Log: IntensitasBarangTransaksi', IntensitasBarangTransaksi)
        console.log('Help Graph query IntensitasBarangTransaksi dipanggil')
        return res.status(200)
            .json({
                IntensitasBarangTransaksi: IntensitasBarangTransaksi ? IntensitasBarangTransaksi : [],
                msg: 'Graph query IntensitasBarangTransaksi berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan Help Graph query IntensitasBarangTransaksi => ${err.errorDetail ? err.errorDetail : err}}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Help Graph query IntensitasBarangTransaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})
////// END-GRAPH


module.exports = router