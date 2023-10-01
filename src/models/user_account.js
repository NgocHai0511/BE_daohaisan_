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

// us_ac_Schema.plugin(autoIncrement.plugin, {
//     model: 'User',
//     field: 'user_id',
//     startAt: 1,
//     incrementBy: 1,
// })

module.exports = mongoose.model('User_account', us_ac_Schema)
