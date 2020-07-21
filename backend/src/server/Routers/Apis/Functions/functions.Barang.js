const Barang = require('../../../Models/Barang')

//// GENERIC
exports.Get_Barang_List = async (query, select, lean) => {
    try {
        const ListBarang = await Barang.find(query ? query : null, select ? select : null, { lean: lean ? lean : false }).exec()
        return ListBarang
    } catch (err) {
        console.log(`Erorr saat Get_Barang_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_Barang_List', errorDetail: err }
    }
}

exports.Add_Barang = async (Data) => {
    try {
        const Barcode = Data.Barcode ? Data.Barcode : null
        const Name = Data.Name ? Data.Name : null
        const Jenis = Data.Jenis ? Data.Jenis : null
        const Stok = Data.Stok ? Data.Stok : 0
        const isDecimal = Data.isDecimal ? Data.isDecimal : true
        const HargaModal = Data.HargaModal ? Data.HargaModal : 0
        const HargaJual = Data.HargaJual ? Data.HargaJual : 0
        const SatuanJual = Data.SatuanJual ? Data.SatuanJual : { NamaSatuan: 'satuan', MinBarang: 1, HargaJual: 0 }
        const Ket = Data.Ket ? Data.Ket : null
        const BarangPic = Data.BarangPic ? Data.BarangPic : null

        if (!Barcode || !Name || !Jenis) {
            throw { msg: 'ada kesalahan pada proses Add_Barang, data tidak lengkap' }
        }
        const newBarang = new Barang({
            Barcode: Barcode.toString().toLocaleLowerCase(),
            Name: Name.toString().toLocaleLowerCase(),
            Jenis: Jenis.toString().toLocaleLowerCase(),
            Stok: Stok,
            isDecimal: isDecimal,
            HargaModal: HargaModal,
            HargaJual: HargaJual,
            SatuanJual: SatuanJual,
            Ket: Ket,
            BarangPic: BarangPic,
        })
        newBarang.save()
    } catch (err) {
        console.log(`Erorr saat Add_Barang => ${err}`)
        throw {
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Add_Barang',
            errorDetail: err
        }
    }
}
////// END-GENERIC

////// NONGENERIC
////// END-NONGENERIC