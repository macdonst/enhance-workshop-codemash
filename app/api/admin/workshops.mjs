// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getWorkshops, upsertWorkshop, validate } from '../../models/workshops.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  const workshops = await getWorkshops()
  if (req.session.problems) {
    let { problems, workshop, ...session } = req.session
    return {
      session,
      json: { problems, workshops, workshop }
    }
  }

  return {
    json: { workshops }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post(req) {
  const session = req.session
  // Validate
  let { problems, workshop } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, workshop },
      json: { problems, workshop },
      location: '/admin/workshops'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, workshop: removed, ...newSession } = session
  try {
    const result = await upsertWorkshop(workshop)
    return {
      session: newSession,
      json: { workshop: result },
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
