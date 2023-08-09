---
title: "Module 4: API Design"
---

[Module Index](/)



# Module 4: API Design


## Enhance Project Structure

In the Enhance project structure so far we have seen the following:


* `app/pages` - HTML pages
* `app/elements` - Custom Elements as components

There are a couple more parts of the project structure we will need:



* `app/public` - Static assets like images. Includes fingerprinting. Accessed at `/_public/file/path`
* `app/head.mjs` - Customize the document `<head>` 
* `app/api` - API routes to return JSON data, or to pass data to a corresponding `app/pages` route to make the page dynamic


## Adding API Routes

Add the following code to a new API route at `/app/api/data.mjs`:


```javascript
// /app/api/data.mjs

export async get(){
  const data = { myData: "Here is some data" }
  return { json: data }
}
```




* Methods: 
    * The name of the exported function is the HTTP method. 
    * Multiple methods can be exported from the same file.
    * Post, Get, Patch, Delete, ext. 
    * Get and Post are recommended for HTML-First development
    * You can export “any” to match all HTTP methods
* Response:
    * The return is used to form the HTTP response.
    * Properties include:
        * json: JSON data response or pass data to HTML page
        * status: HTTP status code
        * location: Redirect location headers
        * headers: Set arbitrary headers
        * session: Set session cookies
* Middleware:
    * Pass an array to add middleware
    * Short circuit the middleware chain by returning early
    * Pass data to the next middleware by adding it to the request object.

```javascript
// /app/api/data.mjs

export const get = [ auth, getHandler ]

async function auth(req){
  const session = req.session
  const authorized = session.authorized
  if (!authorized) return {status:302, location: '/login'}
  req.auth = authorized
}

async function getHandler(req){
  const data = { myData: "Here is some data" }
  return { json: {data, authorized:req.authorized} }
}
```


* JSON vs. HTML
    * If both an API and Pages route exist then the response is determined by the requests `accepts` header. If it is set to `accept: application/json` it will return the JSON directly from the API route.
    * If it is set to  `accept: text/html` it will pass the JSON data on to the pages route for rendering. 


## Dynamic HTML pages

Now that there is a way to pass data to our HTML page we need to access it from the page. This data will be passed to the page as a data store.



* Create an element to show data
* First create `/app/pages/data.html` and paste the following code there:

```html
<!-- /app/pages/data.html---> 

<nav-bar></nav-bar>
<main>
  <h1>Data</h1>
  <show-data></show-data>
</main>
```


* Now we need to create the element `<show-data>`
* Add the following code to a new file in `/app/elements/show-data.mjs`

```javascript
export default function ShowData({ html, state }) {
  const store = state.store
  const { data = {} } = store
  return html`
   <pre> ${JSON.stringify(data)} <pre>
  `
}
```


* You can write a JavaScript `.mjs` file directly in the `/app/pages` directory and access the store there the same way. 


## Adding a Database

For the API to really be useful it needs a way to store and retrieve data. We will add a database to our application to solve this problem.



* Enhance has a first class Database built in that is free for small projects and can seamlessly scale up to meet the needs of any site. 
* DynamoDB is deployed alongside every Enhance app deployed to Begin.com or directly to AWS with Architect (arc.codes). 
* For our purposes we will use Begin data ([https://docs.begin.com/en/data/begin-data/](https://docs.begin.com/en/data/begin-data/)). It is a thin wrapper for DynamoDB that makes the API a little easy to work with.
* Lets modify our data API route to read and write to our database as follows:


```javascript
// /app/api/data.mjs
import begin from '@begin/data'

export async get(){
  const data = await begin.get({key:'my-data'})
  return { json: data }
}

export async post(req){
  const data = req.body?.data
  if (data) {
    await begin.set({key:'my-data', ...data})
    return { status:302, location: '/success' }
  } else {
    return { html: '<p>Something Went Wrong</p>' }
  }
}
```

