import data from '@begin/data'
import { validator } from '@begin/validator'
import { Linkpage } from './schemas/linkpage.mjs'

const deleteLinkpage = async function (key) {
  await data.destroy({ table: 'linkpages', key })
  return { key }
}

const upsertLinkpage = async function (linkpage) {
  return data.set({ table: 'linkpages', ...linkpage })
}

const getLinkpage = async function (key) {
  return data.get({ table: 'linkpages', key })
}

const getLinkpages = async function () {
  const databasePageResults = await data.page({
    table: 'linkpages',
    limit: 25
  })

  let linkpages = []
  for await (let databasePageResult of databasePageResults) {
    for (let linkpage of databasePageResult) {
      delete linkpage.table
      linkpages.push(linkpage)
    }
  }

  return linkpages
}

const validate = {
  shared (req) {
    return validator(req, Linkpage)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, linkpage: data } : { linkpage: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, linkpage: data } : { linkpage: data }
  }
}

export {
  deleteLinkpage,
  getLinkpage,
  getLinkpages,
  upsertLinkpage,
  validate
}
