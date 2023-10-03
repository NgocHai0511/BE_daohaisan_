const mongoose = require('mongoose')
// const autoIncrement = require('mongoose-auto-increment')

const us_ac_Schema = new mongoose.Schema({
    user_account: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    user_role: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User_account', us_ac_Schema)
