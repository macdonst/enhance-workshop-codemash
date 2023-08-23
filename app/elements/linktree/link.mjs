export default function LinktreeLink({ html, state }) {
  const { attrs={} } = state
  const { text='', url='' } = attrs
  return html`
    <style>
      :host > a {
        display: block;
        text-decoration: none;
        padding: 1rem 2rem;
        background-color: white;
        border-width: 3px;
        border-style: solid;
        border-color: transparent;
        border-radius: 9999px;
      }
      :host > a:hover,
      :host > a:active {
        background-color: transparent;
        border-color: white;
      }
    </style>
    <a href="${url}" alt="${text}" class="truncate">${text}</a>
  `
}
