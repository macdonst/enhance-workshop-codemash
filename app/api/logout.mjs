// /app/api/logout.mjs
export async function post (req) {
  const {authorized:removeAuthorized, ...newSession} = req.session
  return {
    location: '/',
    session: newSession
  }
}

// For local dev it is convenient to be able to logout using a get route
export async function get () {
  const env = process.env.ARC_ENV
  if (env !== 'staging' && env !== 'production') {
    return {
      session: {},
      location: '/'
    }
  } else {
    return {
      code: 404
    }
  }
}