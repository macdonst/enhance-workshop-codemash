import db from '@begin/data'
async function main() {
  await db.set({
    table: 'link_pages',
    key: 'link1',
    title: 'First Link Page',
    description: 'A cool page of links',
    page_url: 'linkpage1',
    theme: 'default',
    link_text_1: 'google',
    link_url_1: 'http://google.com',
    link_text_2: 'google',
    link_url_2: 'http://google.com',
    link_text_3: 'google',
    link_url_3: 'http://google.com',
    link_text_4: 'google',
    link_url_4: 'http://google.com',
  })
  await db.set({
    table: 'short_links',
    key: 'short1',
    short_url: 'catdog',
    long_url: 'https://wikipedia.com',
    type: 'temporary',
    same_site: false,
  })
}
main()
