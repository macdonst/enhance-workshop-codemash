// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  let linkpages = store.linkpages || []
  const linkpage = store.linkpage || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Link Pages</h1>
    ${linkpages.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">Title: </strong>${item?.title || ''}</p>
  <p class="pb-2"><strong class="capitalize">Description: </strong>${item?.description || ''}</p>
  <p class="pb-2"><strong class="capitalize">Page Route: </strong>${item?.pageUrl || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Text 1: </strong>${item?.linkText1 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 1: </strong>${item?.linkUrl1 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 2: </strong>${item?.linkText2 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 2: </strong>${item?.linkUrl2 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 3: </strong>${item?.linkText3 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 3: </strong>${item?.linkUrl3 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 4: </strong>${item?.linkText4 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 4: </strong>${item?.linkUrl4 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text_5: </strong>${item?.linkText5 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 5: </strong>${item?.linkUrl5 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 6: </strong>${item?.linkText6 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 6: </strong>${item?.linkUrl6 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 7: </strong>${item?.linkText7 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 7: </strong>${item?.linkUrl7 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 8: </strong>${item?.linkText8 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 8: </strong>${item?.linkUrl8 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 9: </strong>${item?.linkText9 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 9: </strong>${item?.linkUrl9 || ''}</p>

  <p class="pb-2"><strong class="capitalize">Link Text 10: </strong>${item?.linkText10 || ''}</p>
  <p class="pb-2"><strong class="capitalize">Link Url 10: </strong>${item?.linkUrl10 || ''}</p>

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
  <enhance-text-input label="Page Route" type="text" id="page_url" name="page_url" value="${linkpage?.page_url || ''}" errors="${problems?.page_url?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Text 1" type="text" id="linkText_1" name="linkText1" value="${linkpage?.linkText1 || ''}" errors="${problems?.linkText1?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 1" type="text" id="linkUrl1" name="linkUrl1" value="${linkpage?.linkUrl1 || ''}" errors="${problems?.linkUrl1?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 2" type="text" id="linkText2" name="linkText2" value="${linkpage?.linkText2 || ''}" errors="${problems?.linkText2?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 2" type="text" id="linkUrl2" name="linkUrl2" value="${linkpage?.linkUrl2 || ''}" errors="${problems?.linkUrl2?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 3" type="text" id="linkText3" name="linkText3" value="${linkpage?.linkText3 || ''}" errors="${problems?.linkText3?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 3" type="text" id="linkUrl3" name="linkUrl3" value="${linkpage?.linkUrl3 || ''}" errors="${problems?.linkUrl3?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 4" type="text" id="linkText4" name="linkText4" value="${linkpage?.linkText4 || ''}" errors="${problems?.linkText4?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 4" type="text" id="linkUrl4" name="linkUrl4" value="${linkpage?.linkUrl4 || ''}" errors="${problems?.linkUrl4?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 5" type="text" id="linkText5" name="linkText5" value="${linkpage?.linkText5 || ''}" errors="${problems?.linkText5?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 5" type="text" id="linkUrl5" name="linkUrl5" value="${linkpage?.linkUrl5 || ''}" errors="${problems?.linkUrl5?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 6" type="text" id="linkText6" name="linkText6" value="${linkpage?.linkText6 || ''}" errors="${problems?.linkText6?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 6" type="text" id="linkUrl6" name="linkUrl6" value="${linkpage?.linkUrl6 || ''}" errors="${problems?.linkUrl6?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 7" type="text" id="linkText7" name="linkText7" value="${linkpage?.linkText7 || ''}" errors="${problems?.linkText7?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 7" type="text" id="linkUrl7" name="linkUrl7" value="${linkpage?.linkUrl7 || ''}" errors="${problems?.linkUrl7?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 8" type="text" id="linkText8" name="linkText8" value="${linkpage?.linkText8 || ''}" errors="${problems?.linkText8?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 8" type="text" id="linkUrl8" name="linkUrl8" value="${linkpage?.linkUrl8 || ''}" errors="${problems?.linkUrl8?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 9" type="text" id="linkText9" name="linkText9" value="${linkpage?.linkText9 || ''}" errors="${problems?.linkText9?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 9" type="text" id="linkUrl9" name="linkUrl9" value="${linkpage?.linkUrl9 || ''}" errors="${problems?.linkUrl9?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link Text 10" type="text" id="linkText10" name="linkText10" value="${linkpage?.linkText10 || ''}" errors="${problems?.linkText10?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link Url 10" type="text" id="linkUrl10" name="linkUrl10" value="${linkpage?.linkUrl10 || ''}" errors="${problems?.linkUrl10?.errors || ''}"></enhance-text-input>

  <input type="hidden" id="key" name="key" value="${linkpage?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
  `
}
