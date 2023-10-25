const router = require('express').Router()
const userController = require('../controllers/userController')

//[GET] api/users
router.get('/users', userController.getAllUser)
//[GET] api/user/:id
router.get('/user/:id', userController.getUser)
//[POST] api/user/
router.post('/user', userController.createUser)
//[PUT] api/user
router.put('/user', userController.updateUser)

//[GET] api/user/cart/:id
router.get('/user/cart/:id', userController.getCart)

//[POST] api/user/addCartItem
router.post('/user/addCartItem', userController.addProductToCart)
//[PUT] api/user/removeCartItem
router.put('/user/removeCartItem', userController.removeProductFromCart)

module.exports = router
