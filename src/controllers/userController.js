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

const login = async (req, res, next) => {
    try {
        let user_infor = await Account.aggregate([
            {
                $match: {
                    account: req.body.account,
                    password: req.body.password,
                }            
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'account_id',
                    as: 'user'
                }
            }]);
        if (user_infor.length === 1) {
            res.status(200).json({
                success: true,
                message: "đăng nhập thành công!",
                id: user_infor[0].user[0]._id,
                is_admin: user_infor[0].isAdmin,
            })
        } else {
            res.status(500).json({
                success: false,
                message: "tài khoản hoặc mật khẩu không đúng!",
            })
        }
    }catch (error) {
        res.status(402).json({
            err: error,
        })
    }
}
module.exports = { signup, login }
