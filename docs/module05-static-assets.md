---
title: "Module 5: Static assets"
layout: default
---

[Module Index](/enhance-workshop-codemash)

# Module 5: Static assets

## Stylesheet for Printing

Our developer portfolio site is shaping up now.
We have a résumé page that looks pretty clean.
But if you are trying to get a job you want to lower the friction for anyone who wants to look at the résumé.
Lets add some styles so that if you print the résumé page it removes the header and footer and looks a little bit better.

Lets add that css as a stylesheet on its own.

To do that we need to know how Enhance handles static assets.

## Public Folder

The `/public` folder is for static assets.
This includes images, stylesheets, JavaScript files, etc. that are referenced by HTML pages.
These static assets do not change frequently and may be large (i.e. images).
They may be used on only one page or shared on all pages.
These files should be cached so that they only have to be downloaded by the browser if the file changes.

If the asset meets these requirements it can be put in the public folder.

## Exercise 1: Create a print only stylesheet

Our print only stylesheet does so lets put it there.
Copy and past the file below to `/public/print-resume.css`.

```css
/* /public/print-resume.css */
/* Print-only resume styles */
@media print {
    nav-bar {
      padding-block-end: 0 !important;
    }

    nav-bar a[href]:after {
      content: none;
    }

    nav-bar img, nav-bar ul, site-footer, .pdf-link {
        display: none !important;
    }

    body {
        background-color: #fff !important;
        color: #000 !important;
    }

    site-container {
        background-color: transparent !important;
    }

    h1, h2, h3 {
        font-size: 1.5em !important;
        line-height: 1.4 !important;
        page-break-after: avoid !important;
        text-align: start !important;
    }

    p, li, td {
        font-size: 1em !important;
        line-height: 1.3 !important;
        page-break-inside: avoid !important;
    }

    a:after {
      content: "("attr(href)")" ;
    }

    resume-experience > section > article {
    page-break-inside: avoid !important;
  }
}
```

When applied this will:
- Hide the nav-bar and site-footer.
- Avoid page breaks inside the job sections.
- Links in the text will display the link in text.


## Referencing Assets with `_public`

Now that we have a css file we need to add a link to that file.

When your site is deployed Enhance puts them in a public facing bucket so that they can be accessed by anyone. The public folder makes these files available at a special route in the app behind `/_public/`.

Add the last link in the head.mjs shown below.


```javascript
// /app/head.mjs
export default function Head(state) {
  const { req, store } = state
  const { path, session } = req

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>

      ${(req.path === '/resume') ? '<link rel="stylesheet" href="/_public/print-resume.css">' : ''}
```

>Note some of the code has been removed to just leave the relevant context.

## Fingerprinting and Caching

For performance reasons static assets can and should be cached as much as possible to avoid downloading the same file again if nothing has changed.
One of the best ways to do this is by fingerprinting them.

Cache invalidation is said to be one of the hardest problems in computer science.
One reliable way to bust the cache for a file is to change the file name.
If you do that the browser can only assume it is an entirely different thing.

If we make the name of the file somehow dependent on the contents so that if the content changes the name will automatically change that solves the cache invalidation. We can do that by adding a short content hash to the end of the filename when deployed. For our purpose the hash is a short string that is calculated based on the actual bits in the file.

This looks something like:

`/public/print-resume.css` -> turns into `/public/print-resume-xyz123.css`

Now that we have a way to guarantee that the filename will change if we make any change to the file contents we can set the cache headers for those assets very aggressively. Fingerprinting is on by default and static asset headers are set to cache files essentially forever (i.e. Cache-Control: max-age=31536000, etc.).

For more info see [MDN: Cache Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

The last step is to manage the references to those static assets in your HTML.
It would be unmanageable if you had to manually update the `<link>` `href` in `head.mjs` (and all the many other static assets) every time any of them changed.
Enhance keeps a manifest of the static assets (called `static.json`).
When a response is sent from enhance it does a search and replace for any `/_public/<anything>` to see if it has a match in the `static.json`.
If it matches it will update that reference in the outgoing response to match the fingerprinted name.

All of this is automatic and seamless.

The only caveat is if you dynamically generate a reference to `/_public` route on the client this search and replace will not be done.
You can do it yourself by using `/_public/static.json` to find the correct fingerprint reference to use.
Enhance does redirect if you use the un-fingerprinted name so the asset will load without caching.

## Exercise 2: Extra Credit PDF Download for Résumé

Another way to make the résumé more accessible it to add a link to download a PDF.

You can use the printing css to print to a pdf and add that pdf to the public folder.
Then you can add a link to the resume.html page.
You can even edit the print-resume.css so that that download link is hidden when you print.

Nicely Done! We have a complete developer portfolio with some nice bells and whistles.

And we have the tools to add pages to it.





