// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteWorkshop } from '../../../models/workshops.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post(req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, workshop: removed, ...newSession } = session
  try {
    let workshop = await deleteWorkshop(id)
    return {
      session: newSession,
      json: { workshop },
      location: '/admin/workshops'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/workshops'
    }
  }
}
