import { getLink, upsertLink } from '../../models/links.mjs'
import { checkAuth } from '../../lib/check-auth.mjs'

export const get = [checkAuth,getOneLink]
export const post = [checkAuth,updateLink]

async function getOneLink (req) {
  const id = req.pathParameters?.id
  const result = await getLink(id)
  return {
    json: { link: result }
  }
}

async function updateLink (req) {
  const id = req.pathParameters?.id
  const result = await upsertLink({ ...req.body, key: id })
  return {
    json: { link: result },
    location: '/links'
  }
}
