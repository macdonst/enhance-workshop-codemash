import data from '@begin/data'
import { validator } from '@begin/validator'
import { Cart } from './schemas/cart.mjs'

const deleteCart = async function(key) {
  await data.destroy({ table: 'carts', key })
  return { key }
}

const upsertCart = async function(cart) {
  return data.set({ table: 'carts', ...cart })
}

const getCart = async function(key) {
  return data.get({ table: 'carts', key })
}

const getCarts = async function() {
  const databasePageResults = await data.page({
    table: 'carts',
    limit: 25
  })

  let carts = []
  for await (let databasePageResult of databasePageResults) {
    for (let cart of databasePageResult) {
      delete cart.table
      carts.push(cart)
    }
  }

  return carts
}

const validate = {
  shared(req) {
    return validator(req, Cart)
  },
  async create(req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, cart: data } : { cart: data }
  },
  async update(req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, cart: data } : { cart: data }
  }
}

const onlyValidate = {
  shared(input) {
    let req = { body: input, headers: {} }
    req.headers['Content-Type'] = "application/json"
    return validator(req, Cart)
  },
  async create(input) {
    let { valid, problems, data } = onlyValidate.shared(input)
    if (input.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, cart: data } : { cart: data }
  },
  async update(input) {
    let { valid, problems, data } = onlyValidate.shared(input)
    // Insert your custom validation here
    return !valid ? { problems, cart: data } : { cart: data }
  }
}

function normalize(req) {
  const normal = validator(req, { id: "Data", type: "object", properties: {} })
  return normal.data
}


export {
  deleteCart,
  getCart,
  getCarts,
  upsertCart,
  validate,
  normalize,
  onlyValidate
}
