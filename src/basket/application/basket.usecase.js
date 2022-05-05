const Basket = require("./../domain/basket.model")
const ProductGroupService = require("./productGroup.usecase")
const ProductService = require("./product.usecase")
const MockDatabase =  require("./../../mock/database")

const create = (data) => {
  const codeList = data.items.map( i => i.code )
  let products = MockDatabase.products.getByCodeList(codeList)
  data.items = products
  const basket = new Basket(data)
  const newBasket = MockDatabase.baskets.create(basket.asJSON())

  return newBasket 
}

const getAll = ()  => {
  const basketsData = MockDatabase.baskets.getAll().map( b => new Basket(b))
  return basketsData.map ( b => {
    return populateBasket(b)
  }) 
}

const getById = (id) => {
  const basketData = MockDatabase.baskets.getById(id)
  return populateBasket(basketData)
}

const populateBasket = (basketData) => {
  let itemsGroups = ProductGroupService.populate(basketData.itemsGroups)
  const basket = new Basket(basketData)
  basket.setProductsGroups(itemsGroups)
  return basket
}

const update = (basket) => {
  return {}
}

const remove = (id) => {
  return MockDatabase.baskets.remove(id)
}

const addProduct = (basketId, newProduct) => {
  let basket = getById(basketId)
  const product = ProductService.getByCode(newProduct.code)

  basket.addItem(product)

  const updateBasket = MockDatabase.baskets.update(basket.asJSON())

  return updateBasket
}

const getCheckoutTotal = (id) => {
  return getById(id).getCheckoutTotal()
}

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
  addProduct,
  getCheckoutTotal
}