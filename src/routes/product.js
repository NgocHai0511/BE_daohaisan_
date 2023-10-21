const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// *** /api/user/signup
router.get('/getallproducts', productController.getAllProducts)
router.get('/getproduct/:searchstring', productController.getProduct)
router.put('/updateproduct/', productController.updateProduct)
router.post('/createproduct', productController.createProduct)
router.delete('/deleteproduct/:id', productController.deleteProduct)
module.exports = router
