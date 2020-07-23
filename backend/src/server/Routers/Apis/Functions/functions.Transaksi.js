const Transaksi = require('../../../Models/Transaksi')
const Barang = require('../../../Models/Barang')

const { Add_to_History } = require('./functions.History')

////// GENERIC
exports.Get_Transaksi_List = async (query, select, lean) => {
    try {
        const ListTransaksi = await Transaksi.find(query ? query : null, select ? select : null, { lean: lean ? lean : false }).exec()
        return ListTransaksi
    } catch (err) {
        console.log(`Erorr saat Get_Transaksi_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_Transaksi_List', errorDetail: err }
    }
}
////// END-GENERIC

////// NONGENERIC
exports.Add_Transaksi_Belanja = async (Data, UserId) => {
    try {
        const Id = Data.Id ? Data.Id : null
        const NamaKasir = Data.NamaKasir ? Data.NamaKasir : null
        const TanggalTransaksi = Data.TanggalTransaksi ? new Date(Data.TanggalTransaksi) : null
        const Tipe = Data.Tipe ? Data.Tipe : null
        const DetailTransaksi = Data.DetailTransaksi ? Data.DetailTransaksi : []
        const Diskon = Data.Diskon ? Data.Diskon : 0
        const PotonganHarga = Data.PotonganHarga ? Data.PotonganHarga : 0
        const TotalPembayaran = Data.TotalPembayaran ? Data.TotalPembayaran : 0
        const Ket = Data.Ket ? Data.Ket : null

        if (!NamaKasir || !Tipe || DetailTransaksi.length < 1 || TotalPembayaran < 1) {
            throw { msg: 'ada kesalahan pada proses Add_Transaksi_Belanja, data tidak lengkap' }
        }

        for (const element of DetailTransaksi) {
            const DetailTransaksi_Id = element.Id ? element.Id : null
            const DetailTransaksi_Jumlah = element.Jumlah ? element.Jumlah : 0
            const DetailTransaksi_HargaModal = element.HargaModal ? element.HargaModal : 0
            const DetailTransaksi_HargaJual = element.HargaJual ? element.HargaJual : 0
            if (!DetailTransaksi_Id || DetailTransaksi_Jumlah < 1 || DetailTransaksi_HargaModal < 1 || DetailTransaksi_HargaJual < 1) {
                throw { msg: 'ada kesalahan pada proses Add_Transaksi_Belanja, DetailTransaksi tidak lengkap' }
            }
            const OldBarang = await Barang.update({
                _id: DetailTransaksi_Id,
                "SatuanJual.NamaSatuan": "satuan"
            }, {
                $set: {
                    HargaModal: DetailTransaksi_HargaModal,
                    HargaJual: DetailTransaksi_HargaJual,
                    "SatuanJual.$.HargaJual": DetailTransaksi_HargaJual
                },
                $inc: {
                    Stok: DetailTransaksi_Jumlah
                }
            })
            Add_to_History(UserId, null, 'Barang/Transaksi/Belanja', 'Belanja/Update', JSON.stringify(OldBarang), true)
        }
        const newTransaksi = new Transaksi({
            _id: Id,
            NamaKasir: NamaKasir,
            TanggalTransaksi: TanggalTransaksi - 1 > 0 ? TanggalTransaksi : null,
            Tipe: Tipe,
            DetailTransaksi: DetailTransaksi,
            Diskon: Diskon,
            PotonganHarga: PotonganHarga,
            TotalPembayaran: TotalPembayaran,
            Ket: Ket,
        })

        // console.log('newTransaksi', newTransaksi)
        newTransaksi.save()
    } catch (err) {
        console.log(`Erorr saat Add_Transaksi_Belanja => ${err}`)
        throw {
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Add_Transaksi_Belanja',
            errorDetail: err
        }
    }
}

exports.Add_Transaksi_Transaksi = async (Data, UserId) => {
    try {
        const Id = Data.Id ? Data.Id : null
        const NamaKasir = Data.NamaKasir ? Data.NamaKasir : null
        const TanggalTransaksi = Data.TanggalTransaksi ? new Date(Data.TanggalTransaksi) : null
        const Tipe = Data.Tipe ? Data.Tipe : null
        const DetailTransaksi = Data.DetailTransaksi ? Data.DetailTransaksi : []
        const Diskon = Data.Diskon ? Data.Diskon : 0
        const PotonganHarga = Data.PotonganHarga ? Data.PotonganHarga : 0
        const TotalPembayaran = Data.TotalPembayaran ? Data.TotalPembayaran : 0
        const Ket = Data.Ket ? Data.Ket : null

        if (!NamaKasir || !Tipe || DetailTransaksi.length < 1 || TotalPembayaran < 1) {
            throw { msg: 'ada kesalahan pada proses Add_Transaksi_Transaksi, data tidak lengkap' }
        }

        for (const element of DetailTransaksi) {
            const DetailTransaksi_Id = element.Id ? element.Id : null
            const DetailTransaksi_TotalBarang = element.TotalBarang ? element.TotalBarang : 0
            if (!DetailTransaksi_Id || DetailTransaksi_TotalBarang < 1) {
                throw { msg: 'ada kesalahan pada proses Add_Transaksi_Belanja, DetailTransaksi tidak lengkap' }
            }
            const OldBarang = await Barang.findByIdAndUpdate(DetailTransaksi_Id, {
                $inc: { Stok: -DetailTransaksi_TotalBarang }
            })
            Add_to_History(UserId, null, 'Barang/Transaksi/Transaksi', 'Transaksi/Update', JSON.stringify(OldBarang), true)
        }

        const newTransaksi = new Transaksi({
            _id: Id,
            NamaKasir: NamaKasir,
            TanggalTransaksi: TanggalTransaksi - 1 > 0 ? TanggalTransaksi : null,
            Tipe: Tipe,
            DetailTransaksi: DetailTransaksi,
            Diskon: Diskon,
            PotonganHarga: PotonganHarga,
            TotalPembayaran: TotalPembayaran,
            Ket: Ket,
        })

        // console.log('newTransaksi', newTransaksi)
        newTransaksi.save()
    } catch (err) {
        console.log(`Erorr saat Add_Transaksi_Transaksi => ${err}`)
        throw {
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Add_Transaksi_Transaksi',
            errorDetail: err
        }
    }
}
////// END-NONGENERIC