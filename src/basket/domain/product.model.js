const Currency = require('./currency.model')

class Product {
  constructor (product){
    this.code = product.code
    this.name = product.name
    this.price = product.price
    this.discount = product.discount
    this.discountRule = product.discountRule
    this.discounThreshold = product.discounThreshold
    this.normPrice = this.parsePrice(product.price)
  }

  parsePrice (price) {
    this.currency = typeof(price) === "string" ? new Currency(price) : null
    let parsedPrice = this.currency ? this.currency.normalizePrice(price) : price
    return parsedPrice
  }
}

module.exports = Product