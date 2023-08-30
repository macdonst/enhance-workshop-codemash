/* eslint-disable no-undef */
import CustomElement from '@enhance/custom-element'
import DeleteButtonElement from '../elements/delete-button.mjs'

export default class DeleteButton extends CustomElement {
  #key = null;

  static observedAttributes = ['key']

  keyChanged(value) {
    this.#key = value
    this.querySelector('form').setAttribute('action', `/links/${value}/delete`)
  }

  render(args) {
    return DeleteButtonElement(args)
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
    let element = document.getElementById(this.#key)
    let display = element.style.display
    element.style.display = 'none'
    let { action, method } = event.target.closest('form')
    fetch(action, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    })
      .then(() => {
        element.remove()
      })
      .catch(error => {
        console.error("Whoops!", error)
        element.style.display = display
      })
  }
}


if (!customElements.get('delete-button')) {
  customElements.define('delete-button', DeleteButton);
}
