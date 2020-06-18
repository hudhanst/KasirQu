const mongoose = require('mongoose')

const config_tokoIdentitas = require('../config/keys').tokoIdentitas

const TokoSchema = new mongoose.Schema({
    Identitas: {
        type: String,
        default: config_tokoIdentitas,
    },
    NamaToko: {
        type: String,
        required: true,
    },
    Alamat: {
        type: String,
        required: true,
    },
    Kontak: {
        type: String,
    },
    Logo: {
        type: String,
    }
})

module.exports = Toko = mongoose.model('Toko', TokoSchema)