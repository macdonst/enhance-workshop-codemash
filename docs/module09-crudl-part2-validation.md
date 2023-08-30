---
title: "Module 9: CRUDL Part 2"
layout: default
---

[Module Index](/enhance-workshop)


# Module 8: CRUDL with Validation 
## Putting It All Together

## Outline

* Client/Server Validation
* Handling Problems

---

Now we are running the serverside validation which returns our problems, if there are any.
But what do we do with them?

This is where we use the session to send those problems back to the front end so that the user has another chance to fix their form.

This is the process we will use for handling problems:
1. User submits form from `/linkpages` that POSTS to `/linkpages`
2. The post handler runs validator against the form values and gets a list of `problems`.
3. Post handler adds the problems to the session along with the values submitted `session: {problems, linkpage}`
4. Post handler redirects back to `/linkpages` by setting `location: '/linkpages'` (with the above session set).
5. After being redirected GET API pulls the problems and linkpage values off the session and sets them on `json` so that the page can display them
6. HTML page uses the state.store.problems and state.store.linkpage to restore the form where they left off with the problems highlighted.

Copy and paste (or add this code) to the /app/api/linkpages.mjs API route.

```javascript
// /app/api/linkpages.mjs
import { getLinkpages, upsertLinkpage, validate } from '../../models/linkpages.mjs'


export async function get (req) {
  const linkpages = await getLinkpages()
  if (req.session.problems) {
    let { problems, linkpage, ...session } = req.session
    return {
      session,
      json: { problems, linkpages, linkpage }
    }
  }

  return {
    json: { linkpages }
  }
}

export async function post (req) {
  const session = req.session
  // Validate
  let { problems, linkpage } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, linkpage },
      json: { problems, linkpage },
      location: '/admin/linkpages'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    const result = await upsertLinkpage(linkpage)
    return {
      session: newSession,
      json: { linkpage: result },
      location: '/admin/linkpages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/linkpages'
    }
  }
}
```

Now lets update the /app/pages/linkpages.mjs to use the problems if present.


```javascript
// /app/pages/linkpages.mjs

export default function Html({ html, state }) {
  const { store } = state
  let linkpages = store.linkpages || []
  const linkpage = store.linkpage || {}
  const problems = store.problems || {}

  return html`
<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Link Pages</h1>
    ${linkpages.map(item => `<article class="mb2">
      <div class="mb0">
        <p class="pb-2"><strong class="capitalize">Title: </strong>${item?.title || ''}</p>
        <p class="pb-2"><strong class="capitalize">Description: </strong>${item?.description || ''}</p>
        <p class="pb-2"><strong class="capitalize">Page Route: </strong>${item?.path || ''}</p>

        ${item?.links.map((link,i)=>`
          <p class="pb-2"><strong class="capitalize">Link Text ${i}: </strong>${link?.text || ''}</p>
          <p class="pb-2"><strong class="capitalize">Link Url ${i}: </strong>${link?.url || ''}</p>
        `).join('')}

        <p class="pb-2"><strong class="capitalize">Key: </strong>${item?.key || ''}</p>
      </div>
      <p class="mb-1">
        <enhance-link href="/admin/linkpages/${item.key}">Edit this link page</enhance-link>
      </p>
      <form action="/admin/linkpages/${item.key}/delete" method="POST" class="mb-1">
        <enhance-submit-button><span slot="label">Delete this link page</span></enhance-submit-button>
      </form>
      </article>`).join('\n')}
    <details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
      <summary>New link page</summary>
      <enhance-form
        action="/admin/linkpages"
        method="POST">
        <div class="${problems.form ? 'block' : 'hidden'}">
          <p>Found some problems!</p>
          <ul>${problems.form}</ul>
        </div>
        <enhance-fieldset legend="Link Page">
        <enhance-text-input label="Title" type="text" id="title" name="title" value="${linkpage?.title || ''}" errors="${problems?.title?.errors || ''}"></enhance-text-input>
        <enhance-text-input label="Description" type="text" id="description" name="description" value="${linkpage?.description || ''}" errors="${problems?.description?.errors || ''}"></enhance-text-input>
        <enhance-text-input label="Page Route" type="text" id="path" name="path" value="${linkpage?.path || ''}" errors="${problems?.path?.errors || ''}"></enhance-text-input>

        ${Array(10).fill(0).map( (_,i)=> `
          <enhance-text-input label="Link Text ${i}" type="text" id="links[${i}].text" name="links[${i}].text" value="${linkpage?.links?.[i]?.text || ''}" errors="${problems?.links?.[i]?.text?.errors || ''}"></enhance-text-input>
          <enhance-text-input label="Link Url ${i}" type="text" id="links[${i}].url" name="links[${i}].url" value="${linkpage?.links?.[i]?.url || ''}" errors="${problems?.links?.[i]?.url?.errors || ''}"></enhance-text-input>
        `).join('')}

        <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
        </enhance-fieldset>
      </enhance-form>
    </details>
  </main>
</enhance-page-container>
  `
}
```

What we add here is:
1. Form problem messages at the beggining of the form,
2. Error messages on each input with the custom element `error`
3. Set the `value` attributes with the previous state


## Protect CRUDL routes
Now we have to protect the route with the session authentication.
To do this we follow the process at the end of the last module and add the:
- For the GET route:
```javascript
export async function get (req) {
  const authorized = !!req.session.authorized
  if (!authorized) {
    return {
      session: {...req.session, redirectAfterAuth:'/admin/linkpages'},
      location: '/login'
    }
  }
  ...


```
- And for the POST route:

```javascript
export async function post (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('linkpages:edit'))
  if (!authorized) return { status: 401 }
  ...
```

Next we have to update the other CRUDL routes to use the data access, problems, and authentication.

Lets save some time and just copy paste the contents for the following routes:

Copy and paste the following into the `/app/api/linkpages/$$.mjs`

```javascript
// /app/api/linkpages.mjs
import { getLinkpages, upsertLinkpage, validate } from '../../models/linkpages.mjs'


export async function get (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('linkpages:edit'))
  if (!authorized) {
    return {
      session: {...req.session, redirectAfterAuth:'/admin/linkpages'},
      location: '/login'
    }
  }

  const linkpages = await getLinkpages()
  if (req.session.problems) {
    let { problems, linkpage, ...session } = req.session
    return {
      session,
      json: { problems, linkpages, linkpage }
    }
  }

  return {
    json: { linkpages }
  }
}

export async function post (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('linkpages:edit'))
  if (!authorized) return { status: 401 }

  const session = req.session
  // Validate
  let { problems, linkpage } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, linkpage },
      json: { problems, linkpage },
      location: '/admin/linkpages'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    const result = await upsertLinkpage(linkpage)
    return {
      session: newSession,
      json: { linkpage: result },
      location: '/admin/linkpages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/linkpages'
    }
  }
}
```

```javascript
// /app/api/linkpages/$$.mjs
import { getLinkpage, upsertLinkpage, validate } from '../../../models/linkpages.mjs'

export async function get (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('linkpages:edit'))
  if (!authorized) return { location: '/login' }

  if (req.session.problems) {
    let { problems, linkpage, ...session } = req.session
    return {
      session,
      json: { problems, linkpage }
    }
  }

  const id = req.pathParameters?.id
  const result = await getLinkpage(id)
  return {
    json: { linkpage: result }
  }
}

export async function post (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('linkpages:edit'))
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, linkpage } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, linkpage },
      json: { problems, linkpage },
      location: `/admin/linkpages/${linkpage.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    const result = await upsertLinkpage({ key: id, ...linkpage })
    return {
      session: newSession,
      json: { linkpage: result },
      location: '/admin/linkpages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/linkpages'
    }
  }
}
```
`/app/api/linkpages/$id/delete.mjs`

```javascript
// /app/api/linkpages/$id/delete.mjs
import { deleteLinkpage } from '../../../../models/linkpages.mjs'

export async function post (req) {
  const authorized = !!(req.session.authorized?.scopes?.includes('linkpages:edit'))
  if (!authorized) return { status: 401 }

  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, linkpage: removed, ...newSession } = session
  try {
    let linkpage = await deleteLinkpage(id)
    return {
      session: newSession,
      json: { linkpage },
      location: '/admin/linkpages'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/admin/linkpages'
    }
  }
}

```



## Generate CRUDL

Enhance CLI has a generator that will scaffold out these CRUDL routes for us.
Why didn't you tell us that in the first place you might ask.
In most cases in the lifespan of an app this code will have to be changed.
It is valuable to understand what is happening.

