export default function LinkItemElement({ html, state }) {
  const { attrs } = state
  const { key = '', text = '', url = '' } = attrs
  return html`
      <article class="mb2">
        <div class="mb0">
            <p class="pb-2"><strong class="capitalize">text: </strong><output>${text}</output></p>
            <p class="pb-2"><strong class="capitalize">url: </strong><output>${url}</output></p>
            <p class="pb-2"><strong class="capitalize">key: </strong><output>${key}</output></p>
        </div>
        <p class="mb-1">
            <a href="/links/${key}">Edit this link</a>
        </p>
        <delete-button key="${key}"></delete-button>
      </article>
      `
}
