const router = require('express').Router()
const userController = require('../controllers/userController')
const orderController = require('../controllers/orderController')
const { upload } = require('../config/setupfirebase')

//[GET] api/users
router.get('/users', userController.getAllUser)
//[GET] api/customers
router.get('/customers', userController.getAllCustomer)
//[GET] api/user/:id
router.get('/user/:id', userController.getUser)
//[POST] api/user/
router.post('/user', userController.createUser)
//[PUT] api/user
router.put('/user', upload.single('avatarUrl'), userController.updateUser)

//[GET] api/user/cart/:id
router.get('/user/cart/:id', userController.getCart)
//[POST] api/user/addCartItem
router.post('/user/addCartItem', userController.addProductToCart)
//[PUT] api/user/removeCartItem
router.put('/user/removeCartItem', userController.removeProductFromCart)

//[GET] api/order
router.get('/orders', orderController.getAllOrder)
//[GET] api/order:userId
router.get('/orders/:userId', orderController.getOrderByUserId)
//[POST] api/order
router.post('/order', orderController.createOrder)

module.exports = router
