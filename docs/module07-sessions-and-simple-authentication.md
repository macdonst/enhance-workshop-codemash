---
title: "Module 7: Sessions and Simple Authentication"
---

[Module Index](/)

---

## Outline

* What are Sessions
* HTTP Only Cookies
* Enhance Sessions

---

## Sessions
We are missing a few tools to finish our CRUDL routes from the last module.
Sessions are the best way to add authentication and to close the loop on form validation from the server.

When you visit a website, by default, it doesn't remember anything about you - it's like starting a new conversation every time you go to the website or even loading a new page on the same website you are already visiting.
HTTP is a stateless protocol.
What if you want the website to remember something about you? 
That's where sessions come in.
Sessions are a way for a website to remember things about you, like if you're logged in or what's in your shopping cart.

Enhance impliments sessions with HttpOnly cookies.
HttpOnly cookies are the best way to ensure that your session data is safe and secure.
To learn why they're important and how to use them we will create a session from scratch.
It's a great way to add an extra layer of security to your website, and it's easier than you might think.


## Cookies

A cookie is a small piece of data that a website stores on a user's computer.
This data is then sent back to the website with every subsequent request, allowing the website to remember things like user preferences or login status.
At the end of the day, a `Cookie` is an HTTP request header, and writing a cookie is accomplished with the HTTP response header `set-cookie`.

By default, cookies are sent back and forth between the browser and the server in plain text, making them vulnerable to theft by hackers.
To help mitigate this risk, you can set the "HttpOnly" flag on a cookie.
This flag tells the browser that the cookie should only be sent back to the server via HTTP requests and will not be accessible to client-side scripting such as JavaScript.
In addition to HttpOnly, you can set the "Secure" flag on a cookie.
This flag tells the browser that the cookie will only be sent over secure connections (i.e. HTTPS).
The "Secure" flag helps to prevent the cookie from being intercepted by a hacker who may be listening in on an unsecured connection.

When combined, HttpOnly and secure cookies provide a powerful defense against session hijacking.
By keeping session data away from client-side scripts and encrypting it during transit, you can protect your users from a wide range of security threats.
By taking the time to implement these security measures correctly, you'll be able to rest assured that your users' data is well-protected.


## Implementing a session with set-cookie
Lets look at how we might build a session out of cookies for our app.

Add an API route at `/app/api/cookie.mjs` with the following:

```javascript
// filename="app/api/cookie.mjs
export async function get (req) {
 return {
   headers: {
     'set-cookie': `chocolate-chip="yummy"; Max-Age=60; Secure; HttpOnly`
   },
   json: { cookies: req.cookies }
 }
}
```

Now to get a confirmation that our cookie is set add the following page at `/app/pages/cookie.mjs`


```javascript
// app/pages/cookie.mjs
export default function cookie ({html, state}) {

 return html`
 <pre>${JSON.stringify(state.store, null, 2)}</pre>`
}
```

When you first hit the `/cookie` route the server will send a cookie to the user.
The first time through it is sent to the browser. 
Then when you refresh the page it is sent back with that request and it show up in the `req.cookies` and is displayed on the page.

## Enhance Sessions

Enhance session functionality built in.
It uses `set-cookie` behind the scenes.
That code is open source, has been audited by thousands, and has more affordances for better security.

Lets check it out.
Now add the following lines to the same `/app/api/cookies.mjs` file:

```javascript
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
```

Again the first request will set the cookies and to see what was set you refresh again. 

We started with this simple example to show that there is no real magic in sessions.
You could reimpliment it yourself on every app and every route.
But that would be a lot of boilerplate you can avoid by using built-in sessions.

While our session cookie is both `Secure` and `HttpOnly` you probably noticed the values are still in plain text while the built in session is not readable in the cookie itself.
Enhance sessions are further locked down with two strategies: signing and encrypting the cookie value for ‘stateless’ sessions and/or using database backed sessions and only storing a UUID in the cookie itself.
Both techniques work fine, and even better can be combined.

Database sessions are nice because you can control invalidation and aren’t limited by the size of cookie.
Stateless sessions are nice because they don’t involve more moving parts like a database.
Enhance, support both.

# Implementing a basic login flow on top of session
Getting back to the portfolio we are building one of the things that we need sessions for is authentication.
We want any guests to be able to see the portfolio, resume, and link tree pages, but we don't want them to be able to create new link tree pages.
To restrict the CRUDL routes we will use sessions.

For this we will build a simple singleplayer authentication.

Lets build a login page

```html
<!-- /app/pages/login.html -->
<page-container>
  <main>
        <enhance-form action="/login" method="post" >
            <enhance-text-input
              label="Password"
              id="password"
              name="password"
              type="password"
            ></enhance-text-input>
              <enhance-submit-button><span slot="label">Log in</span></enhance-submit-button>
        </enhance-form>
  </main>
</page-container>
```

Now we need to add the API route for this to post to.


```javascript
// /app/api/login.mjs
export async function post (req) {
 let authorized = req.body.password === process.env.SECRET_PASSWORD
 return {
   location: '/',
   session: { authorized }
 }
}
```

To be able to log out we add a post route for `/logout`

```javascript
// /app/api/logout.mjs
export async function post (req) {
 return {
   location: '/',
   session: {}
 }
}
```

The previous code will clear the session entirely.
If there are possibly values in the session that you want maintained you can just clear the login state as follows.

```javascript
// /app/api/logout.mjs
export async function post (req) {
 const {authorized:removeAuthorized, ...newSession} = ...req.session
 return {
   location: '/',
   session: newSession
 }
}
```

## Using Session state to protect routes

Now we have a session that will persist with each request for that user unless cleared by the server.
With this we can verify the authentication status for any other pages.
The `req.session.authorized` property can be checked in any API route.
If we have a `protected` route that only the the owner should see we check the status and redirect to the login page if not authorized.

```javascript
// /app/api/protected.mjs
export async function get (req) {
 let authorized = !!(req.session.authorized)
 if (!authorized) {
   return { location: '/login' }
 }
}
```

Some pages may not be fully restricted but just have mixed content for an authenticated user. 
In this case you don't have to redirect if not authorized.
Instead we will pass the `authorized` property to the page.

```javascript
// /app/api/mixed-content.mjs
export async function get (req) {
 let authorized = !!(req.session.authorized)
 return {
   json: { authorized }
 }
}
```

And in the page we can use that `authorized` property to control what content is shown.

```javascript
// /app/pages/mixed-content.mjs
export default function mixed({html, state}){
return html`
${state.store.authorized ? `<form method=POST action=/logout><button>logout</button></form>` : ''}
<main>Hello</main>
`
}
```

In the case of a POST request we might want to respond differently to the authentication check.
In the case of a JSON API it is likely better to respond with a status not authorized.

```javascript
// /app/api/protected.mjs
export async function post (req) {
 let authorized = !!(req.session.authorized)
 if (!authorized) return { status: 401 }
 return { json: data }
}
```

We will add these authentication checks to the respective CRUDL routes in the next module.

