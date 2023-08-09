---
title: "Module 7: CRUDL Part 1"
---

[Module Index](/)


# Module 7: CRUDL
## Putting It All Together

## Outline

* CRUD Flow (GET, POST, HTML Forms)
* Routes and files
* Dynamic and Catchall Routes
* Seeding Data for local development

---

## CRUD Flow
* Create, Read, Update, Delete, List

These 5 operations are so common an entire subset of web apps are know as CRUD apps.
Because the general patterns are so common we will look at how to create CRUD routes for any object.

Again we will take an HTML-first approach using plain HTML forms as the basis for each operation.

For this module we will build a Link Tree feature with pages that have a list of links.
We want to be able to do all the CRUDL operations on these objects. 

---

## Structure: Routes and Files

* We will structure our CRUDL routes and files as follows:
* We will call the objects link pages (or 'linkpages' as an object name).
* Routes:
  * `/linkpages` - List and Create
    * GET - List and Create form in one page
    * POST - Create Post endpoint
  * `/linkpages/$id.mjs` - Read and Update
    * GET - Read and Update form
    * POST - Update Post endpoint
  * `/linkpages/$id/delete` - Delete
    * POST - Deletes object
    
  * `/linkpages` - List and Create
    * GET - List and Create form in one page
    * POST - Create Post endpoint
  * `/linkpages/$id.mjs` - Read and Update
    * GET - Read and Update form
    * POST - Update Post endpoint
  * `/linkpages/$id/delete` - Delete
    * POST - Deletes object

---

* Files
  * API routes
    * /app/api/linkpages.mjs
    * /app/api/linkpages/$id.mjs
    * /app/api/linkpages/$id/delete.mjs
  * HTML pages
    * /app/pages/linkpages.mjs
    * /app/pages/linkpages/$id.mjs
  * Data Access Layer
    * /app/models/linkpages.mjs 
    * /app/models/schema/linkpages.mjs


---

### Dynamic Routes and Catch All Routes

Enhance has support for dynamic and catchall routes. 
The '$'in the above route and path names will match any path part.
The `$id` will match any object ID at the end of the `/linkpages` route.
If the file or route is named with '$$' it will match any remaining path with multiple parts.

---

## Create

For this example we will start with a simplified data shape and fill it out later.
* Our Link Page object will be:
  * `{ path:'my-links', links:[ { text: 'my-blog', url: 'https://example.com' } ] }`

Lets make a page with a form to create a new link page at `/app/pages/linkpages.mjs`:

```javascript
// /app/pages/linkpages.mjs
export default function Html({ html, state }) {

  return html`
    <enhance-form
      action="/linkpages"
      method="POST">
      <enhance-text-input label="Page Route" type="text" id="path" name="path" ></enhance-text-input>
      <enhance-text-input label="Link Text 0" type="text" id="links[0].text" name="links[0].text"  ></enhance-text-input>
      <enhance-text-input label="Link Url 0" type="text" id="links[0].url" name="links[0].url"  ></enhance-text-input>
      <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
    </enhance-form>
  `
}
```

---

* Now that we have a form to create new linkpages we need a place to POST them.

* Next make an API route at /app/api/linkpages.mjs

```javascript
// /app/api/linkpages.mjs
import data from '@begin/data'
import { convertToNestedObject } from '@begin/validator'

export async function post (req) {
  const linkpage = convertToNestedObject(req.body)
  await data.set({ table: 'linkpages', ...linkpage })
  return {
    location: '/linkpages'
  }
}
```

This will:
1. Take the form data recieved and put it in a JavaScript object (including expanding "links[0].url" into and array of objects instead of a string key value pair).
2. Store it in the Database
3. Redirect back to /linkpages 

Notice we are missing any validation. We will add that soon. But first we need sessions.
Before we add sessions a validation lets finish the loop so that we can see the link pages objects that we create.


---

## List 
We need to list the objects we created.
To do this we will overload the list function in the same route and files we just created.

Add the list at the top of /app/pages/linkpages


```javascript
// /app/pages/linkpages
export default function Html({ html, state }) {
  const { store } = state
  let linkpages = store.linkpages || []

  return html`
<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Link Pages</h1>
    ${linkpages.map(item => `<article class="mb2">
      <div class="mb0">
        <p class="pb-2"><strong class="capitalize">Page Route: </strong>${item?.path || ''}</p>
        ${item?.links.map((link,i)=>`
          <p class="pb-2"><strong class="capitalize">Link Text ${i}: </strong>${link?.text || ''}</p>
          <p class="pb-2"><strong class="capitalize">Link Url ${i}: </strong>${link?.url || ''}</p>
        `).join('')}
        <p class="pb-2"><strong class="capitalize">Key: </strong>${item?.key || ''}</p>
      </div>
      <p class="mb-1">
        <enhance-link href="/linkpages/${item.key}">Edit this link page</enhance-link>
      </p>
      <form action="/linkpages/${item.key}/delete" method="POST" class="mb-1">
        <enhance-submit-button><span slot="label">Delete this link page</span></enhance-submit-button>
      </form>
      </article>`).join('\n')}
    <details class="mb0" >
      <summary>New link page</summary>
      <enhance-form
        action="/linkpages"
        method="POST">
        <enhance-fieldset legend="Link Page">
        <enhance-text-input label="Page Route" type="text" id="path" name="path" ></enhance-text-input>
        <enhance-text-input label="Link Text 0" type="text" id="links[0].text" name="links[0].text"  ></enhance-text-input>
        <enhance-text-input label="Link Url 0" type="text" id="links[0].url" name="links[0].url"  ></enhance-text-input>
        <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
        </enhance-fieldset>
      </enhance-form>
    </details>
  </main>
</enhance-page-container>
  `
}

```
* We put the create form inside a details/summary to clean up the page slightly
* Now we need to make sure that this page has the list of linkpages to display.
* While we are here we add links to Update and Delete from the list view.
* For this we go back to the API

---

* Now we need to add the API data to the GET for the List
* For that add the following to /app/api/linkpages


```javascript
// /app/api/linkpages.mjs
import data from '@begin/data'
import { convertToNestedObject } from '@begin/validator'

export async function get (req) {
  const linkpages = await data.get({table: 'linkpages'})
  return {
    json: { linkpages }
  }
}

export async function post (req) {
  const linkpage = convertToNestedObject(req.body)
  await data.set({ table: 'linkpages', ...linkpage })
  return {
    location: '/linkpages'
  }
}
```

---

## Update
We have a link to update linkpages from the list view, 
but we need to add the page and api to support that feature.

First lets start with the update page and form. 
This will be similar to the create form except with the addition of a key. 
We will also need to prepopulate the form with the previous values so that only the updated values will change.

Copy the code below into /app/pages/linkpages/$id.mjs.

```javascript
export default function Html({ html, state }) {
  const { store } = state
  const linkpage = store.linkpage || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/linkpages/${linkpage.key}"
  method="POST">
    <enhance-fieldset legend="Link Page">
    <enhance-text-input label="Page Route" type="text" id="path" name="path" value="${linkpage?.path || ''}" ></enhance-text-input>
    <enhance-text-input label="Link Text 0" type="text" id="links[0].text" name="link[0].text" value="${linkpage?.links?.[0]?.text || ''}" ></enhance-text-input>
    <enhance-text-input label="Link Url 0" type="text" id="link[0].url" name="link[0].url" value="${linkpage?.links?.[0]?.url || ''}" ></enhance-text-input>

    <input type="hidden" id="key" name="key" value="${linkpage?.key}" />
    <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
    </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}

```

Now lets pass the initial values to the form that will be updated.
We will also add the POST handler to update the form as well.

Copy the following code to the API route at /app/api/linkpages/$id.mjs

```javascript
import data from '@begin/data'
import {convertToNestedObject} from '@begin/validator'
export async function get (req) {
  const id = req.pathParameters?.id
  const result = await data.get({table:'linkpages', key:id})
  return {
    json: { linkpage: result }
  }
}

export async function post (req) {
  const id = req.pathParameters?.id
  const linkpage = convertToNestedObject(req.body)
  await data.set({table:'linkpages', key: id, ...linkpage })
  return {
    location: '/linkpages'
  }
}

```


---

## Delete
We already added a form in the List view that will POST to delete an object.
We just need to add the API route that handles that POST request.

* Add the following code to the /app/api/linkpages/$id/delete.mjs file

```javascript
// /app/api/linkpages/$id/delete
import data from '@begin/data'

export async function post (req) {
  const id = req.pathParameters?.id
  await data.destroy({table: 'linkpages', key:id})
  return {
    location: '/linkpages'
  }
}
```


---


## Seed Data for Local Development

In local developement we get a clean database everytime we start the server.
It is helpful to be able to seed some data so that we start with something.

Copy the following to the /scripts/seed-data.mjs file

```javascript
// /scripts/seed-data.mjs

import db from '@begin/data'
async function main() {
  await db.set({
    table: 'linkpages',
    key: 'link1',
    path: 'linkpage1',
    links: [
      { text: 'google', url: 'http://google.com'},
    ]
  })
}
main()
```
Now to run that at we modify the /prefs.arc file as follows

```arc

@sandbox
livereload true

@sandbox-startup
node scripts/seed-data.mjs
```
