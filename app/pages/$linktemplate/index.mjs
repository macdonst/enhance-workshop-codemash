export default function linkPage({ html, state }) {
  const { store={} } = state
  const { linkPage={} } = store
  const {
    title='',
    description='',
    links=[]
  } = linkPage

  const linkItems = links.map( link => {
    if (link.url) {
      return html`
      <linkpage-link
        href=${link.url}
        text=${link.text}
      ></linkpage-link>`
    }
  }).join('\n')

  return html`
    <style>
      :host div {
        max-width: 20rem;
        background-color: green;
      }
    </style>
<nav-bar class='pb4 sticky inset-bs-0 z1'></nav-bar>
<site-container>
  <div
   class="
     mi-auto
   "
  >
    <h1 class="">${title}</h1>
    <p>${description}</p>
    ${linkItems}
  </div>
</site-container>
<site-footer></site-footer>
`
}
