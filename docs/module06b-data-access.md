---
title: "Module 6b: Data Access"
layout: default
---

[Module Index](/enhance-workshop)


# Module 6b: Data Access

Up to now we have built plain HTML pages and pages that are dynamic pulling data from API routes to build the page.
Now we will go to the next level using a database to build very dynamic pages.

For this module we will build a Link Tree feature with a page that has a list of links.
Those links can be added, deleted, and edited by the site admin.

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
  deleteLink,
  getLink,
  getLinks,
  upsertLink,
}
```

That was all it takes! Every Enhance app comes with its own database. How is that for batteries included? `@begin/data` is just a thin wrapper around DynamoDB which is an incredibly fast, truly serverless database. If you don't need or use it, it will not get in your way nor will you be charged for it.


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

We now have working data access routes. 
There is no validation of the data for one thing. Lets fix that.

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
      "type": "string",
      "minLength": 1,
    },
    "url": {
      "type": "string",
      "format": "url",
    },
    "published": {
      "type": "boolean",
    },
    "key": {
      "type": "string"
    }
  }
}
```

Now we have rules for links to validate against.


Now we are running the server-side validation which returns our problems, if there are any.
But what do we do with them?

To close the loop on server-side validation we will need a way to keep maintain state between requests so that we can pass those problems back and forth and fix them.

The thing we need for that is sessions.

That is the next module.



