const JenisBarang = require('../../../Models/JenisBarang')

//// GENERIC
exports.Get_JenisBarang_List = async (query, select, lean) => {
    try {
        const ListJenisBarang = await JenisBarang.find(query ? query : null, select ? select : null, { lean: lean ? lean : false }).exec()
        return ListJenisBarang
    } catch (err) {
        console.log(`Erorr saat Get_JenisBarang_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_JenisBarang_List', errorDetail: err }
    }
}

exports.Add_JenisBarang = async (Data) => {
    try {

        const NamaJenisBarang = Data.NamaJenisBarang ? Data.NamaJenisBarang : null
        const Kepemilikan = Data.Kepemilikan ? Data.Kepemilikan : null
        const Ket = Data.Ket ? Data.Ket : null

        if (!NamaJenisBarang || !Kepemilikan) {
            throw { msg: 'ada kesalahan pada proses Add_JenisBarang, data tidak lengkap' }
        }
        const newJenisBarang = new JenisBarang({
            NamaJenisBarang: NamaJenisBarang.toLocaleLowerCase(),
            Kepemilikan: Kepemilikan,
            Ket: Ket,
        })
        newJenisBarang.save()
        // return SaveStatus = true
    } catch (err) {
        console.log(`Erorr saat Get_JenisBarang_List => ${typeof err === 'object' ? JSON.stringify(err) : err}`)
        throw {
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Get_JenisBarang_List',
            // SaveStatus: err.SaveStatus ? err.SaveStatus : false, 
            errorDetail: err
        }
    }
}
////// END-GENERIC

////// NONGENERIC
////// END-NONGENERIC