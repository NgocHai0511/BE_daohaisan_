const Account = require('../models/Account')
const User = require('../models/User')

const signup = (req, res, next) => {
    const isAdmin = false
    const { account, password, full_name, email, phone, gender, address } = req.body

    const newAccount = new Account({ account, password, isAdmin })
    newAccount
        .save()
        .then((new_account) => {
            const account_id = new_account._id
            const newUser = new User({
                account_id,
                full_name,
                email,
                phone,
                gender,
                address,
            })
            newUser
                .save()
                .then((new_user) => {
                    console.log('success')
                    res.status(201).json({ message: 'success', data: { new_account, new_user } })
                })
                .catch((err) => {
                    Account.findByIdAndRemove(account_id)
                        .then(() => {
                            console.log('Cancel Create Account')
                        })
                        .catch((removeErr) => {
                            console.log('Remove Error:', removeErr)
                        })
                    console.log(err)
                    res.status(500).json({
                        message: 'User creation failed',
                        error: err,
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: 'Account creation failed',
                error: err,
            })
        })
}
module.exports = { signup }
