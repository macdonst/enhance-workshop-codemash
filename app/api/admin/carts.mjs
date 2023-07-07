// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getCarts, upsertCart, validate } from '../models/carts.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const carts = await getCarts()
  if (req.session.problems) {
    let { problems, cart, ...session } = req.session
    return {
      session,
      json: { problems, carts, cart }
    }
  }

  return {
    json: { carts }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, cart } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, cart },
      json: { problems, cart },
      location: '/carts'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, cart: removed, ...newSession } = session
  try {
    const result = await upsertCart(cart)
    return {
      session: newSession,
      json: { cart: result },
      location: '/carts'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/carts'
    }
  }
}
