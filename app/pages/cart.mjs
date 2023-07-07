// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  const cart = store.cart || {}
  const workshops = store.workshops || []
  const problems = store.problems || {}
  console.log(JSON.stringify(cart))

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Carts page</h1>
    <article class="mb2">
      <div class="mb0">
          ${cart.bookings?.map(booking => `
        <p class="pb-2"><strong class="capitalize">${workshops.find(w => w.key === booking.workshop_id) || ''}</p>
        <p class="pb-2"><strong class="capitalize">${booking.seats || ''}</p>
          `)}
        <p class="pb-2"><strong class="capitalize">account: </strong>${cart?.account || ''}</p>
        <p class="pb-2"><strong class="capitalize">created_at: </strong>${cart?.created_at || ''}</p>
        <p class="pb-2"><strong class="capitalize">updated_at: </strong>${cart?.updated_at || ''}</p>
        <p class="pb-2"><strong class="capitalize">key: </strong>${cart?.key || ''}</p>
      </div>
    </article>
  </main>
</enhance-page-container>
  `
}
