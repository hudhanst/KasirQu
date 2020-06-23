const mongoose = require('mongoose')

const TransaksiSchema = new mongoose.Schema({
    NamaKasir: {
        type: String,
        required: true,
    },
    TanggalTransaksi: {
        type: Date,
        default: Date.now,
    },
    Tipe: {
        type: String,
        required: true,
    },
    DetailTransaksi: {
        type: Array,
        required: true,
    },
    Diskon: {
        type: Number,
        default: 0,
    },
    TotalPembayaran: {
        type: Number,
        required: true
    },
    Ket: {
        type: String
    }
})

module.exports = Transaksi = mongoose.model('Transaksi', TransaksiSchema)