/* eslint-disable no-undef */
import CustomElement from '@enhance/custom-element'
import LinkItemElement from '../elements/link-item.mjs'

export default class LinkItem extends CustomElement {
  constructor() {
    super()
    this.textElement = this.querySelectorAll('span')[0]
    this.urlElement = this.querySelectorAll('span')[1]
    this.keyElement = this.querySelectorAll('span')[2]
  }

  static observedAttributes = ['key', 'text', 'url'];

  textChanged(value) {
    this.textElement.innerText = value
  }

  urlChanged(value) {
    this.urlElement.innerText = value
  }

  keyChanged(value) {
    this.keyElement.innerText = value
    this.querySelector('a').setAttribute('href', `/links/${value}`)
    this.querySelector('delete-button').setAttribute('key', value)
  }

  render(args) {
    return LinkItemElement(args)
  }
}

if (!customElements.get('link-item')) {
  customElements.define('link-item', LinkItem);
}
