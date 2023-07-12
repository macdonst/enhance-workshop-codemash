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
  action="/admin/linkpages/${linkpage.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="link page">
  <enhance-text-input label="Title" type="text" id="title" name="title" value="${linkpage?.title}" errors="${problems?.title?.errors}"></enhance-text-input>
  <enhance-text-input label="Description" type="text" id="description" name="description" value="${linkpage?.description}" errors="${problems?.description?.errors}"></enhance-text-input>
  <enhance-text-input label="Page route" type="text" id="pageUrl" name="pageUrl" value="${linkpage?.page_url}" errors="${problems?.page_url?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link text 1" type="text" id="linkText1" name="linkText1" value="${linkpage?.linkText1}" errors="${problems?.linkText1?.errors}"></enhance-text-input>
  <enhance-text-input label="Link url 1" type="text" id="linkUrl1" name="linkUrl1" value="${linkpage?.linkUrl1}" errors="${problems?.linkUrl1?.errors}"></enhance-text-input>

  <enhance-text-input label="Link text 2" type="text" id="linkText2" name="linkText2" value="${linkpage?.linkText2 || ''}" errors="${problems?.linkText2?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 2" type="text" id="linkUrl2" name="linkUrl2" value="${linkpage?.linkUrl2 || ''}" errors="${problems?.linkUrl2?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 3" type="text" id="linkText3" name="linkText3" value="${linkpage?.linkText3 || ''}" errors="${problems?.linkText3?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 3" type="text" id="linkUrl3" name="linkUrl3" value="${linkpage?.linkUrl3 || ''}" errors="${problems?.linkUrl3?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 4" type="text" id="linkText4" name="linkText4" value="${linkpage?.linkText4 || ''}" errors="${problems?.linkText4?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 4" type="text" id="linkUrl4" name="linkUrl4" value="${linkpage?.linkUrl4 || ''}" errors="${problems?.linkUrl4?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 5" type="text" id="linkText5" name="linkText5" value="${linkpage?.linkText5 || ''}" errors="${problems?.linkText5?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 5" type="text" id="linkUrl5" name="linkUrl5" value="${linkpage?.linkUrl5 || ''}" errors="${problems?.linkUrl5?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 6" type="text" id="linkText6" name="linkText6" value="${linkpage?.linkText6 || ''}" errors="${problems?.linkText6?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 6" type="text" id="linkUrl6" name="linkUrl6" value="${linkpage?.linkUrl6 || ''}" errors="${problems?.linkUrl6?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 7" type="text" id="linkText7" name="linkText7" value="${linkpage?.linkText7 || ''}" errors="${problems?.linkText7?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 7" type="text" id="linkUrl7" name="linkUrl7" value="${linkpage?.linkUrl7 || ''}" errors="${problems?.linkUrl7?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 8" type="text" id="linkText8" name="linkText8" value="${linkpage?.linkText8 || ''}" errors="${problems?.linkText8?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 8" type="text" id="linkUrl8" name="linkUrl8" value="${linkpage?.linkUrl8 || ''}" errors="${problems?.linkUrl8?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 9" type="text" id="linkText9" name="linkText9" value="${linkpage?.linkText9 || ''}" errors="${problems?.linkText9?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 9" type="text" id="linkUrl9" name="linkUrl9" value="${linkpage?.linkUrl9 || ''}" errors="${problems?.linkUrl9?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Link text 10" type="text" id="linkText10" name="linkText10" value="${linkpage?.linkText10 || ''}" errors="${problems?.linkText10?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Link url 10" type="text" id="linkUrl10" name="linkUrl10" value="${linkpage?.linkUrl10 || ''}" errors="${problems?.linkUrl10?.errors || ''}"></enhance-text-input>

  <enhance-text-input label="Theme" type="text" id="theme" name="theme" value="${linkpage?.theme}" errors="${problems?.theme?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${linkpage?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
