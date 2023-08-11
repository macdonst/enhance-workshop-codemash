import bcrypt from 'bcryptjs'
import xss from 'xss'
import { getAccounts } from '../models/accounts.mjs'
// Hardcoded admin account to bootstrap accounts.
// The password is defined in environment variables
const hardcodedAdmin = {
  username: 'hardcoded',
  scopes: ['admin'],
}

export async function get(req) {

  const { problems, login, ...newSession } = req.session
  if (problems) {
    return {
      session: newSession,
      json: { problems, login }
    }
  }
}

export async function post(req) {
  const session = req?.session
  const { password, username } = req.body
  const { redirectAfterAuth = '/' } = session

  if (!password || !username) {
    return {
      session: { problems: { form: 'Missing Username or Password' }, login: {username:xss(username)}, redirectAfterAuth },
      location: '/login'
    }
  }

  // Hardcoded admin account to bootstrap accounts
  // To disable remove the HARDCODED_ADMIN_PASSWORD from environment variables
  if (process.env.HARDCODED_ADMIN_PASSWORD && username === hardcodedAdmin.username  && password === process.env.HARDCODED_ADMIN_PASSWORD) {
    return {
      session: { authorized: hardcodedAdmin },
      location: redirectAfterAuth ? redirectAfterAuth : '/'
    }
  }

  let accounts = await getAccounts()
  const account = accounts.find(a => a.username === username)
  const match = account ? bcrypt.compareSync(password, account?.password) : false
  const { password: removePassword, ...sanitizedAccount } = account || {}
  if (match) {
    return {
      session: { authorized: sanitizedAccount },
      location: redirectAfterAuth ? redirectAfterAuth : '/'
    }
  } 
  else {
    return {
      session: { problems: { form: 'Incorrect Username or Password' }, login: {username:xss(username)} },
      location: '/login'
    }
  }
} 
