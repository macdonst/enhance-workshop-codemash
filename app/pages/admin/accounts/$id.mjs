// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  const account = store.account || {}
  const problems = store.problems || {}

  return html`
<enhance-page-container>
  <nav-menu></nav-menu>
  <enhance-form action="/accounts/${account.key}" method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
    <enhance-form
  action="/accounts"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Edit Account">
  <enhance-text-input label="Display Name" type="text" id="displayName" name="displayName" value="${account?.displayName}" errors="${problems?.displayName?.errors}"></enhance-text-input>
  <enhance-text-input label="User Name" type="text" id="username" name="username" value="${account?.username}" errors="${problems?.username?.errors || ''}"></enhance-text-input>
  <label>Update Password<input type=checkbox name=updatePassword ${account?.updatePassword ? 'checked' : '' }/></label>
  <enhance-text-input label="Password" type="text" id="password" name="password" errors="${problems?.password?.errors || ''}"></enhance-text-input>
  <enhance-text-input label="Confirm Password" type="text" id="confirmPassword" name="confirmPassword" errors="${problems?.confirmPassword?.errors || ''}"></enhance-text-input>
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
</enhance-page-container>`
}
