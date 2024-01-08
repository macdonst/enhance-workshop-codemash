// app/pages/cookie.mjs
export default function cookie ({html, state}) {

  return html`
    <pre>${JSON.stringify(state.store, null, 2)}</pre>`
}
