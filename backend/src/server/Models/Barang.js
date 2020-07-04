const mongoose = require('mongoose')

const BarangSchema = new mongoose.Schema({
    Barcode: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Jenis: {
        type: String,
        required: true,
    },
    Stok: {
        type: Number,
        default: 0,
    },
    isDecimal: {
        type: Boolean,
        default: true
    },
    HargaModal: {
        type: Number,
        default: 0,
    },
    HargaJual: {
        type: Number,
        default: 0,
    },
    SatuanJual: {
        type: Array
    },
    Ket: {
        type: String,
    },
    BarangPic: {
        type: String,
    },
})

module.exports = Barang = mongoose.model('Barang', BarangSchema)