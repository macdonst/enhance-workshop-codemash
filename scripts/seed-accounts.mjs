import db from '@begin/data'
async function main() {
  await db.set({
    table: 'accounts',
    key: 'u1',
    displayName: 'Jane',
    username: 'jane',
    /*password is 'a'*/
    password: '$2a$10$bkNIj7oU2Ol75a0dmpSMweu9UrwT/OPhS7wxTDhaHMnsPlMp7eDw.',
    scopes: ['admin', 'linkpages:edit'],
  })
  await db.set({
    table: 'accounts',
    key: 'u2',
    displayName: 'John',
    username: 'jsmith',
    /*password is 'secret'*/
    password: '$2a$10$fVqCPIoGWaxEZ.tX73tICOenx9Zh9qvDgrq/mNgbZuxxemFaNTi/G',
    scopes: ['linkpages:edit'],
  })

}
main()
