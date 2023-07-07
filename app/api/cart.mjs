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
  const session = req.session
  const cartID = session.cartID
  // Validate
  let { problems, cart } = await validate.update(req)
  cart.key = cartID
  if (problems) {
    return {
      session: { ...session, problems, cart },
      json: { problems, cart },
      location: '/cart'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, cart: removed, ...newSession } = session
  try {
    const result = await upsertCart(cart)
    return {
      session: newSession,
      json: { cart: result },
      location: '/cart'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/cart'
    }
  }
}
