import { getLinkpages } from '../../models/linkpages.mjs'

export async function get(req) {
  const path = req.rawPath

  const linkPages = await getLinkpages()
  const linkPage = linkPages.find(link => link.path === path.replace(/^\//, ''))
  if (linkPage) {
    return {
      json: { linkPage }
    }
  }

  return {
    status: 404
  }

}

