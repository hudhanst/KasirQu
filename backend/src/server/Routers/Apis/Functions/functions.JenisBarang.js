const JenisBarang = require('../../../Models/JenisBarang')

exports.Get_JenisBarang_List = async (query, select) => {
    try {
        const ListJenisBarang = await JenisBarang.find(query ? query : null, select ? select : null).exec()
        return ListJenisBarang
    } catch (err) {
        console.log(`Erorr saat Get_JenisBarang_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_JenisBarang_List', errorDetail: err }
    }
}