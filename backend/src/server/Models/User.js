const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isKasir: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperUser: {
        type: Boolean,
        default: false,
    },
    LastActive: {
        type: Date,
        default: Date.now,
    },
    RegisterDate: {
        type: Date,
        default: Date.now,
    },
    ProfilePicture: {
        type: String,
        default: null
    }
})
module.exports = User = mongoose.model('User', UserSchema)