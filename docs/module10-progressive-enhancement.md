---
title: "Module 10: Progressive Enhancement"
layout: default
---


[Module Index](/enhance-workshop)

# Module 10: Progressive Enhancement

Up until this point in the workshop we have only written server side code. It just goes to show you how great the platform has gotten in the past few years. Now we are going to focus on progressive enhancement.

> The word progressive in progressive enhancement means creating a design that achieves a simpler-but-still-usable experience for users of older browsers and devices with limited capabilities, while at the same time being a design that progresses the user experience up to a more-compelling, fully-featured experience for users of newer browsers and devices with richer capabilities.
> From MDN

## Progressively Enhancing Components

Let's make the user experience for deleting links from our database a bit nicer. Currently, when you delete one of the links it requires a page reload. That's fine but we can make that user experience a bit smoother.

- Create a new file called `app/elements/delete-button.mjs`. In that file copy the following contents.

```javascript
export default function DeleteButton({ html, state }) {
  const { attrs } = state
  const { key } = attrs
  return html`
    <form action="/links/${key}/delete" method="POST" class="mb-1">
        <enhance-submit-button><span slot="label">Delete this link</span></enhance-submit-button>
    </form>
    `
}
```

- We'll replace the existing delete button with this component in just a moment but first we need to talk about attribute handling in Enhance.

### Attributes

- Attributes are another way you can pass data into your Enhance components. For example:

```html
<delete-button key="link1"></delete-button>
```
- When server side rendered your attributes are available as key value pairs in `state.attrs`.
- Remember we are talking about HTML attributes here. This means that the value of every attribute that is passed into your web component is treated like a string. So if you pass in a number you need to convert it to an number first.
- When it comes to booleans you should check for the existence of the attribute. If the attribute exists then it's true, otherwise it's false.
- Naming attributes can be challenging as well. We strongly recommend using all lowercase attribute names like all HTML tags. Improper naming can make them hard to use with JavaScript or prevent the `attributeChangedCallback` from firing. For more info [read](https://enhance.dev/docs/learn/concepts/state/attributes#naming-attributes).

## Back to PE

- Let's make sure our new delete button is working properly. Open `app/pages/links.mjs` and replace:

```html
<form action="/links/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this link</span></enhance-submit-button>
</form>
```

with

```html
<delete-button key="${item.key}"></delete-button>
```

- Navigate to `https://localhost:3333/links` and delete a few links. Note: every click of a delete button causes a page refresh. Let's fix that.

## Client side JavaScript, Not too much

- Open `app/elements/delete-button.mjs` again and add the following script tag under the `form` tag but still inside the tag template literal.

```html
<script>
class DeleteButton extends HTMLElement {
  #key = null
  static observedAttributes = ['key']

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

  #handleClick = async event => {
    event.preventDefault()
    let element = document.getElementById(this.getAttribute('key'))
    let display = element.style.display
    element.style.display = 'none'
    let { action, method } = event.target.closest('form')
    try {
      await fetch(action, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      })
      element.remove()
    } catch(error) {
      console.error("Whoops!", error)
      element.style.display = display
    }
  }
}
customElements.define('delete-button', DeleteButton);
</script>
```

- Those 40 lines of JavaScript are all we need to make our button more interactive. Let's go over a few of the salient points.

  1. `class DeleteButton extends HTMLElement` defines our `DeleteButton` and extends the base `HTMLElement` class. There was a proposal to allow you to extend from other HTML Elements like `HTMLButtonElement` but Apple refuses to implement it so it is effectively dead.
  2. `#key = null;` defines a private variable called `key`.
  3. `static observedAttributes = ['key']` this array is where you tell the web components which attributes you want to be notified of when updated.
  4. `attributeChangedCallback` is where you handle any changes to the values of attributes you are observing.
  5. `connectedCallback` is called whenever your web component is added to the DOM. This is a good place to add event listeners just like we are doing in this example.
  6. `disconnectedCallback` is called whenever your web component is removed from the DOM. This is a good place to clean up event listeners to prevent memory links.
  7. `#handleClick` is a private method where we handle the click of the delete button. In this method we use `fetch` to call our delete API. Once it succeeds we remove the offending element from the DOM.

> A note about the `#handleClick` function. You might be wondering why the method name starts with a `#`? We are using a private method in this case as we don't want any JavaScript outside of the web component to be able to delete our links. Deleting is a destructive action so we want to limit it to user initiated actions.
>
> Also, you may have noticed we are using an arrow function. This is purely a preference of mine but it saves you from having to bind the value of `this` to the class.

- In order for this to work we need to make one more change to `app/pages/links.mjs`. When we map through all the links we will add an `id` to the `article` tag so we can do some DOM surgery.
- Now try deleting a few links. You'll notice, no more page refresh.

## Base Classes

Writing plain vanilla web components can be tedious as there is a lot of boilerplate code. Luckily, Enhance provides a number of base classes you can extend that reduce the amount of code you need to write. Let's update our `delete-button` component to use `@enhance/custom-element`.

First, let's add that dependency:

```bash
npm i @enhance/custom-element
```

Now we'll be able to extend our web components from `CustomElement` which in turn extends `HTMLElement`.

## Externalize scripts

- Our `app/elements/delete-button.mjs` component is about to outgrow it's single-file component.
- As well, even with the best VS Code extension it can be a pain to write JavaScript code inside a tagged template literal.
- So let's externalize this code as part of our refactoring to use the `CustomElement` base class.
- In the `app/elements/delete-button.mjs` file replace the contents with:

```javascript
export default function DeleteButtonElement({ html, state }) {
  const { attrs } = state
  const { key } = attrs
  return html`
    <style>
        :host button {
          color: var(--light);
          background-color: var(--primary-500)
        }
        :host button:focus, :host button:hover {
          outline: none;
          background-color: var(--primary-400)
        }
    </style>
    <form action="/links/${key}/delete" method="POST" class="mb-1">
        <button class="whitespace-no-wrap pb-3 pi0 font-semibold cursor-pointer radius0">
          <span>Delete this link</span>
        </button>
    </form>
    <script type="module" src="/_public/browser/delete-button.mjs"></script>
    `
}
```

- We've replaced the contents of the `script` tag so we need a new place to host this code.
- Create a new file `browser/delete-button.mjs` and populate it with the following code:

```javascript
/* eslint-disable no-undef */
import CustomElement from '@enhance/custom-element'
import DeleteButtonElement from '../elements/delete-button.mjs'

export default class DeleteButton extends CustomElement {
  static observedAttributes = ['key']

  keyChanged(value) {
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

  #handleClick = async event => {
    event.preventDefault()
    let element = document.getElementById(this.getAttribute('key'))
    let display = element.style.display
    element.style.display = 'none'
    let { action, method } = event.target.closest('form')
    try {
      await fetch(action, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      })
      element.remove()
    } catch(error) {
      console.error("Whoops!", error)
      element.style.display = display
    }
  }
}


if (!customElements.get('delete-button')) {
  customElements.define('delete-button', DeleteButton);
}
```

- The key differences, pun intended, is that the the class now extends `CustomElement`.
- `attributeChangedCallback` is gone and it has been replaced  with the `keyChanged` method.
- If any attributes in the `observedAttributes` array are modified, `CustomElement` will check to see if there is a corresponding `attributeChanged` method. If yes, it will execute that method only if the value  of the attribute has changed.
- As well there is now a `render` method which is called to re-render the component on any attribute changes. This is a great way of sharing a render method between the client and the server. Isomorphic JavaScript that works for once!

## Getting crazy with the PE

When we first started progressively enhancing this form we did so with the delete button. Next we'll update our new links form to avoid a page reload when creating a new link.

- We'll start by creating two new elements `app/elements/link-item.mjs` and `app/elements/submit-button.mjs`.

```javascript
// app/elements/link-item.mjs
export default function LinkItemElement({ html, state }) {
  const { attrs } = state
  const { key = '', text = '', url = '' } = attrs
  return html`
      <article class="mb2">
        <div class="mb0">
            <p class="pb-2"><strong class="capitalize">text: </strong><span>${text}</span></p>
            <p class="pb-2"><strong class="capitalize">url: </strong><span>${url}</span></p>
            <p class="pb-2"><strong class="capitalize">key: </strong><span>${key}</span></p>
        </div>
        <p class="mb-1">
            <a href="/links/${key}">Edit this link</a>
        </p>
        <delete-button key="${key}"></delete-button>
      </article>
      `
}
```

```javascript
// app/elements/submit-button.mjs
export default function SubmitButton({ html }) {
  return html`
      <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
      `
}
```

- Next we'll write the client side JavaScript for these two elements. First up `app/browser/link-item.mjs`.

```javascript
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
```

- Since this component has 3 attributes we've written `Change` handlers for all of them. The `keyChanged` handler is responsible for passing the `key` attribute down to it's children.
- Next we'll write a fancy submit button. Create a new file `app/browser/submit-button.mjs` and populate it with:

```javascript
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

  #handleClick = async event => {
    event.preventDefault()
    let form = event.target.closest('form')
    let { action, method } = form
    try {
      let response = await fetch(action, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
      let { link } = await response.json()
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
    } catch(error) {
      console.error("Whoops!", error)
    }
  }
}
if (!customElements.get('submit-button')) {
  customElements.define('submit-button', SubmitButton)
}
```

- The `SubmitButton` doesn't have any attributes but it does register an even listener to submit your form using `fetch`.
- The interesting part about this code is that it creates a the custom element `LinkItem` and adds it to the DOM using JavaScript. 🤯
- We need to make sure that all our new elements are available on the client side so let's create one more file `app/browser/links-page.mjs` to bundle everything together.

```javascript
import DeleteButton from './delete-button.mjs'
import LinkItem from './link-item.mjs'
import SubmitButton from "./submit-button.mjs"

export { DeleteButton, LinkItem, SubmitButton }
```

> Note: all files in `app/browser` will be bundled into `public/browser` so they will be available to the client.

- Finally, we need to make changes to `app/pages/links.mjs` to take advantage of our new custom elements. Update it with:

```javascript
export default function Html ({ html, state }) {
  const { store } = state
  let links = store.links || []
  const link = store.link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Links page</h1>
    ${links.map(item => `<link-item id="${item.key}" key="${item.key}" text="${item.text}" url="${item.url}"></link-item>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New link</summary>
    <enhance-form
  action="/links"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Link">
  <enhance-text-input label="Text" type="text" id="text" name="text" value="${link?.text}" errors="${problems?.text?.errors}"></enhance-text-input>
  <enhance-text-input label="Url" type="url" id="url" name="url" value="${link?.url}" errors="${problems?.url?.errors}"></enhance-text-input>
  <enhance-checkbox label="Published" type="checkbox" id="published" name="published" ${link?.published ? "checked" : ""} errors="${problems?.published?.errors}"></enhance-checkbox>
  <input type="hidden" id="key" name="key" value="${link?.key}" />
  <submit-button style="float: right"><span slot="label">Save</span></submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
<script type="module" src="/_public/browser/links-page.mjs"></script>
  `
}
```

- When we loop through all the links instead of creating DOM elements directly we delegate it to our new `link-item` component.
- We add a `script` tag to the page that includes all the client side code required.

## DOM Diffing

If you have experience with other JavaScript frameworks you are probably wondering why we have to do DOM surgery instead of using DOM diffing. Good news, Enhance supports DOM diffing as well but we wanted to progressively improve our app one layer at a time instead of jumping to directly to the end game.

Adding DOM diffing to our Enhance components won't add any new functionality. Rather it is a layer of syntactical sugar that will make your code easier to read.

> Note: adding this layer of DOM diffing may improve your developer experience (DX) but it comes as a cost. First, DOM diffing will always be slower than surgical DOM updates. That's a fact. Secondly, your JavaScript bundle sizes will be larger due to the fact that the DOM diffing logic has to be sent to the client as well.
>
> This isn't to say you shouldn't use DOM diffing but you should be aware of the trade offs you are about to make.

With all that preamble out of the way let's add DOM diffing to our application. In order to do that we need to install another npm package called `@enhance/morphdom-mixin`.

```bash
npm i @enhance/morphdom-mixin
```

Now that our mixin is available we will be able to update our `app/browser/delete-button.mjs` and `app/browser/link-item.mjs` to take advantage of DOM diffing.

First let's look at `app/browser/delete-button.mjs`

```javascript
/* eslint-disable no-undef */
import CustomElement from '@enhance/custom-element'
import MorphdomMixin from '@enhance/morphdom-mixin'
import DeleteButtonElement from '../elements/delete-button.mjs'

export default class DeleteButton extends MorphdomMixin(CustomElement) {
  static get observedAttributes() {
    return ['key']
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

  #handleClick = async event => {
    event.preventDefault()
    let element = document.getElementById(this.getAttribute('key'))
    let display = element.style.display
    element.style.display = 'none'
    let { action, method } = event.target.closest('form')
    try {
      await fetch(action, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      })
      element.remove()
    } catch(error) {
      console.error("Whoops!", error)
      element.style.display = display
    }
  }
}

if (!customElements.get('delete-button')) {
  customElements.define('delete-button', DeleteButton);
}
```

By adding in the `MorphdomMixin` we've enabled DOM diffing. This means we can remove the `keyChanged` method as the mixin will handle updating the `key` wherever it is used when the attribute value is changed.

That doesn't save us a ton of typing but it gets better when we look at `app/browser/link-item.mjs`

```javascript
/* eslint-disable no-undef */
import CustomElement from '@enhance/custom-element'
import MorphdomMixin from '@enhance/morphdom-mixin'
import LinkItemElement from '../elements/link-item.mjs'

export default class LinkItem extends MorphdomMixin(CustomElement) {
  static observedAttributes = ['key', 'text', 'url'];

  render(args) {
    return LinkItemElement(args)
  }
}

if (!customElements.get('link-item')) {
  customElements.define('link-item', LinkItem);
}
```

Whoa, were did all the code go? DOM diffing magic, baby! The `constructor` is no longer required since we don't need references to the `span` elements anymore. Then all of our `Changed` methods disappear as the mixin will handle this for us as well. This is especially useful for the `keyChanged` method as we don't have to pass the new `key` value into the edit link or the delete button.

Congratulations, you've just learned another tool to add to your Enhance toolbox. It's up to you to decide when you should use this technique. If you only have one or two components that require DOM diffing you may be better off to handle it with surgical DOM updates but if you are building a large system with many components that require updating you may want to reach for this technique to keep everything straight.

