const { v4: uuidv4 } = require('uuid');

const productsData = [
  {
    "code": "PEN",
    "name": "Lan Pen",
    "price": "5.00€",
    "discount": 0.5,
    "discountRule": "two-one-free"
  },
  {
    "code": "TSHIRT",
    "name": "Lan T-Shirt",
    "price": "20.00€",
    "discount": 0.25,
    "discountRule": "threshold",
    "discounThreshold": 3
  },
  {
    "code": "MUG",
    "name": "Lan Coffee Mug",
    "price": "7.50€"
  },
]

let basketsData = [{
  "items": [
      {
          "code": "PEN",
          "name": "Lan Pen",
          "price": "5.00€",
          "discount": 0.5,
          "discountRule": "two-one-free",
          "currency": {
              "symbol": "€",
              "name": "euro",
              "delimeter": ".",
              "nroDecimals": 2,
              "normalizedPrice": 500
          },
          "normPrice": 500
      }
  ],
  "itemsGroups": [
      {
          "code": "PEN",
          "unitPrice": 500,
          "total": 500,
          "discount": {
              "discount": 0.5,
              "unitPrice": 500
          },
          "totalDiscount": 0,
          "discountRule": "two-one-free",
          "quantity": 1
      }
  ],
  "checkoutTotal": 500,
  "id": "5a4d7012-80c2-4899-a961-3a049338fc2a"
}]

const products = {
  getByCodeList (codeList) {
    const result = []
    for (const code of codeList) {
      let product = productsData.find( p => p.code === code)
      result.push (product)
    }

    return result
  },
  getByCode(code){
    return productsData.find( p => p.code === code)
  }
}

const baskets = {
  create (basket) {
    const uuid = uuidv4()
    basket.id = uuid

    basketsData.push(basket)
    
    return basket
  },
  getAll (){
    return basketsData
  },
  getById(id) {
    const basket = basketsData.find( b => b.id === id)

    return basket
  },
  remove(id) {
    let index = -1
    let count = 0

    for (const basket of basketsData) {
      
      index += 1
      if (basket.id === id) {
        index = count
      }
      count++
    }

    if (index > -1 ){
      basketsData.splice(index, 1)
    }

    return ( index > -1 )
  },
  update(updateBasket){

    // REMOVE
    let index = -1
    index = basketsData.findIndex( b => b.id === updateBasket.id)

    if (index > -1 ){
      basketsData.splice(index, 1, updateBasket)
    }

    return basketsData[index]
  }
}

module.exports = {
  baskets,
  products
}