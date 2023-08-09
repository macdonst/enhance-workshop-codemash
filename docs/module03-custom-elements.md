---
title: "Module 3: Custom Elements and Web Components"
---

[Module Index](/)


# Module 3: Custom Elements and Web Components

---
## Objectives


* The built-in component model
* Custom Elements vs Web Components
* SSR Components with Enhance

---
## The web needs a component model

* Building with components is convenient
* The web platform lacked a component
* Explosion of frameworks like React is partly to solve this problem
* If you ask developers to build something complex without components they will usually build some abstraction to allow them to use components

---
## The platform's native component model


* “Web Components” arrived slowly
* The process was not smooth
* But they are ready for production
* Better than JS Framework of the past
* We are not going to spend time with that history, but it is important because there is a lot of outdated or incorrect information about why they don’t work and you shouldn’t use them.

---
## Web Component Definition

* A set of platform APIs for the creation of custom, reusable HTML tags
* Three primary specifications:
    * Custom Elements: Define custom HTML elements and add behavior defined in JavaScript.
    * Shadow DOM: A JavaScript API for attaching an encapsulated "shadow" DOM tree to an element in order to keep an element's features private.
    * HTML Templates: The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page. These can then be reused multiple times as the basis of a custom element's structure.

---
## Web Component Example

* Checkout the Module 3 code:

```bash
cd enhance-workshop
git checkout module3-start
```
---

* Add the following code to `app/pages/component.html`

```html
  <user-card role="Developer">
    John Doe
    <span slot="email">john.doe@example.com</span>
  </user-card>
  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
          <style>
            .card {
              width: 200px;
              border: 1px solid black;
              padding: 10px;
              margin: 10px;
            }
          </style>
          <div class="card">
            <h2><slot></slot></h2>
            <p>Email: <slot name="email"></slot></p>
            <p>Role: ${this.getAttribute('role')}</p>
          </div>
        `;
      }
    }
    customElements.define('user-card', UserCard);
  </script>
```

* This is a simple HTML page with no Enhance magic at all.
* This is really powerful.
* We define the behavior of `<user-card>` once and then we can then use it anywhere.

---

## JavaScript dependent

* The Web Component specification was developed with the assumption that JavaScript will always work.
* Without JavaScript, stuff breaks.
* Lets add some artificial delay to initializing the javascript
    * Add the following to the top of the script tag:
    * `await new Promise(resolve => setTimeout(resolve, seconds * 2000))`
* You get a momentary flash of unstyled broken content.
* This is at minimum ugly.
* If JavaScript fails to load completely the page may be completely broken.

---

##  Problems with the ShadowDOM

* Most problems with WC are downstream of the shadowDOM
* The ShadowDOM encapsulation breaks platform APIs
    * Forms don’t submit
    * Forms don’t validate
    * `querySelect` does not work
* The form below will not submit because the actual `<input>` is trapped inside the shadowDOM.

```html
<form action="/" method="post">
  <my-input label="name"></my-input>
</form>

<script>
  class MyInput extends HTMLElement {
    constructor() {
      super()

      let shadow = this.attachShadow({mode: 'open'})

      shadow.innerHTML = `
        <label>${this.getAttribute('label')}
          <input/>
        </label>
      `
    }
  }

  customElements.define('my-input', MyInput)
</script>
```

* It would be nice if we could author the shortened version `<my-input></my-input>` and have it expanded into the following version with the markup inside added, without using the shadowDOM.

```html
<form action="/" method="post">
  <my-input label="thing">
    <label>Thing
       <input/>
    </label>
  </my-input>
</form>
```

* Even without JavaScript this form will work exactly as expected. The <my-input> is an unrecognized tag that the browser will treat as a <span>.
* The only problem with this form is that if you have to author all the markup inside the tag you lose much of the convenience of building with components.

---

### Enhance = Web Components The Good Parts

* The biggest advantage of Enhance is SSR WC without the shadowDOM
* There is not much magic in the Enhance framework by design, but it does Server Side render/expand web components so that they arrive at the client ready to go.

---


### Enhance Elements

* We will rewrite our `<nav-bar>` as a custom element.
* The result is shown below. Paste this code in the `/app/elements/nav-bar.mjs` file.

```javascript
export default function NavBar({ html }) {
  return html`
    <style>
      :host {
        display: block;
        backdrop-filter: blur(3px);
        background: hsla(0deg 0% 100% / 0.9);
      }
    </style>
    <site-container>
      <nav class='flex gap0'>
        <h1 class='font-semibold tracking-1'><a href='/' class='no-underline'>a.d.c</a></h1>
        <ul class='mis-auto flex gap0 list-none'>
          <li><a href='/'>Home</a></li>
          <li><a href='/about'>About</a></li>
        </ul>
      </nav>
    </site-container>
    <script type="module">
      //YAGNI ... for now
    </script>
  `
}
```

* This is an Enhance Single File Component.
* It does a few things to improve page performance, but there is very little magic here. You could cut and paste this code into your HTML for every instance of the `<nav-bar>` and this would work as expected. This is just standard platform HTML, CSS and JavaScript.
* The performance improvements that Enhance adds are:
    * Moving the `<style>` tags to the head of the file and deduplicating them
    * Moving `<script>` tags to the end of the file and deduplicating them.
    * Scoping the style tags to target on the custom element they are written in


---

### Authoring with Custom Elements

* Now that we have a <nav-bar> defined in /app/elements lets simplify our about page

```html
<!-- /app/pages/about.html--->
<nav-bar></nav-bar>
<main>
  <h1>About</h1>
  <p>Hello World</p>
</main>
```
