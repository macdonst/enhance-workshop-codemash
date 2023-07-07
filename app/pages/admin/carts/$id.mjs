// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const cart = store.cart || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/carts/${cart.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Cart">
  
  <enhance-text-input label="Account" type="text" id="account" name="account" value="${cart?.account}" errors="${problems?.account?.errors}"></enhance-text-input>
  <enhance-text-input label="Created_at" type="text" id="created_at" name="created_at" value="${cart?.created_at}" errors="${problems?.created_at?.errors}"></enhance-text-input>
  <enhance-text-input label="Updated_at" type="text" id="updated_at" name="updated_at" value="${cart?.updated_at}" errors="${problems?.updated_at?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${cart?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
