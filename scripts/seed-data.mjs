import db from '@begin/data'
async function main() {
  await db.set({
    table: 'linkpages',
    key: 'link1',
    title: 'First Link Page',
    description: 'A cool page of links',
    pageUrl: 'linkpage1',
    theme: 'default',
    linkText1: 'google',
    linkUrl1: 'http://google.com',
    linkText2: 'google',
    linkUrl2: 'http://google.com',
    linkText3: 'google',
    linkUrl3: 'http://google.com',
    linkText4: 'google',
    linkUrl4: 'http://google.com',
  })
  await db.set({
    table: 'shortlinks',
    key: 'short1',
    shortUrl: 'catdog',
    longUrl: 'https://wikipedia.com',
    type: 'temporary',
  })
}
main()
