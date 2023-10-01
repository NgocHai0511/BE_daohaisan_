const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/createAccount', userController.createUserAccount)
router.get('/json', userController.json)
module.exports = router
