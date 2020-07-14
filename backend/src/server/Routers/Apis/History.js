const express = require('express')
const router = express.Router()

const auth = require('../Middleware/auth')

const { Get_History_List } = require('./Functions/functions.History')

//// @router  GET api/history/list
//// @desc    Get History list
//// @access  Private
router.get('/list', auth, async (req, res) => {
    try {
        // const date = new Date()
        // const mm = date.getUTCMonth()
        // const yyyy = date.getUTCFullYear()
        // const now = new Date(yyyy, mm)
        // const next = new Date(yyyy, mm + 1)

        const HistoryList = await Get_History_List()
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

module.exports = router