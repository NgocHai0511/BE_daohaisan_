const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {
        account: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    // Kiểm tra xem mật khẩu có ít nhất 6 ký tự
                    return value.length >= 6
                },
                message: 'Mật khẩu phải có ít nhất 6 ký tự.',
            },
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Account = mongoose.model('Account', Schema)

module.exports = Account
