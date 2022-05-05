class Currency {
  constructor (price) {
    const currency = this.findCurrency(price)
    this.symbol = currency.symbol
    this.name = currency.name
    this.delimeter = currency.delimeter
    this.nroDecimals = currency.nroDecimals
    this.normalizedPrice = this.normalizePrice(price)
  }

  findCurrency (priceString){
    const currencyData = [
      {
        symbol: "€",
        name: "euro",
        delimeter: ".",
        nroDecimals: 2
      }
    ]

    for (const currency of currencyData) {
      if(priceString.indexOf(currency.sumbol))
      return currency
    }
  }

  normalizePrice (price) {
    if (typeof(price) === 'string') {
      let value = parseFloat(price)
      return value * (10 ** this.nroDecimals)
    }
  }

  formatPrice (price) {
    
    let formated = String(price) 
    let index = this.nroDecimals

    const firstPart = formated.substring(0, formated.length - index)
    const secondPart = formated.substring(formated.length - index, formated.length)

    return formated = firstPart + "." + secondPart + this.symbol;
  }
}

module.exports = Currency