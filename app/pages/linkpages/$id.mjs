// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  const linkpage = store.linkpage || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/linkpages/${linkpage.key}"
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

    <input type="hidden" id="key" name="key" value="${linkpage?.key}" />
    <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
    </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
