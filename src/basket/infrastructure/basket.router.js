const express = require('express')
const router = express.Router()
const controller = require('./basket.controller')

router.get('/:id', controller.getById )

router.get('/:id/checkout/total', controller.getCheckoutTotal )

router.post('/', controller.create )

router.put('/', controller.update )

router.delete('/:id', controller.remove )

router.post('/:id/products', controller.addProduct )

module.exports = router