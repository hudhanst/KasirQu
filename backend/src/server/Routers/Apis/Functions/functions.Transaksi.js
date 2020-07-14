const Transaksi = require('../../../Models/Transaksi')

exports.Get_Transaksi_List = async (query, select) => {
    try {
        const ListTransaksi = await Transaksi.find(query ? query : null, select ? select : null).exec()
        return ListTransaksi
    } catch (err) {
        console.log(`Erorr saat Get_Transaksi_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_Transaksi_List', errorDetail: err }
    }
}