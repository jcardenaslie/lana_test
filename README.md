# README

## Requirements

- Must have npm install on the machine (this will not be needed when dockerized)
- The server was coded with nodejs version **v14.4.0**, but LTS should work just fine.
- NPM version **6.14.4**

## First install the dependencies

```js
  npm i
```

## "DataBase" Data Model

The models were develop with a NoSQL implementation in mind, but it is very easy to implement a SQL dabase drive, as the main structure of the projects follows the Hexagonal architecture pradigm.

### Products

Attributes:

- code: Unique id 
- name: Product name
- price: String based price
- discount: Percentaje of total price to be discounted when applies
- discountRule: Indicates the type of discount the products has
- discountThreshold: Depending on the type, if is it "threshold", it will indicate how many items should add the customer in order to recieve the discount

```json
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
```

### Basket

Attributes:

- items: Items snapshot, if the basket is purchased it will show the price at the time they were bought, if not they will be update whenever the basket is fetch.
- itemsGroups: Groups items and aggregates its discounts and total price
- checkoutTotal: It's the final basket amount, it's derived from the itemsGroups.

```json
{
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
}
```

## Basket Routes

the project includes a postman collection that can be imported

```rest

// Create basket
POST -> /baskets

// Add product to basket
POST -> /baskets/:id/products

// Get basket checkout total
GET -> /baskets/:id/checkout/total

// Delete basket
DELETE -> /baskets/:id


//OTHERS

// Get All
GET -> /baskets

// Get By Id
GET -> /baskets/:id
```

### **Create a new checkout basket**

#### Rest Client



```rest
POST -> localhost:4000/baskets

{
  "items": [
      {
          "code": "TSHIRT"
      }
  ]
}
```

#### Curl:

```curl
curl --location --request POST 'localhost:4000/baskets' \
--header 'Content-Type: application/json' \
--data-raw '{
  "items": [
      {
          "code": "TSHIRT"
      }
  ]
}'
```

### **Add a product to a basket**

#### Rest Client

```rest
POST -> localhost:4000/baskets/5a4d7012-80c2-4899-a961-3a049338fc2a/products

{
    "code": "PEN"
}
```

#### Curl:

```curl
curl --location --request POST 'localhost:4000/baskets/5a4d7012-80c2-4899-a961-3a049338fc2a/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "code": "PEN"
}'
```

### **Get the total amount in a basket**

#### Rest Client

```rest
GET -> localhost:4000/baskets/0826d750-310a-4c7f-85df-25d129dac5ca/checkout/total

{
    "code": "PEN"
}
```

#### Curl:

```curl
curl --location --request GET 'localhost:4000/baskets/0826d750-310a-4c7f-85df-25d129dac5ca/checkout/total'
```


### **Remove the basket**

#### Rest Client

```rest
DELETE -> localhost:4000/baskets/5a4d7012-80c2-4899-a961-3a049338fc2a

{
    "code": "PEN"
}
```

#### Curl:

```curl
curl --location --request DELETE 'localhost:4000/baskets/5a4d7012-80c2-4899-a961-3a049338fc2a'
```

## TODO

- [x] Server side.
- [x] Required endpoints
- [x] Products and basket business logic
- [ ] Client side.
- [ ] Add some error handling to the server.
- [ ] Add in server documnetation like swagger.
- [ ] Add unit and integration tests.
- [ ] Dockerize client and server.
- [ ] Stress and performance test with locust.