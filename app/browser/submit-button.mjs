/* eslint-disable no-undef */
import LinkItem from './link-item.mjs'

export default class SubmitButton extends HTMLElement {
  connectedCallback() {
    this.button = this.querySelector('button')
    this.button.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.#handleClick);
  }

  #handleClick = event => {
    event.preventDefault()
    let form = event.target.closest('form')
    let { action, method } = form
    let data = new FormData(form)
    console.log('text', data.get('text'))
    fetch(action, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        text: data.get('text'),
        url: data.get('url')
      })
    })
      .then(response => response.json())
      .then(({ link }) => {
        let { key, text, url } = link
        let details = document.querySelector('details')
        details.removeAttribute('open')
        form.reset()
        let detailsParent = details.parentNode
        let newNode = new LinkItem()
        newNode.id = key
        newNode.setAttribute('key', key)
        newNode.setAttribute('text', text)
        newNode.setAttribute('url', url)
        detailsParent.insertBefore(newNode, details)
      })
      .catch(error => {
        console.error("Whoops!", error)
      })
  }
}
customElements.define('submit-button', SubmitButton);
