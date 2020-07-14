const Barang = require('../../../Models/Barang')

exports.Get_Barang_List = async (query, select) => {
    try {
        const ListBarang = await Barang.find(query ? query : null, select ? select : null).exec()
        return ListBarang
    } catch (err) {
        console.log(`Erorr saat Get_Barang_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_Barang_List', errorDetail: err }
    }
}