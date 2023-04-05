export default function Page({ html, state }) {
  return html`
<style>
  :host {
    max-width: 48rem;
    margin: 2.369rem;
  }
</style>
<slot></slot>
`
}
