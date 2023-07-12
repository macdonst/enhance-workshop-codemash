import { getLink_pages } from '../../models/link_pages.mjs'

export async function get(req) {
  const path = req.rawPath

  const linkPages = await getLink_pages()
  const linkPage = linkPages.find(link => link.page_url === path.replace(/^\//, ''))
  if (linkPage) {
    return {
      json: { linkPage }
    }
  }

  return {
    status: 404
  }

}

