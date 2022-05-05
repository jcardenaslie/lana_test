
class ProductGroup {
  constructor (product) {
    this.code = product.code
    this.unitPrice = product.normPrice
    this.total = product.normPrice
    this.discount = new DiscountFactory(product)
    this.totalDiscount = 0
    this.discountRule = product.discountRule
    this.quantity = 1
  }

  addItem (product) {

    if (product.code !== this.code) {
      throw new Error("Operation not permited")
    }

    this.quantity += 1
    this.totalDiscount = this.discount.getDiscount(this.quantity)
    this.total = (this.quantity * this.unitPrice ) - this.totalDiscount
  }
}

class DiscountFactory {
  constructor(product) {
    switch (product.discountRule) {
      case "two-one-free":
        return new DiscountTwoOneFree(product)
      case "threshold":
        return new DiscountThreshold(product)
      default:
        return new DiscountEmpty(product)
    }
  }
}

class DiscountTwoOneFree {
  constructor(product) {
    this.discount = product.discount
    this.unitPrice = product.normPrice
  }

  getDiscount (quantity) {
    if (quantity === 1)
      return 0
    
    let remnant = quantity % 2
    let division = Math.floor(quantity / 2)

    const promoPrice = (( (quantity - remnant) * this.unitPrice  * this.discount));

    return promoPrice
  }
}

class DiscountThreshold {
  constructor(product){
    this.discount = product.discount
    this.threshold = product.discounThreshold
    this.unitPrice = product.normPrice
  }
  getDiscount (quantity) {
    
    if (quantity < this.threshold) {
      return 0
    }

    return quantity * (this.unitPrice * this.discount)
  }
}

class DiscountEmpty {
  constructor(product){
  }
  getDiscount (quantity) {
    
    return 0
  }
}

module.exports = ProductGroup