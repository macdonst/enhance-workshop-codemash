import { getLinks } from "../models/links.mjs"

export async function get() {
  const links = await getLinks()
  return {
    json: {
      page: {
        title: 'Themes',
        description: 'Custom properties and calc'
      },
      links
    }
  }
}
