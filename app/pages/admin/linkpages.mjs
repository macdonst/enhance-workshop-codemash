// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
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
        action="/admin/linkpages/${linkpage.key}"
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
          <enhance-text-input label="Link Text ${i}" type="text" id="links[${i}].text" name="link[${i}].text" value="${linkpage?.links?.[i]?.text || ''}" errors="${problems?.links?.[i]?.text?.errors || ''}"></enhance-text-input>
          <enhance-text-input label="Link Url ${i}" type="text" id="link[${i}].url" name="link[${i}].url" value="${linkpage?.links?.[i]?.url || ''}" errors="${problems?.links?.[i]?.url?.errors || ''}"></enhance-text-input>
        `).join('')}

        <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
        </enhance-fieldset>
      </enhance-form>
    </details>
  </main>
</enhance-page-container>
  `
}
