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
router.get('/list', auth, async (req, res) => {
    // console.log('list')
    try {
        const date = new Date()
        const dd = date.getDate()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()
        const currentdate = new Date(yyyy, mm, dd)
        const nextdate = new Date(yyyy, mm, dd + 1)
        const ListTransaksi = await Get_Transaksi_List({ TanggalTransaksi: { $gt: currentdate, $lt: nextdate } }, '_id NamaKasir TanggalTransaksi Tipe TotalPembayaran')

        console.log('Transaksi list dipanggil')
        return res.status(200)
            .json({
                ListTransaksi: ListTransaksi ? ListTransaksi : [],
                msg: 'Transaksi list berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan list Transaksi => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan list Transaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  Post api/transaksi/querylist
//// @desc    Post Transaksi query transaksi List
//// @access  Private
router.post('/querylist', auth, async (req, res) => {
    // console.log('querylist')
    // console.log(req.body)
    try {
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
        // console.log(TransaksiQueryQueryList)

        const ListTransaksi = await Get_Transaksi_List(TransaksiQueryQueryList, '_id NamaKasir TanggalTransaksi Tipe TotalPembayaran')

        console.log('Transaksi querylist dipanggil')
        return res.status(200)
            .json({
                ListTransaksi: ListTransaksi ? ListTransaksi : [],
                msg: 'Transaksi querylist berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan querylist Transaksi => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan querylist Transaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/transaksi/detail/:id
//// @desc    Get Transaksi detail
//// @access  Private
router.get('/detail/:id', auth, async (req, res) => {
    // console.log('detail/:id')
    try {
        const transaksi = await Transaksi.findById(req.params.id)

        console.log(`Transaksi detail dipanggil = ${req.params.id}`)
        return res.status(200)
            .json({
                transaksi: transaksi ? transaksi : null,
                msg: 'Transaksi detail berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan detail Transaksi => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan detail Transaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/transaksi/transaksi/tambah
//// @desc    Add new Transaksi transaksi
//// @access  Private
router.post('/transaksi/tambah', auth, async (req, res) => {
    // console.log('transaksi/tambah')
    // console.log(req.body)
    try {
        const { NamaKasir, DetailTransaksi, TotalPembayaran } = req.body
        const UserId = req.user.id
        if (!NamaKasir || DetailTransaksi.length < 1 || TotalPembayaran < 1) {
            throw {
                msg: 'data yang dikirimkan kurang'
            }
        }

        const TransaksiBarang = []
        ////// recreate Transaksi
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

        for (const element of TransaksiBarang) {
            const TransaksiBarang_Barcode = element.Barcode ? element.Barcode : null
            const TransaksiBarang_TotalBarang = element.TotalBarang ? element.TotalBarang : 0
            if (!TransaksiBarang_Barcode || TransaksiBarang_TotalBarang < 1) {
                throw {
                    msg: `Transaksi Data Tidak Lengkap/salah ${JSON.parse(TransaksiBarang)}`
                }
            }
            const BarangDetail = await Barang.findOne({ Barcode: TransaksiBarang_Barcode })
            if (!BarangDetail) {
                throw {
                    msg: `barang yang dimasukkan tidak ditemukan barcode=${TransaksiBarang_Barcode}`
                }
            }
            const BarangDetail_Stok = BarangDetail.Stok
            if (BarangDetail_Stok < TransaksiBarang_TotalBarang) {
                throw {
                    msg: `stok barang tidak mencukupi barcode=${TransaksiBarang_Barcode}`
                }
            }
        }
        const newTransaksi = ({
            NamaKasir: NamaKasir,
            Tipe: 'Transaksi',
            DetailTransaksi: DetailTransaksi,
            Diskon: req.body.Diskon ? req.body.Diskon : 0,
            PotonganHarga: req.body.PotonganHarga ? req.body.PotonganHarga : 0,
            TotalPembayaran: TotalPembayaran,
            Ket: req.body.Ket ? req.body.Ket : null
        })

        Add_Transaksi_Transaksi(newTransaksi, UserId)
        Add_to_History(UserId, null, 'Transaksi/Transaksi', 'Add', JSON.stringify(newTransaksi), true)

        console.log('Transaksi Transaksi ditambah')
        return res.status(200)
            .json({
                msg: 'Transaksi Transaksi  berhasil ditambah'
            })

    } catch (err) {
        console.log(`Erorr saat penambahan Transaksi Transaksi => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses penambahan Transaksi Transaksi',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/transaksi/belanja/tambah
//// @desc    Add new Transaksi belanja
//// @access  Private
router.post('/belanja/tambah', auth, async (req, res) => {
    // console.log('belanja/tambah')
    // console.log(req.body)
    try {
        const { NamaKasir, DetailTransaksi, TotalPembayaran } = req.body
        const UserId = req.user.id
        if ((!NamaKasir) || DetailTransaksi.length < 1 || TotalPembayaran < 1) {
            throw {
                msg: 'data yang dikirimkan kurang'
            }
        }

        for (const element of DetailTransaksi) {
            const DetailTransaksi_Barcode = element.Barcode ? element.Barcode : null
            const DetailTransaksi_HargaModal = element.HargaModal ? element.HargaModal : 0
            const DetailTransaksi_HargaJual = element.HargaJual ? element.HargaJual : 0
            const DetailTransaksi_Jumlah = element.Jumlah ? element.Jumlah : 0
            if (!DetailTransaksi_Barcode || DetailTransaksi_HargaModal < 1 || DetailTransaksi_HargaJual < 1 || DetailTransaksi_Jumlah < 1) {
                throw {
                    msg: 'DetailTransaksi kurang, data tidak boleh kosong atau kurang dari 1'
                }
            }
            const BarangDetail = await Barang.findOne({ Barcode: DetailTransaksi_Barcode })
            if (!BarangDetail) {
                throw {
                    msg: `barang yang dimasukkan tidak ditemukan barcode=${DetailTransaksi_Barcode}`
                }
            }
        }

        const newTransaksi = new Transaksi({
            NamaKasir: NamaKasir,
            Tipe: 'Belanja',
            DetailTransaksi: DetailTransaksi,
            TotalPembayaran: TotalPembayaran,
            Ket: req.body.Ket ? req.body.Ket : null
        })

        Add_Transaksi_Belanja(newTransaksi, UserId)
        Add_to_History(UserId, null, 'Transaksi/Belanja', 'Add', JSON.stringify(newTransaksi), true)

        console.log('Transaksi Belanja ditambah')
        return res.status(200)
            .json({
                msg: 'Transaksi Belanja  berhasil ditambah'
            })

    } catch (err) {
        console.log(`Erorr saat penambahan Transaksi Belanja => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses penambahan Transaksi Belanja',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }

})

//// @router  POST api/transaksi/export
//// @desc    Add Export Transaksi
//// @access  Private
router.post('/export', auth, async (req, res) => {
    // console.log('transaksi/export')
    // console.log(req.body)
    try {
        const UserId = req.user.id
        const RequestExportList = req.body.ExportData
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
        console.log(`Erorr saat pemanggilan Transaksi Export => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
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
    try {
        const { ImportData } = req.body
        const UserId = req.user.id
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
                Add_to_History(UserId, null, 'Transaksi/Belanja', 'Import/Add', JSON.stringify(newTransaksi), true)
            } else if (Tipe === 'Transaksi') {
                Add_Transaksi_Transaksi(newTransaksi, UserId)
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
        console.log(`Erorr saat pemanggilan Transaksi Import => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan Transaksi Import',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})


module.exports = router