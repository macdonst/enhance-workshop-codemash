---
title: "Module 7: CRUDL Part 1"
layout: default
---

[Module Index](/enhance-workshop)


# Module 7: CRUDL

## Outline

- CRUD Flow (GET, POST, HTML Forms)
- Routes and files
- Dynamic and Catchall Routes
- Seeding Data for local development


## CRUD Flow
- Create, Read, Update, Delete, List

These 5 operations are so common an entire subset of web apps are know as CRUD apps.
Because the general patterns are so common we will look at how to create CRUD routes for any object.

Again we will take an HTML-first approach using plain HTML forms as the basis for each operation.

For this module we will build a Link Tree feature with a page that has a list of links.
We want to be able to do all the CRUDL operations on these links.


## Structure: Routes and Files

- We will structure our CRUDL routes for the `links` object as follows:
- Routes:
  - `/links` - List and Create
    - GET - List and Create form in one page
    - POST - Create Post endpoint
  - `/links/$id` - Read and Update
    - GET - Read and Update form
    - POST - Update Post endpoint
  - `/links/$id/delete` - Delete
    - POST - Deletes object

> Why do we have a POST `/links/$id/delete` route instead of a DELETE `/links/$id` route?
It is because browsers only support GET and POST and we want to be able to support non-JavaScript use cases with our forms.


- Files
  - API routes
    - /app/api/links.mjs
    - /app/api/links/$id.mjs
    - /app/api/links/$id/delete.mjs
  - HTML pages
    - /app/pages/links.mjs
    - /app/pages/links/$id.mjs
  - Data Access Layer
    - /app/models/links.mjs
    - /app/models/schema/links.mjs



### Dynamic Routes and Catch All Routes

Enhance has support for dynamic and catchall routes.
The '$'in the above route and path names will match any path part. For example the `$id` will match any object ID at the end of the `/links` route. You can access these path parameters in code like so:

```javascript
const id = req.pathParameters?.id
```

If the file or route is named with `$$` it will match any remaining path with multiple parts. Access to the value matched by `$$` is accessible at:

```javascript
const proxy = req.pathParameters?.proxy
```

## Data Access Layer

Before we get started adding routes we are going to need a way to store data in our database.  A lot of data access logic will be duplicated so moving it into one place will help keep it DRY.

Create a file called `/app/models/links.mjs` and add the following:

```javascript
// /app/models/links.mjs
import data from '@begin/data'

const deleteLink = async function (key) {
  await data.destroy({ table: 'links', key })
  return { key }
}

const upsertLink = async function (link) {
  return data.set({ table: 'links', ...link })
}

const getLink = async function (key) {
  return data.get({ table: 'links', key })
}

const getLinks = async function () {
  const databasePageResults = await data.page({
    table: 'links',
    limit: 25
  })

  let links = []
  for await (let databasePageResult of databasePageResults) {
    for (let link of databasePageResult) {
      delete link.table
      links.push(link)
    }
  }

  return links
}

export {
  deleteLinkpage,
  getLink,
  getLinks,
  upsertLink,
}
```

That was all it takes! Every Enhance app comes with its own database. How is that for batteries included? `@begin/data` is just a thin wrapper around DynamoDB which is an incredibly fast, truly serverless database. If you don't need or use it, it will not get in your way nor will you be charged for it.

## Create

Lets make a page with a form to create a new link at `/app/pages/links.mjs`:

Earlier in the workshop we talked about the fact that Enhance Styles does a pretty hard CSS reset.
As a result if we just build forms with inputs it is difficult to see them while iterating and debugging.
We have some form components pre built that will help with this.
Since most of our CRUDL routes are not public and just for us the styles don't have to visually match our site.

Lets install those generic form components so we can use them to rapidly itterate.

- First run `npm i https://github.com/enhance-dev/form-elements`
- Add elements for each of the form elements.
  - Copy and past the code below to `/app/elements/enhance/submit-button.mjs`
```javascript
import { SubmitButton } from "@enhance/form-elements"
export default SubmitButton

```
- Repeat for all the form elements:
  - `enhance-submit-button`
  - `enhance-form`
  - `enhance-fieldset`
  - `enhance-link-button`
  - `enhance-link-button-full`
  - `enhance-page-container`
  - `enhance-text-input`
  - `enhance-links`

I know this is a lot of copy pasta.
We are working on easier ways to do this.


```javascript
// /app/pages/links.mjs
export default function Html({ html, state }) {

  return html`
    <enhance-form
      action="/links"
      method="POST">
      <enhance-text-input label="Link Text" type="text" id="text" name="text"  ></enhance-text-input>
      <enhance-text-input label="Link Url" type="text" id="url" name="url"  ></enhance-text-input>
      <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
    </enhance-form>
  `
}
```


- Now that we have a form to create new links we need a place to POST them.

- Next make an API route at /app/api/links.mjs

```javascript
// /app/api/links.mjs
import { upsertLink } from '../models/links.mjs'
import {convertToNestedObject} from '@begin/validator'

export async function post (req) {
  await upsertLink({ ...req.body })
  return {
    location: '/links'
  }
}
```

This will:

1. Take the form data received and store it in the database
2. Redirect back to `/links` when done

Notice we have no validation yet. We will add that soon. But first we need a few more tools.
Lets finish the loop so that we can see the links we created.

## List

We want to view the list the links we've created. Instead of creating a new route. We will provide the UI for viewing and creating new links in the same page.

Add the list at the top of `/app/pages/links.mjs`


```javascript
// /app/pages/links
export default function Links({ html, state }) {
  const { store } = state
  let links = store.links || []

  return html`
<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Link Pages</h1>
    ${links.map(link => `<article class="mb2">
      <div class="mb0">
        <p class="pb-2"><strong class="capitalize">Link Text ${i}: </strong>${link?.text || ''}</p>
        <p class="pb-2"><strong class="capitalize">Link Url ${i}: </strong>${link?.url || ''}</p>
        <p class="pb-2"><strong class="capitalize">Key: </strong>${link?.key || ''}</p>
      </div>
      <p class="mb-1">
        <enhance-link href="/links/${link.key}">Edit this link page</enhance-link>
      </p>
      <form action="/links/${link.key}/delete" method="POST" class="mb-1">
        <enhance-submit-button><span slot="label">Delete this link page</span></enhance-submit-button>
      </form>
      </article>`).join('\n')}
    <details class="mb0" >
      <summary>New link page</summary>
      <enhance-form
        action="/links"
        method="POST">
        <enhance-fieldset legend="Link Page">
          <enhance-text-input label="Link Text" type="text" id="text" name="text"  ></enhance-text-input>
          <enhance-text-input label="Link Url" type="text" id="url" name="url"  ></enhance-text-input>
          <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
        </enhance-fieldset>
      </enhance-form>
    </details>
  </main>
</enhance-page-container>
  `
}

```
We put the create form inside a details/summary to clean up the page slightly
Now we need to make sure that this page has the list of links to display.

While we are here we add buttons to Update and Delete from the list view. We will add API routes for those soon.


- Now we need to pass the data for the links to the page to display.
- For that add the following to `/app/api/links.mjs`


```javascript
// /app/api/links.mjs
import { getLinks, upsertLink } from '../models/links.mjs'

export async function get (req) {
  const links = await getLinks()
  return {
    json: { links }
  }
}

export async function post (req) {
  await upsertLink({ ...req.body })
  return {
    location: '/links'
  }
}
```

## Update
We have a button to update links from the list view,
but we need to add the page and API to support that feature.

First lets start with the update page and form.
This will be similar to the create form except with the addition of a key.
We will also need to pre-populate the form with the previous values so that only the updated values change.

Copy the code below into `/app/pages/links/$id.mjs`.

```javascript
export default function UpdateLink({ html, state }) {
  const { store } = state
  const link = store.link || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/links/${link.key}"
  method="POST">
    <enhance-fieldset legend="Link Page">
    <enhance-text-input label="Link Text" type="text" id="text" name="text" value="${link?.text || ''}" ></enhance-text-input>
    <enhance-text-input label="Link Url" type="text" id="url" name="url" value="${link?.url || ''}" ></enhance-text-input>

    <input type="hidden" id="key" name="key" value="${link?.key}" />
    <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
    </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}

```

Now lets pass the initial values to the form that will be updated.
We will also add the POST handler to update the form as well.

Copy the following code to the API route at /app/api/links/$id.mjs

```javascript
import { getLink, upsertLink } from '../../models/links.mjs'

export async function get (req) {
  const id = req.pathParameters?.id
  const result = await getLink(id)
  return {
    json: { link: result }
  }
}

export async function post (req) {
  const id = req.pathParameters?.id
  const result = await upsertLink({ key: id, ...link })
  return {
    json: { link: result },
    location: '/links'
  }
}

```

Notice the id comes from the path parameter ($id) rather than from the form input.

## Delete

We already added a form in the List view that will POST to delete an object.
We just need to add the API route that handles that POST request.

- Add the following code to the `/app/api/links/$id/delete.mjs` file.

```javascript
// /app/api/links/$id/delete
import { deleteLink } from '../../../models/links.mjs'

export async function post (req) {
  const id = req.pathParameters?.id
  let link = await deleteLink(id)
  return {
    json: { link },
    location: '/links'
  }
}

```

## Seeding Data for Local Development

In local development we get a clean database every time we start the server.
It is helpful to be able to seed some data so that we start with something.

Copy the following to the /scripts/seed-data.mjs file

```javascript
// /scripts/seed-data.mjs

import db from '@begin/data'
async function main() {
  await db.set({
    table: 'links',
    key: 'link1',
    text: 'Custom properties',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/--*'
  })

  await db.set({
    table: 'links',
    key: 'link2',
    text: 'Calc',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/calc'
  })

  await db.set({
    table: 'links',
    key: 'link3',
    text: 'Creating color themes with custom properties',
    url: 'https://css-tricks.com/creating-color-themes-with-custom-properties-hsl-and-a-little-calc/'
  })

  await db.set({
    table: 'links',
    key: 'link4',
    text: 'Theming with CSS Custom Properties (variables) and calc()',
    url: 'https://itnext.io/theming-with-css-custom-properties-variables-and-calc-a89b37ad0013'
  })

  await db.set({
    table: 'links',
    key: 'link5',
    text: 'Calculating Color: Dynamic Color Theming with Pure CSS',
    url: 'https://una.im/css-color-theming/'
  })
}
main()
```

Now to run that at startup we need to modify the `/prefs.arc` file as follows:

```arc
@sandbox
livereload true

@sandbox-startup
node scripts/seed-data.mjs
```

We now have working CRUDL routes! For a toy app this might be enough, but we are missing some critical pieces. There is no validation of the data for one thing. Lets fix that.

## Data Schema

For a simple form we could add validation logic in the handler ad-hoc. But as the data gets more complex that becomes a challenge. One way to validate on the server is by creating a schema for the data and then validating against that. There are many ways to do this, but JSON Schema is a specification that is simple enough and widely supported.

Copy the following JSON schema into the `/app/models/schemas/links.mjs`.

```javascript
// /app/models/schemas/links.mjs
export const Link = {
  "id": "Link",
  "type": "object",
  "properties": {
    "text": {
      "type": "string"
    },
    "url": {
      "type": "string"
    },
  }
}
```

Now we have rules for links to validate against.

## Data Validation Layer

As we start to add logic for validation to the routes it will helps to consolidate it into a central location.

Let's update `/app/models/links.mjs` to add a validation function:

```javascript
// /app/models/links.mjs
import data from '@begin/data'
import { validator } from '@begin/validator'
import { Link } from './schemas/link.mjs'

const deleteLink = async function (key) {
  await data.destroy({ table: 'links', key })
  return { key }
}

const upsertLink = async function (link) {
  return data.set({ table: 'links', ...link })
}

const getLink = async function (key) {
  return data.get({ table: 'links', key })
}

const getLinks = async function () {
  const databasePageResults = await data.page({
    table: 'links',
    limit: 25
  })

  let links = []
  for await (let databasePageResult of databasePageResults) {
    for (let link of databasePageResult) {
      delete link.table
      links.push(link)
    }
  }

  return links
}

const validate = {
  shared (req) {
    return validator(req, Link)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, link: data } : { link: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, link: data } : { link: data }
  }
}

export {
  deleteLink,
  getLink,
  getLinks,
  upsertLink,
  validate
}
```

Notice a few important things happening in this file:

1. The `@begin/validator` combines a few steps:
  - It creates a nested object from the flat form key/values pairs.
  - It normalizes the values into numbers, booleans, floats, etc. based on the Schema.
  - It also validates the form against the schema and returns any errors in an object called `problems`.
2. We added pagination to the list method.

Replace the code in `/app/api/links.mjs` with the code below:

```javascript
// /app/api/links.mjs
import { getLinks, upsertLink, validate } from '../../models/links.mjs'

export async function get (req) {
  const links = await getLinks()
  return {
    json: { links }
  }
}

export async function post (req) {
  let { problems, link } = await validate.create(req)

  const result = await upsertLink(link)
  return {
    location: '/links'
  }
}
```

Now we are running the server-side validation which returns our problems, if there are any.
But what do we do with them?

To close the loop on server-side validation we will need a way to keep maintain state between requests so that we can pass those problems back and forth and fix them.

The thing we need for that is sessions.

That is the next module.



