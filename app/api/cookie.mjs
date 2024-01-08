// filename="app/api/cookie.mjs
export async function get (req) {
  return {
    session: { peanutbutter: "delicious"},
    headers: {
      'set-cookie': `chocolate-chip="yummy"; Max-Age=60; Secure; HttpOnly`
    },
    json: { cookies: req.cookies, session: req.session}
  }
}
