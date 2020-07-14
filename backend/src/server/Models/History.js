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
    Location: {
        type: String,
        required: true,
    },
    Action: {
        type: String,
        required: true,
    },
})

module.exports = History = mongoose.model('History', HistorySchema)