const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const BasketRoute = require('./basket/infrastructure/basket.router')

const app = express()

/**
 * Middlewares
 */
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/**
 * Routes
 */
app.use('/baskets', BasketRoute)


/**
 * Server Start
 */
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})