const Product = require("./../domain/product.model")
const MockDatabase =  require("./../../mock/database")

const getByCode = (code) => {
  return new Product (MockDatabase.products.getByCode(code))
}

module.exports = {
  getByCode
}