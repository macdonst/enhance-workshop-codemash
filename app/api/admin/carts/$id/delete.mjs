// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteCart } from '../../../models/carts.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, cart: removed, ...newSession } = session
  try {
    let cart = await deleteCart(id)
    return {
      session: newSession,
      json: { cart },
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
