// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getLinkpages, upsertLinkpage, validate } from '../models/linkpages.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const authorized = !!req.session.authorized
  if (!authorized) { 
    return { 
      location: '/login' 
    } 
  }

  const linkpages = await getLinkpages()
  if (req.session.problems) {
    let { problems, linkpage, ...session } = req.session
    return {
      session,
      json: { problems, linkpages, linkpage }
    }
  }

  return {
    json: { linkpages }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const authorized = !!req.session.authorized
  if (!authorized) return { status: 401 }

  const session = req.session
  // Validate
  let { problems, linkpage } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, linkpage },
      json: { problems, linkpage },
      location: '/linkpages'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    const result = await upsertLinkpage(linkpage)
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
