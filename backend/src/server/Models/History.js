const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    Tanggal: {
        type: Date,
        default: Date.now,
    },
    Action: {
        type: String,
        required: true,
    },
    Change:{
        type: String,
    },
    Status:{
        type: Boolean,
    }
})

module.exports = History = mongoose.model('History', HistorySchema)