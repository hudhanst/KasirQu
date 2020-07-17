const User = require('../../../Models/User')

////// GENERIC
exports.Get_UsetbyID = async (InputID) => {
    try {
        const UserDetail = await User.findById(InputID).exec()
        return UserDetail
    } catch (err) {
        console.log(`Erorr saat Get_UsetbyID => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_UsetbyID', errorDetail: err }
    }
}
////// END-GENERIC

////// NONGENERIC
////// END-NONGENERIC