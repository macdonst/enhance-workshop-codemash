// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  let carts = store.carts || []
  const cart = store.cart || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Carts page</h1>
    ${carts.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">bookings: </strong>${item?.bookings || ''}</p>
  <p class="pb-2"><strong class="capitalize">account: </strong>${item?.account || ''}</p>
  <p class="pb-2"><strong class="capitalize">created_at: </strong>${item?.created_at || ''}</p>
  <p class="pb-2"><strong class="capitalize">updated_at: </strong>${item?.updated_at || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/carts/${item.key}">Edit this cart</enhance-link>
</p>
<form action="/carts/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this cart</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New cart</summary>
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
</details>
</main>
</enhance-page-container>
  `
}
