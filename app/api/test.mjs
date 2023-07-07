// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getCart, upsertCart, validate } from '../models/carts.mjs'
import { getWorkshops } from '../models/workshops.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  const cartID = req.session.cartID
  const newSession = req.session
  const workshops = await getWorkshops()
  let cart
  if (cartID) {
    cart = await getCart()
  } else {
    cart = await upsertCart({ bookings: [] })
    newSession.cartID = cart.key
  }
  return {
    session: newSession,
    json: { cart, workshops }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post(req) {
  console.log(req.body)
  return {
    location: '/test'
  }
}
