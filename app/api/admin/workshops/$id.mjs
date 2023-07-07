// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getWorkshop, upsertWorkshop, validate } from '../../models/workshops.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  if (req.session.problems) {
    let { problems, workshop, ...session } = req.session
    return {
      session,
      json: { problems, workshop }
    }
  }

  const id = req.pathParameters?.id
  const result = await getWorkshop(id)
  return {
    json: { workshop: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post(req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, workshop } = await validate.update(req)
  if (problems) {
    return {
      session: { ...session, problems, workshop },
      json: { problems, workshop },
      location: `/admin/workshops/${workshop.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, workshop: removed, ...newSession } = session
  try {
    const result = await upsertWorkshop({ key: id, ...workshop })
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
