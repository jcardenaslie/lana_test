const ProductService = require("./product.usecase")
const ProductGroup = require("./../domain/productGroup.model")

const populate = (itemsGroups) => {

  const groups = itemsGroups.map( g => {

    const product = ProductService.getByCode(g.code)
    let group = new ProductGroup(product)
    
    for (let index = 1; index < g.quantity ; index++) {
      group.addItem(product)
    }      
    return group
    
  })

  return groups
}

module.exports = {
  populate
}