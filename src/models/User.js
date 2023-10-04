const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Email không hợp lệ.',
        },
    },
    phone: {
        type: Number,
        unique: true,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
})

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const User = mongoose.model('User', Schema)

module.exports = User
