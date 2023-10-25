const { auto_create_id_order } = require('../config/generateId')
const Order = require('../models/Order')

exports.createOrder = async (req, res) => {
    const { userId, products, status, totalPrice, paymentInfo } = req.body
    const id = await auto_create_id_order()
    const order = new Order({
        id,
        userId,
        products,
        status,
        totalPrice,
        paymentInfo,
    })

    order
        .save()
        .then((user) => {
            res.status(200).json({ message: 'Create Successfully', data: { newOrder: order } })
        })
        .catch((err) => res.status(500).json({ message: 'Có lỗi xảy ra', err: err }))
}

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({ message: 'Successfully!', data: { orders: orders } })
    } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra', err: err })
    }
}

exports.getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const orders = await Order.find({ userId: userId })
        res.status(200).json({ message: 'Successfully!', orders: orders })
    } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra', err: err })
    }
}
