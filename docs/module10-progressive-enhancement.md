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
```

- Those 40 lines of JavaScript are all we need to make our button more interactive. Let's go over a few of the salient points.

  1. `class DeleteButton extends HTMLElement` defines our `DeleteButton` and extends the base `HTMLElement` class. There was a proposal to allow you to extend from other HTML Elements like `HTMLButtonElement` but Apple refuses to implement it so it is effectively dead.
  2. `#key = null;` defines a private variabled called `key`.
  3. `static observedAttributes = ['key']` this array is where you tell the web components which attributes you want to be notified of when updated.
  4. `attributeChangedCallback` is where you handle any changes to the values of attributes you are observing.
  5. `connectedCallback` is called whenever your web component is added to the DOM. This is a good place to add event listeners just like we are doing in this example.
  6. `disconnectedCallback` is called whenever your web component is removed from the DOM. This is a good place to clean up event listeners to prevent memory links.
  7. `#handleClick` is a private method where we handle the click of the delete button. In this method we use `fetch` to call our delete API. Once it succeeds we remove the offending element from the DOM.

- In order for this to work we need to make one more change to `app/pages/links.mjs`. When we map through all the links we will add an `id` to the `article` tag so we can do some DOM surgery.
- Now try deleting a few links. You'll notice, no more page refresh.

## Externalize scripts

- If your script outgrows your single-file component you can link to it. Another way you can incrementally progress your elements to support your needs.
- Create a new file `public/delete-button.mjs` and populate it with the contents of the `script` tag.
- Then update `app/elements/delete-button.mjs` to replace the existing script tag with:

```html
<script type="module" src="/_public/delete-button.mjs"></script>
```

