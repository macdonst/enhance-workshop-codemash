export default function DeleteButton({ html, state }) {
  const { attrs } = state
  const { key } = attrs
  return html`
    <form action="/links/${key}/delete" method="POST" class="mb-1">
        <enhance-submit-button><span slot="label">Delete this link</span></enhance-submit-button>
    </form>
    <script>
class DeleteButton extends HTMLElement {
  #key = null;

  static observedAttributes = ['key'];

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'key' && oldVal !== newVal) {
      this.#key = newVal;
    }
  }

  connectedCallback() {
    this.button = this.querySelector('button')
    this.button.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.#handleClick);
  }

  #handleClick = event => {
    event.preventDefault()
    let { action, method } = event.target.closest('form')
    fetch(action, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
      })
      .then(() => {
        document.getElementById(this.#key).remove()
      })
      .catch(error => {
        console.error("Whoops!")
      })
  }
}
customElements.define('delete-button', DeleteButton);
    </script>
    `
}
