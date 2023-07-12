// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteLinkpage } from '../../../../models/linkpages.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('admin'))
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    let linkpage = await deleteLinkpage(id)
    return {
      session: newSession,
      json: { linkpage },
      location: '/admin/linkpages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/linkpages'
    }
  }
}
