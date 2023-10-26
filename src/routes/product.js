const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { upload } = require('../config/setupfirebase.js')

//GET --- api/user/products
router.get('/products', productController.getAllProducts)
//GET -- api/user/products/:searchstring
router.get('/products/:searchstring', productController.searchProducts)
//GET --- api/user/product/:id
router.get('/product/:id', productController.getSingleProduct)
//POST -- api/user/product
router.post('/product', upload.single("imageUrl") , productController.createProduct)
//PUT --api/user/product
router.put('/product/', upload.single("imageUrl"), productController.updateProduct)
//POST --api/user/product
router.post('/product', productController.createProduct)
//DELETE --api/user/product
router.delete('/product/:id', productController.deleteProduct)
module.exports = router
