const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// *** /api/user/signup
router.post('/signup', userController.signup)

module.exports = router
