const History = require('../../../Models/History')

//// GENERIC
exports.Add_to_History = async (UserName, Location, Action) => {
    try {
        const newHistory = new History({
            UserName: UserName,
            Location: Location,
            Action: Action,
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
        console.log(`Erorr saat Get_History_List => ${err}`)
        throw { msg: 'ada kesalahan pada proses Get_History_List', errorDetail: err }
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
