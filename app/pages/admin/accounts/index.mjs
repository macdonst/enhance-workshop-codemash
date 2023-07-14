// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  let accounts = store.accounts || []
  const account = store.account || {}
  const problems = store.problems || {}

  return html`<page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Accounts</h1>
    ${accounts.map(item => `<article class="mbe2">
<div class="mbe0">
  <p class="pbe-2"><strong class="capitalize">Display Name: </strong>${item?.displayName || ''}</p>
  <p class="pbe-2"><strong class="capitalize">Username: </strong>${item?.username || ''}</p>
  <p class="pbe-2"><strong class="capitalize">scopes: </strong>${item?.scopes?.join(', ') || ''}</p>
  <p class="pbe-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mbe-1">
  <enhance-link href="/admin/accounts/${item.key}">Edit this account</enhance-link>
</p>
<form action="/admin/accounts/${item.key}/delete" method="POST" class="mbe-1">
  <enhance-submit-button><span slot="label">Delete this account</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mbe0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New account</summary>
    <enhance-form
  action="/admin/accounts"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="New Account">
  <enhance-text-input label="Display Name" type="text" id="displayName" name="displayName" value="${account?.displayName}" errors="${problems?.displayName?.errors}"></enhance-text-input>
  <enhance-text-input label="User Name" type="text" id="username" name="username" value="${account?.username}" errors="${problems?.username?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Password" type="password" id="password" name="password" errors="${problems?.password?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" errors="${problems?.confirmPassword?.errors || ''}"></enhance-text-input>
  <enhance-fieldset legend="Scopes">
  <label>Scopes
  <select name="scopes[]" >
    <option value="" ></option>
    <option value="linkpages:edit" ${account?.scopes?.[0]==='linkpages:edit' ? 'selected' : '' } >Edit Link Pages</option>
    <option value="admin"  ${account?.scopes?.[0]==='admin' ? 'selected' : '' } >Admin</option>
  </select>
  <select name="scopes[]" >
    <option value="" ></option>
    <option value="linkpages:edit" ${account?.scopes?.[1]==='linkpages:edit' ? 'selected' : '' } >Edit Link Pages</option>
    <option value="admin"  ${account?.scopes?.[1]==='admin' ? 'selected' : '' } >Admin</option>
  </select>
  </label>
  </enhance-fieldset>

  <enhance-submit-button><span slot=label>Submit</span></enhance-submit-button>
</enhance-form>
</details>
</main>
</page-container>
  `
}
