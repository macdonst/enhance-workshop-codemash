export default function LinktreeContainer({ html, state }) {
  const { store={} } = state
  const { page={}, links=[] } = store
  const { description='No description yet', title='No title yet' } = page
  const linkItems = links.map(link => {
    const { text='', url='' } = link
    return html`
    <li class="mbe0">
      <linktree-link
        text="${text}"
        url="${url}"
      >
      </linktree-link>
    </li>
  `
  }).join('\n')
  const defaultLink = html`
    <li>
      <linktree-link text="Add some links" url="/login"></linktree-link>
    </li>
    `

  return html`
    <style scope="global">
      body {
        background-image: url('/_public/background.png');
        background-size: cover;
      }
    </style>
    <style>
      :host {
        display: block;
        inline-size: 60vw;
        max-inline-size: 90vw;
        margin-inline: auto;
      }
      :host > div > img {
        width: 10rem;
      }

    </style>
    <div
     class="
       flex
       mbe5
       justify-content-center
     "
    >
      <img
       src="/_public/axol-wink.png"
       alt="Axol lotl"
      >
    </div>
    <h1
      class="
       text1
       font-bold
       mbe-4
      "
    >
      ${title}
    </h1>
    <p
      class="
        text0
        font-light
        mbe3
      "
    >
      ${description}
    </p>
    <ul class="list-none">
      ${linkItems.length ? linkItems : defaultLink}
    </ul>
  `
}
