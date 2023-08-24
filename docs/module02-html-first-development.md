---
title: "Module 2: HTML-First Development"
layout: default
---

[Module Index](/)


# Module 2: HTML-First Development


## The Enhance Way

### The problem with frameworks

- Most modern frameworks are JavaScript first.
  - They send an empty `<div id=root>` and a `<script>` that then takes over.
- HTML is backward and forward compatible and very stable
  - This means that new browsers can read old websites and that old browsers should be able to read newer websites.
  - This is possible because HTML is resiliant to parsing things it doesn't understand.
- JavaScript, by comparison, moves fast to include new capabilities
  - It is only backward compatible, which is better than most other modern languages, but less resiliant than HTML.
- JavaScript first development most modern frameworks is unconstrained at the cost of stability and reliability
  - Most of these frameworks are not backward or forward compatible


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
    - Make it work (reliably with HTML & CSS) - then make it better (incrementally with a little JS)
  - You can get further with HTML and CSS than you probably think you can
  - Since these frameworks often reimplement what the web already does, people come to expect that HTML is mostly limited to displaying text.

### Javascript Too, But just a little
- Progressive Enhancement - Make it work with only HTML and CSS, then improve it with a little JavaScript
  - not Graceful Degradation - Build it with JavaScript, then just make it do something when JavaScript fails
- Some people have the mistaken belief that PE means building the app twice, once with JS and again without JS. This is
- People are regularly shocked to learn that most modern applications can be built with little to no JS.
- The JavaScript that is added is usually just to make slight improvements.


## Build HTML pages
Now lets build a developer protfolio.


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
Enhance has a CSS Reset as part of our base styling.
This helps with design consistencey across browsers, but it means we will need to add some styles before it is usable.
Let's add some very basic CSS.


## Styling
Enhance is standards based and the styling approach is in line with that.
You can do almost anything you want for styles.
We have some recommended best practice but ultimatly you can do whatever you want.

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
In reality this will put a style tag in the body with the other markup.
This should be avoided because the styles can potentially change as the page is being rendered.

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
That looks better.
But how do we know what classes to add to get the CSS we need?

- Cheatsheet: [http://localhost:3333/_styleguide/cribsheet](http://localhost:3333/_styleguide/cribsheet)
- The search feature will filter the utility classes down to just the related rules.

### Component Scoped Styles
The second part of Enhance Styles is the component scoped styles.
Some CSS can not be easily applied directly with class names on an element.
In this case regular CSS can be written in a style tag that will be lifted to the document head.
We will cover this more in the next module.


### Add a Resume page
Since this is a developer portfolio lets add a page for a resume.

- Make another page called `app/pages/resume.html`

```html
<!-- /app/pages/resume.html--->
<main>
  <h1>Resume</h1>
  <p>Hello World</p>
</main>

```

Now that we have two pages we will need to navigate between them.

### Navigation
Lets add a navigation bar at the top of the page.

- Add the following `<nav>` at the top of our new resume page.

```html
<!-- /app/pages/resume.html--->
<nav class='flex gap0'>
  <h1 class='font-semibold tracking-1'>
    <a href='/' class='no-underline'>My Site</a>
  </h1>
  <ul class='mis-auto flex gap0 list-none'>
    <li><a href='/'>Home</a></li>
    <li><a href='/resume'>Resume</a></li>
  </ul>
</nav>

<main>
  <h1>Resume</h1>
  <p>Hello World</p>
</main>
```

Now we need to add the same navigation to the top of the home page.
We now have some duplication across these pages.
- Duplicated markup
- This duplication feels wrong.
- We immediately want to DRY it up.

We need some templating or better yet a way to build components.
HTML does not have a built in way to handle this.
**Many JavaScript framework had their inception at this very moment.**


## **The Web Platform needs its own component model**.

Thankfully, now it has one.
