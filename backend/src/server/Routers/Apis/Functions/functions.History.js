const History = require('../../../Models/History')
const { Get_UsetbyID } = require('./functions.User')

//// GENERIC
exports.Add_to_History = async (UserID, UserName, Location, Action, Change, Status) => {
    try {
        if (!(UserID || UserName) || !Location || !Action) {
            throw { msg: 'kesalahan pada proses penambahan History, data tidak lengkap' }
        }
        const User = UserName ? UserName : await Get_UsetbyID(UserID)
        const newHistory = new History({
            UserName: UserName ? UserName : User.UserName,
            Location: Location,
            Action: Action,
            Change: Change ? Change : null,
            Status: Status ? Status : true,
        })

        const history = await newHistory.save()
        if (history) {
            console.log('History ditambah')
            return isSaved = true
        } else {
            // return isSaved = false
            console.log(`Erorr saat penambahan History => ${err}`)
            throw { msg: 'ada kesalahan pada proses penambahan History', errorDetail: err }
        }

        // newHistory.save()
        //     .then((history) => {
        //         console.log('History ditambah')
        //         return isSaved = true
        //     })
        //     .catch(err => {
        //         console.log(`Erorr saat penambahan History => ${err}`)
        //         throw { msg: 'ada kesalahan pada proses penambahan History', errorDetail: err }
        //     })
    } catch (err) {
        console.log(`Erorr saat Add_to_History => ${err}`)
        throw { msg: 'ada kesalahan pada proses Add_to_History', errorDetail: err }
    }
}

exports.Get_History_List = async (query, select) => {
    try {
        const ListHistory = await History.find(query ? query : null, select ? select : null).exec()
        return ListHistory
    } catch (err) {
        console.log(`Erorr saat Get_History_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_History_List', errorDetail: err }
    }
}
////// END-GENERIC

////// NONGENERIC
////// END-NONGENERIC
