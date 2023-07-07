// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getWorkshops } from '../models/workshops.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get(req) {
  const workshops = await getWorkshops()

  return {
    json: { workshops }
  }
}

