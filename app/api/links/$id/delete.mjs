// /app/api/links/$id/delete
import { deleteLink } from '../../../models/links.mjs'
import { checkAuth } from '../../../lib/check-auth.mjs'

export const post = [checkAuth,destroyLink]

export async function destroyLink (req) {
  const id = req.pathParameters?.id
  let link = await deleteLink(id)
  return {
    json: { link },
    location: '/links'
  }
}
