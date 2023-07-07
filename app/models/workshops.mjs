import data from '@begin/data'
import { validator } from '@begin/validator'
import { Workshop } from './schemas/workshop.mjs'

const deleteWorkshop = async function (key) {
  await data.destroy({ table: 'workshops', key })
  return { key }
}

const upsertWorkshop = async function (workshop) {
  return data.set({ table: 'workshops', ...workshop })
}

const getWorkshop = async function (key) {
  return data.get({ table: 'workshops', key })
}

const getWorkshops = async function () {
  const databasePageResults = await data.page({
    table: 'workshops',
    limit: 25
  })

  let workshops = []
  for await (let databasePageResult of databasePageResults) {
    for (let workshop of databasePageResult) {
      delete workshop.table
      workshops.push(workshop)
    }
  }

  return workshops
}

const validate = {
  shared (req) {
    return validator(req, Workshop)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, workshop: data } : { workshop: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, workshop: data } : { workshop: data }
  }
}

export {
  deleteWorkshop,
  getWorkshop,
  getWorkshops,
  upsertWorkshop,
  validate
}
