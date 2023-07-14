import db from '@begin/data'
async function main() {
  await db.set({
    table: 'linkpages',
    key: 'link1',
    title: 'First Link Page',
    description: 'A cool page of links',
    path: 'linkpage1',
    links: [
      { text: 'google', url: 'http://google.com'},
      { text: 'google', url: 'http://google.com'},
      { text: 'google', url: 'http://google.com'},
      { text: 'google', url: 'http://google.com'},
    ]
  })
}
main()
