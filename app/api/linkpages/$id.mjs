import { getLinkpage, upsertLinkpage, validate } from '../../models/linkpages.mjs'


export async function get (req) {
  const authorized = !!req.session.authorized
  if (!authorized) return { location: '/login' }

  if (req.session.problems) {
    let { problems, linkpage, ...session } = req.session
    return {
      session,
      json: { problems, linkpage }
    }
  }

  const id = req.pathParameters?.id
  const result = await getLinkpage(id)
  return {
    json: { linkpage: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const authorized = !!req.session.authorized
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, linkpage } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, linkpage },
      json: { problems, linkpage },
      location: `/linkpages/${linkpage.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    const result = await upsertLinkpage({ key: id, ...linkpage })
    return {
      session: newSession,
      json: { linkpage: result },
      location: '/linkpages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/linkpages'
    }
  }
}
