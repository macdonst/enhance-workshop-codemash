// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getCart, upsertCart, validate } from '../../models/carts.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, cart, ...session } = req.session
    return {
      session,
      json: { problems, cart }
    }
  }

  const id = req.pathParameters?.id
  const result = await getCart(id)
  return {
    json: { cart: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, cart } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, cart },
      json: { problems, cart },
      location: `/carts/${cart.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, cart: removed, ...newSession } = session
  try {
    const result = await upsertCart({ key: id, ...cart })
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
