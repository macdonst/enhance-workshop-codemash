---
title: "Module 3: Custom Elements and Web Components"
layout: default
---

[Module Index](/enhance-workshop-codemash)


# Module 3: Custom Elements and Web Components

## Objectives

- The built-in component model
- Custom Elements vs Web Components
- Server Side Rendering (SSR) Components with Enhance

## The web needs a component model

- Building with components is nice
- The web platform has lacked a real component model
- If you ask developers to build something complex without components they will usually build their own abstraction to do it
- The explosion of frameworks like Angular, React and Vue is partly to solve this problem

## The platform's native component model

- “Web Components” arrived slowly
- The process was not smooth
- But they are here now and ready for production
- Better than JS Framework of the past because it shares in the stability of the web platform itself
- We are not going to spend time on the history,
but it is important because there is a lot of outdated or incorrect information about why WC'd don’t work and you shouldn’t use them.
- The core features of WC's are supported across all evergreen browsers.

## Web Component Definition

- A set of platform APIs for the creation of custom, reusable HTML tags
- Three primary specifications:
    - Custom Elements: Define custom HTML elements and add behavior defined in JavaScript.
    - HTML Templates: The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page. These can then be reused multiple times as the basis of a custom element's structure.
    - Shadow DOM: A JavaScript API for attaching an encapsulated "shadow" DOM tree to an element in order to keep an element's features private.
      - CSS shadow parts: Related to the shadow DOM there are some new CSS API's like `::slotted()` and `:host` that help with styling

## Web Component Example

Checkout the Module 3 code as follows:

```bash
cd enhance-workshop
git checkout module03-start
```

Now add the following code to `app/pages/wc.html`

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

- This is a simple HTML page with no Enhance magic at all.
- This is a raw Custom Element that creates a new HTML element to use as a component.
- The stuff in the script tag uses WC API's to add DOM and behavior to these new components.
- This is really powerful.
- We define the behavior of `<user-card>` once and then we can then use it anywhere.


## Problems with Web Components

### JavaScript dependent

- The Web Component above is JavaScript dependent.
- Without JavaScript, stuff breaks.
- Let's examine a couple of different ways things break down.

### Exercise 1: FOUCE happens

- Lets add some artificial delay to initializing the javascript
    - Replace the `customElements.define` call at the bottom of the script tag with the following line:
    - `setTimeout(() => customElements.define('user-card', UserCard), 5 * 1000)`
- Reload `app/pages/wc.html`
- You get a momentary [flash of unstyled custom element (FOUCE)](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/).
- This is at minimum ugly.
- If JavaScript fails to load at all the page may be completely broken.
- We can simulate this by disabling JavaScript in your browser by clicking on the `Toggle JavaScript` extension we  installed earlier.
- Once you do this you'll notice our styling is never applied as the web component is never registered.

### Exercise 2: The Shadow DOM

- Most problems with Web Components are downstream of the shadow DOM
- The Shadow DOM encapsulation breaks platform APIs
    - Forms don’t submit
    - Forms don’t validate
    - `querySelector` does not work
- The form below will not submit because the actual `<input>` is trapped inside the shadow DOM.
- Replace the contents of `app/pages/wc.html` with the following HTML.

```html
<form action="/" method="post">
    <fieldset>
        <legend>Shadow DOM</legend>
        <my-input label="Shadow Input"></my-input>
    </fieldset>
    <fieldset>
        <legend>Light DOM</legend>
        <label>Light Input
            <input/>
        </label>
    </fieldset>
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

- Hitting enter in the Shadow DOM input will never submit the form as the input is not part of the same DOM tree as the `form` element. While hitting enter in the light DOM input gives us normal form element behavior.
- It would be nice if we could author the shortened version `<my-input></my-input>` and have it expanded into the following markup, without using the shadow DOM.

```html
<form action="/" method="post">
  <my-input label="thing">
    <label>Thing
       <input/>
    </label>
  </my-input>
</form>
```

- Even without JavaScript this form will work as expected. The `<my-input>` is an undefined tag that the browser will treat as a `<span>`.
- The only problem with this form is that if you have to author all the markup inside the tag you lose much of the convenience of building with components.

**This is where Enhance shines**

### Enhance = Web Components The Good Parts

- The biggest advantage of Enhance is SSR custom elements without requiring the shadow DOM
- There is not much magic in the Enhance framework by design.
    - It does Server Side render/expansion of web components so that they arrive at the client ready to go.

### Enhance Elements

Now we can use Enhance elements to add the navigation bar component from the last module. An Enhance element is a single file custom element with some special handling by Enhance. It does a few things to improve page performance, but there is very little magic here. You could cut and paste this code into your HTML for every instance of the `<nav-bar>` and this would work as expected. This is just standard platform HTML, CSS and JavaScript.

- The performance improvements that Enhance adds are:
    - Hoisting the `<style>` tags to the head of the file and deduplicating them
    - Scoping the style tags to target on the custom element they are written in
    - Moving `<script>` tags to the end of the file and deduplicating them.
    - Server side expansion of content.

### Slotting Children

Attributes and children make up the primary composition API for HTML. Web components and Enhance elements use the same model. This keeps the cognitive load for using them low. Some frameworks do things like change attributes to allow for values other than strings. This seems convenient but can lead to confusion. Enhance sticks to the HTML conventions as much as possible.

Slots (using the `<slot>` tag) are how web components manage children. Unfortunately the `<slot>` behavior only happens in the shadow DOM.

**This is where Enhance server side expansion fills a major hole in the platform API**

Lets build our first Enhance Component to see how it works. We need a container to apply some styles to for the navigation so lets add the following code to `/app/elements/site-container.mjs`.


```javascript
// /app/elements/site-container.mjs
export default function SiteContainer({ html }) {
  return html`
    <slot></slot>
  `
}
```

**The file name `site-container.mjs` is how enhance infers the name of the component `<site-container>`.**

If you have folders nested inside the elements folder they will be concatenated to create the element name. `/app/elements/my/heading.mjs` -> `<my-heading>`

> Note: all custom elements need an `-` as part of the tag name. For example `my-input` is a valid name while `myinput` is invalid.

This component uses the `<slot>` to indicate where children should be put. The slot itself will be replaced by the children. Enhance will run this expansion on the server so that the initial children will already be slotted in without waiting for JavaScript to initialize on the client.

Slots can be named as well.

```javascript
// /app/elements/site-container.mjs

export default function SiteContainer({ html }) {
  return html`
    <slot name="header">Default Heading</slot>
    <slot></slot>
  `
}
```

Children with the `slot=header` will be slotted into the `<slot name=header>`.
They can also have default content inside the `<slot>` tag which will appear only if there is no matching content.

Basic rules for slotting:

1. Text child nodes go in the unnamed slot.
2. Children with no `slot` attribute go in the unnamed slot.
3. Only direct children can use named slots.
4. Multiple children with the same named slot are appended in order.
5. Default content inside the `<slot>` tag is shown if no content is slotted.

To learn more about slotting the [javascript.info](https://javascript.info/slots-composition) site has a good explanation. Just remember that on their own slots only work in the shadow DOM. Enhance SSR is what allows us to use them without it.

### Scoped Styles in Components

Lets go back to our simple `<site-container>` wrapper. We want to apply some styles to the slotted content.

**Custom Elements are treated as inline elements by default (basically a span)**

But we want our wrapped content to be set to `block`. We could use the utility styles to set `class=block` on every usage but we want to wrap it up in the component.

Enhance lets us add style tags inside components.

It does a couple of really helpful things with those styles:

1. It lifts them to the document head for performance.
2. It deduplicates so that only one occurrence of each of the styles is needed.
3. The rules in the tag are scoped to the element by prepending the element name to each rule.
4. Shadow style rules like `:host` and `::slotted()` are changed to equivalent non-shadow CSS.

The CSS shadow rules are a really useful shorthand:
- `:host` applies rules to the outer element.
- `::slotted` allows you to target content that is slotted in.
- `::part()` is a special API used to pierce the shadow DOM in targeted ways.

Part is included but not recommend as it generally causes confusion.

So lets make use of this scoped style block to add a few things that our designer tells us will look nice.
Copy and paste the styles here into our site-container file.

```javascript
// /app/elements/site-container.mjs
export default function SiteContainer({ html }) {
  return html`
    <style>
      :host {
        display: block;
        inline-size: var(--site-width);
        max-inline-size: var(--site-max-width);
        margin-inline: auto;
      }
    </style>
    <slot></slot>
  `
}
```

### Script Tags
- This is an Enhance Single File Component.
- In addition to hoisting and deduplicating the style tags (discussed above) it also has special treatment for script tags.
- This component (and the majority of components using HTML-first) don't need JavaScript.
But some do. In those cases Enhance will pull these script tags out of the components and move them to the bottom of the body of the document.
- This ensures the visible HTML will load and render as fast as possible.


## Exercise 3: `<nav-bar>` Finally

Now we have components to DRY up our nav bar from the last module.
Lets rewrite that the nav bar using these tools.


- We will rewrite our `<nav-bar>` as a custom element using Enhance conventions.
- The result is shown below. Paste this code in the `/app/elements/nav-bar.mjs` file.

```javascript
export default function NavBar({ html }) {
  return html`
    <style>
      :host {
        display: block;
        position: relative;
      }

      .backdrop {
        backdrop-filter: blur(2px);
        background: hsla(0deg 0% 100% / 0.9);
        --mask-image: linear-gradient(to bottom, black 50%, transparent);
        mask-image: var(--mask-image);
        -webkit-mask-image: var(--mask-image);
        inset-block-end: -20%;
      }
    </style>
    <site-container>
      <nav class='flex align-items-center gap0 leading1'>
        <a href='/' class='no-underline flex align-items-center gap0'>
          <h1 class='font-semibold tracking-1'>
            Axol Lotl<br />
            <span class='font-normal'>Web Developer</span>
          </h1>
        </a>
        <ul class='mis-auto flex gap0 list-none text-1 uppercase tracking1 font-semibold'>
          <li><a href='/'>Home</a></li>
          <li><a href='/resume'>Résumé</a></li>
        </ul>
      </nav>
      <div class='backdrop absolute inset-0 z-1'></div>
    </site-container>
  `
}
```

### Authoring with Custom Elements

Now that we have a `<nav-bar>` defined in /app/elements lets simplify our résumé page. We will use that nice `site-container` again to wrap our résumé.

```html
<!-- /app/pages/resume.html--->
<nav-bar class='pb4 sticky inset-bs-0 z1'></nav-bar>
<site-container>
    <h1 class='mb6 text5 font-light text-center tracking-2'>
      Résumé
    </h1>
</site-container>
```

and our home page;

```html
<!-- /app/pages/index.html--->
<nav-bar class='pb4 sticky inset-bs-0 z1'></nav-bar>
<site-container>
    <h1 class='mb6 text5 font-light text-center tracking-2'>
      Home
    </h1>
</site-container>
```

Congratulations! We are not done.

But we are getting closer. Next we need to add some data to our Résumé. And generally smarten up some of these components.

In the next module we will talk about API routes and how we can pass data around in a few different ways.

