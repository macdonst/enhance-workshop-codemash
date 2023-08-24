export function checkAuth(req) {
  const session = req.session
  const authorized = session?.authorized ? session?.authorized : false

  if (!authorized) {
    console.log('am i authed?')
    return {
      session: {},
      location: '/'
    }
  }
}
