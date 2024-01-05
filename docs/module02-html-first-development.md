---
title: "Module 2: HTML-First Development"
layout: default
---

[Module Index](/enhance-workshop-codemash)


# Module 2: HTML-First Development


## The Enhance Way

### The problem with frameworks

- Most modern frameworks are JavaScript first.
  - They send an empty `<div id=root>` and a `<script>` that then takes over. For example:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>My App</title>
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="/src/main.js"></script>
      <noscript>Sucks to be you</noscript>
    </body>
  </html>
  ```

- HTML is backward and forward compatible and very stable.
  - This means that new browsers can read old websites and that old browsers should be able to read newer websites.
  - This is possible because HTML is resilient to parsing things it doesn't understand.
  - Don't believe me, well let me introduce you to the website for the 1996 smash hit movie, [Space Jam](https://www.spacejam.com/1996/).
- JavaScript, by comparison, moves fast to include new capabilities
  - It is only backward compatible, which is better than most other modern languages, but less resilient than HTML.
- JavaScript first development most modern frameworks is unconstrained at the cost of stability and reliability
  - Most of these frameworks are not backward or forward compatible.


### The New Old Way

- HTML, and CSS have quietly caught up with most features needed to build modern web applications
  - JavaScript first frameworks are now behind
  - HTML-First leverages built-in features rather reinventing the platform
  - i.e. HTML forms
    - HTML Forms are dependable and simple to build.
    - They have built-in validation, submission mechanisms, as well as many other useful features.
    - But many modern frameworks don’t even use a `<form>` tag, instead opting to rebuild everything with JavaScript.

### HTML-First

  - Start simple - improve incrementally
    - Make it work (reliably with HTML & CSS) - then make it better, with a little JavaScript
  - You can get further with HTML and CSS than you probably think you can
  - Since these frameworks often reimplement what the web already does, people come to expect that HTML is mostly limited to displaying text.

### JavaScript Too, But just a little

- Progressive Enhancement vs Graceful Degradation
  - With Progressive Enhancement you make your app work with only HTML and CSS, then improve it with a little JavaScript
  - Conversely, with Graceful Degradation you build your with JavaScript, then attempt to make a do something when, not if, JavaScript fails.
  - For example [GMail](https://mail.google.com/mail/u/0/#inbox)
- Some people have the mistaken belief that PE means building the app twice, once with JavaScript and again without JavaScript. This is just not true.
- People are regularly shocked to learn that most modern applications can be built with little to no JavaScript.
- When JavaScript is added it is to make user experience improvements.


## Build HTML pages
Now lets start building a developer portfolio.

### Get the code for this module:

```bash
cd enhance-workshop
git checkout module02-start
```

### Start the local development server

```bash
npm start
```

- Open a browser tab to [http://localhost:3333](http://localhost:3333)

### Add a home page

We are going to add some basic HTML content to start our site.
Enhance lets us add HTML with zero friction

- Create an `index.html` file in the `/app/pages/` directory and add the following:

```html
<!-- /app/pages/index.html--->
<main>
  <h1>Home</h1>
  <p>Hello World</p>
</main>
```

Wow, that looks terrible.

I've said it before and I'll say it again. Work with great designers. They'll make your life easier. Luckily we work with some great ones at Begins so this will get better.

Enhance has a [CSS Reset](https://meyerweb.com/eric/tools/css/reset/) as part of our base styling.
This helps with design consistency across browsers, but it also means we will need to add some styles before it is usable.
Let's add some very basic CSS.


## Styling

Enhance is standards based and the styling approach is in line with that. You can use anything you want for styles and we have documentation on how to use [plain ole css](https://enhance.dev/docs/learn/concepts/styling/css), [Tailwind](https://enhance.dev/docs/learn/concepts/styling/using-tailwind) or [Sass](https://enhance.dev/docs/learn/concepts/styling/using-sass).

We have a recommended best practice but ultimately you can do whatever you want.

### Plain CSS
Lets start with a plain old `<style>` tag.

- Add the following to the page we just created.

```html
<!-- /app/pages/index.html--->
<style>
  body {
    color: blue;
  }
</style>
<main>
  <h1>Home</h1>
  <p>Hello World</p>
</main>
```
In reality this will put a style tag in the body with the other markup. This should be avoided because the styles can potentially change as the page is being rendered.

- Best practice: Styles should go in the head so they are parsed before the body is parsed.
  - Add `<style>` tag to the document `<head>` in `/app/head.mjs`
  - Or add a CSS file in the `/public` folder with a `<link href="/_public/styles.css">` in the head.


### Enhance Styles

Enhance comes with a built in styling system that includes:
- Utility styling system
- Component/element scoped styles (covered in later modules)

### Utility Styles
The utility styles are applied as classes in the markup. This allows for scoping to any element directly.

Instead of the style tag above add these classes to the h1 tag and refresh the page.

```html
<!-- /app/pages/index.html--->
<main>
  <h1 class='mb6 text5 font-light text-center tracking-2'>Home</h1>
  <p>Hello World</p>
</main>
```
That looks much better, but how do we know what classes to add to apply the styling we need?

- Cheatsheet: [http://localhost:3333/_styleguide/cribsheet](http://localhost:3333/_styleguide/cribsheet)
- The search feature will filter the utility classes down to just the related rules.

### Component Scoped Styles

The second part of Enhance Styles is the component scoped styles. Some CSS can not be easily applied directly with class names on an element. In this case regular CSS can be written in a style tag that will be hoisted to the document head.

More details on this in upcomming modules.

### Exercise 1: Add a Résumé page

Since this is a developer portfolio lets add a page for a résumé.

- Make another page called `app/pages/resume.html`
- Copy the code from `app/pages/index.html` but change the header text to be "Résumé"
- Navigate to `http://localhost:3333/resume.html`

Now that we have two pages, we will need to navigate between them.

### Navigation
Lets add a navigation bar at the top of the page.

- Add the following `<nav>` at the top of our new résumé page.

```html
<!-- /app/pages/resume.html--->
<nav class='flex gap0'>
  <h1 class='font-semibold tracking-1'>
    <a href='/' class='no-underline'>My Site</a>
  </h1>
  <ul class='mis-auto flex gap0 list-none'>
    <li><a href='/'>Home</a></li>
    <li><a href='/resume'>Résumé</a></li>
  </ul>
</nav>

<main>
  <h1 class='mb6 text5 font-light text-center tracking-2'>Résumé</h1>
  <p>Hello World</p>
</main>
```

### Exercise 2: Add nav header to our Home page.

- Now we need to add the same navigation to the top of the home page.
- Use the navigation header to switch between pages.

## Wrap-Up

We now have some duplicated markup across these two pages. This duplication feels wrong. As our site continues to grow by adding new pages, we will need to update our navigation section in each one of them. This will get unwieldy very quickly so we immediately want to DRY it up.

We need templating or better yet a way to build components. HTML does not have a built in way to handle this.

**Many JavaScript framework had their inception at this very moment.**

The Web Platform needs its own component model.

Thankfully, now it has one.
