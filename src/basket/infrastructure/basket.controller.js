const BasketService = require('./../application/basket.usecase')

const create = (req, res, next) => {
  const newBasket = BasketService.create(req.body)
  return res.json(newBasket)
}

const getAll = (req, res, next) => {
  const baskets = BasketService.getAll()
  return res.json(baskets)
}

const getById = (req, res, next) => {
  const response = BasketService.getById(req.params.id)
  return res.json(response)
}

const update = (req, res, next) => {
  return res.json({})
}

const remove = (req, res, next) => {
  const response =  BasketService.remove(req.params.id)
  const status = response ? "success" : "error"
  return res.json({status})
}

const addProduct = (req, res, next) => {
  const reponse = BasketService.addProduct(req.params.id, req.body)
  return res.json(reponse)
}

const getCheckoutTotal = (req, res, next) => {
  const response = BasketService.getCheckoutTotal(req.params.id)
  return res.json(response)
}

module.exports = {
  getById,
  create,
  update,
  remove,
  addProduct,
  getAll,
  getCheckoutTotal
}