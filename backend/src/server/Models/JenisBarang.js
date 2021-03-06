const mongoose = require('mongoose')

const JenisBarangSchema = new mongoose.Schema({
    NamaJenisBarang: {
        type: String,
        unique: true,
        required: true,
    },
    Kepemilikan: {
        type: String,
        required: true
    },
    Ket: {
        type: String,
    }
})

module.exports = JenisBarang = mongoose.model('JenisBarang', JenisBarangSchema)