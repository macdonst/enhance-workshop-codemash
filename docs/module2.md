---
title: Module 2: HTML-First Development
---

# Module 2: HTML-First Development

---

## The Enhance Way

---

* JavaScript first?
  * Most modern frameworks are JavaScript first
  * HTML is backward and forward compatible and stable
  * JavaScript, by comparison, moves fast to include new capabilities
  * JavaScript first is unconstrained at the cost of stability and reliability


---
* HTML, CSS, and JavaScript have quietly caught up with features needed to build modern web applications
  * JavaScript first frameworks are now behind
  * HTML-First leverages built-in features rather reinventing the platform
      * i.e. HTML forms

---

* Forms are dependable and simple to build.
* They have built-in validation as well as many other useful features.
* But many modern frameworks don’t even use `<form>`, instead opting to rebuild everything with JavaScript.

---
* HTML-First
  * Start simple - improve incrementally

---
* Make it work (reliably with HTML & CSS) - then make it better (incrementally with a little JS)
* You can get further with HTML and CSS than you probably think you can
* Since these frameworks often reimplement what the web already does, people come to expect that HTML is mostly limited to displaying text.

---

* Progressive Enhancement
  * not Graceful Degradation
* People are regularly shocked to learn that most modern applications can be built with little to no JS.
* The JavaScript that is added is usually just to make slight improvements.

---

## Build: HTML pages

---

### Get the code for this module:

```bash
cd enhance-workshop
git checkout module2-start
```

* We are going to add some basic HTML content to start our site.
* Enhance lets the platform do what it does best wherever possible.
* Writing plain HTML is one place where Enhance will just get out of the way.


---
### Add a home page

* Create an `index.html` file in the `/app/pages/` directory and add the following:

```html
<!-- /app/pages/index.html--->
<main>
  <h1>Home</h1>
  <p>Hello World</p>
</main>
```

---

## Styling

### Plain CSS


```html
<!-- /app/pages/index.html--->
<style>
  body {
    Color: blue;
  }
</style>
<main>
  <h1>Home</h1>
  <p>Hello World</p>
</main>
```

* Best practice: Styles in the head
  * Add `<style>` tag to the document `<head>` in `/app/head.mjs`
  * CSS file in the `/public` folder with a `<link href="/_public/styles.css">` in the head.

---

### Enhance Styles


* Utility styling system

```html
<!-- /app/pages/index.html--->
<main>
  <h1 class='mb6 text5 font-light text-center tracking-2'>Home</h1>
  <p>Hello World</p>
</main>
```

* Cheatsheet: [ http://localhost:3333/_styleguide/cribsheet](http://localhost:3333/_styleguide/cribsheet)


---
### Scoped Styles

* Enhance will scope styles to components
* We will see this in the next module


---

### Navigation

* Make another page called `app/pages/about.html`

```html
<!-- /app/pages/about.html--->
<main>
  <h1>About</h1>
  <p>Hello World</p>
</main>

```

---

* Now we need to navigate between pages
* Add a simple navigation:

```html
<!-- /app/pages/about.html--->

<nav class='flex gap0'>
  <h1 class='font-semibold tracking-1'>
    <a href='/' class='no-underline'>My Site</a>
  </h1>
  <ul class='mis-auto flex gap0 list-none'>
    <li><a href='/'>Home</a></li>
    <li><a href='/about'>About</a></li>
  </ul>
</nav>

<main>
  <h1>About</h1>
  <p>Hello World</p>
</main>
```


---

* Add the navigation to the home page
  * Duplicated markup
* This duplication feels wrong.
* We immediately want to DRY it up.
.center[**Many JavaScript framework had their inception at this very moment.**]

---

## **The Web Platform needs its own component model**.

Thankfully, now it has one.
