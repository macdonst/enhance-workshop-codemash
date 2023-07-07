// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getWorkshop } from '../../models/workshops.mjs'
import { getCart, normalize, onlyValidate, upsertCart } from '../../models/carts.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  const id = req.pathParameters?.id
  const result = await getWorkshop(id)
  return {
    json: { workshop: result }
  }
}


export async function post(req) {
  const workshop_id = req.pathParameters?.id
  let session = req.session
  let newSession = session
  let formData = normalize(req)

  const cartID = session?.cartID
  let problems, cart
  let booking = { workshop_id, seats: formData.seats }
  if (cartID) {
    let newCart = await getCart(cartID)
    if (!newCart?.bookings) newCart.bookings = []
    newCart.bookings = [...newCart.bookings, booking]
    const result = await onlyValidate.update(newCart)
    problems = result.problems
    cart = result.cart
  } else {
    let newCart = { bookings: [booking] }
    const result = await onlyValidate.create(newCart)
    problems = result.problems
    cart = result.cart
  }

  // if (problems) {
  //   return {
  //     session: newSession,
  //     json: { problems, cart },
  //     location: `/workshops/${workshop_id}`
  //   }
  // }
  // else {
  try {
    cart = await upsertCart(cart)
  } catch (e) {
    console.log(e)
  }

  return {
    session: { ...newSession, cartID: cart.key },
    location: `/cart`
  }
  // }

}
