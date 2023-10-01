const User_account = require('../models/user_account')

const createUserAccount = async (req, res) => {
    try {
        console.log(req.body)
        const { user_account, user_password, user_role } = req.body
        const newUserAccount = new User_account({
            user_account,
            user_password,
            user_role,
        })
        await newUserAccount.save()
        res.status(201).json(newUserAccount)
        console.log(req.body)
    } catch (err) {
        console.error('Error creating User Account', err)
        res.status(509).json({ error: 'Unable to create User' })
    }
}

const json = (req, res, next) => {
    // res.status(123).json({ hello: 'dnh' })
    console.log('hello home')
    res.status(201).json({ hehe: 'dnh' })
}

module.exports = {
    createUserAccount,
    json,
}
