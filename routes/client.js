const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/clientController')

router.get('/products', ClientController.getAllProducts)
router.get('/products/:productId', ClientController.getProductById)

module.exports = router