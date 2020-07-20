const express = require('express')
const router = express.Router()
const path = require('path')

const auth = require('../Middleware/auth')

const History = require('../../Models/History')

const { Get_History_List } = require('./Functions/functions.History')
const { Get_UserbyID } = require('./Functions/functions.User')
const { Create_Excel_File } = require('./Functions/functions.functions')

//// @router  GET api/history/list
//// @desc    Get History list
//// @access  Private
router.get('/list', auth, async (req, res) => {
    try {
        const date = new Date()
        const dd = date.getUTCDate()
        const mm = date.getUTCMonth()
        const yyyy = date.getUTCFullYear()
        const currentdate = new Date(yyyy, mm, dd)
        const nextdate = new Date(yyyy, mm, dd + 1)

        const HistoryList = await Get_History_List({ Tanggal: { $gt: currentdate, $lt: nextdate } }, null)
        console.log('HistoryList dipanggil')
        return res.status(200)
            .json({
                HistoryList: HistoryList ? HistoryList : [],
                msg: 'History List berhasil dipanggil'
            })

    } catch (err) {
        console.log(`Erorr saat pemanggilan History List => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan History List',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/history/querylist
//// @desc    Post History querylist
//// @access  Private
router.post('/querylist', auth, async (req, res) => {
    // console.log('api/history/querylist')
    // console.log(req.body)
    const UserName = req.body.UserName ? req.body.UserName : null
    const DateMin = req.body.DateMin ? req.body.DateMin : null
    const DateMax = req.body.DateMax ? req.body.DateMax : null
    const Location = req.body.Location ? req.body.Location : []
    const Action = req.body.Action ? req.body.Action : []
    const Status = ((req.body.Status === true || req.body.Status === 'true') || (req.body.Status === false || req.body.Status === 'false')) ? req.body.Status : null
    try {
        const HistoryQuery = {}
        if (UserName) {
            Object.assign(HistoryQuery, { UserName: UserName })
        }
        if (DateMin || DateMax) {
            if (DateMin && DateMax) {
                Object.assign(HistoryQuery, { Tanggal: { $gt: DateMin, $lt: DateMax } })
            } else if (DateMin) {
                Object.assign(HistoryQuery, { Tanggal: { $gt: DateMin } })
            } else if (DateMax) {
                Object.assign(HistoryQuery, { Tanggal: { $lt: DateMax } })
            }
        }
        if (Location.length > 0) {
            Object.assign(HistoryQuery, { Location: { $in: Location } })
        }
        if (Action.length > 0) {
            Object.assign(HistoryQuery, { Action: { $in: Action } })
        }
        if (Status !== null) {
            Object.assign(HistoryQuery, { Status: Status })
        }

        // console.log('HistoryQuery', HistoryQuery)
        const QueryHistory = await Get_History_List(HistoryQuery, null)

        console.log('History querylist dipanggil')
        return res.status(200)
            .json({
                QueryHistory: QueryHistory ? QueryHistory : [],
                msg: 'History querylist berhasil dipanggil'
            })


    } catch (err) {
        console.log(`Erorr saat pemanggilan History querylist => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan History querylist',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/history/detail/:id
//// @desc    Get History detail
//// @access  Private
router.get('/detail/:id', auth, async (req, res) => {
    // console.log('api/history/detail/:id')
    try {
        const HistoryDetail = await History.findById(req.params.id)
        console.log(`History detail dipanggil = ${req.params.id}`)
        return res.status(200)
            .json({
                HistoryDetail: HistoryDetail ? HistoryDetail : [],
                msg: 'History detail berhasil dipanggil'
            })
    } catch (err) {
        console.log(`Erorr saat pemanggilan detail History => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan detail History',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  POST api/history/export
//// @desc    Add Export History
//// @access  Private
router.post('/export', auth, async (req, res) => {
    // console.log('history/export')
    // console.log(req.body)
    const UserId = req.user.id
    const RequestExportList = req.body.ExportData
    try {
        if (!RequestExportList.length > 0) {
            throw {
                msg: 'form tidak lengkap',
            }
        }
        const RequestList = RequestExportList.map(requestexportlist => requestexportlist._id)

        const ExportData = await Get_History_List({ _id: { $in: RequestList } }, null, true)

        const UserDetail = await Get_UserbyID(UserId)
        const Location = 'History'
        const ExcelFile = await Create_Excel_File(UserDetail.UserName, Location, ExportData)
        const filePath = path.join(__dirname, `../../../../downloads/${Location}/${ExcelFile}`)

        return res.download(filePath)
    } catch (err) {
        console.log(`Erorr saat pemanggilan History Export => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan History Export',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})
module.exports = router