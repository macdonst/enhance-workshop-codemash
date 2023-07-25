export default function slides({html,state}) {
  return html`

    <style>
      :host { font-family: serif; }
      h1, h2, h3 {
        font-family: sans-serif;
        font-weight: normal;
      }
      .remark-code, .remark-inline-code { font-family: mono; }
    </style>

    <textarea id="source">

class: center, middle

# Your Workflow & the GitHub Platform

???

Notes for the _first_ slide!

---

# Agenda

1. Introduction
2. Survey of tools and needs
3. Looking for automation
4. Creating an accessible and secure workflow

---

# Introduction

      It's possible to embed images.
![](https://cdn.shopify.com/s/files/1/0051/4802/products/mona-1_large.jpg?v=1511308586)

---

# Survey of tools and needs

---

# Looking for automation

---

# Creating an accessible and secure workflow

    </textarea>

    <script src="https://remarkjs.com/downloads/remark-latest.min.js" type="text/javascript">
    </script>
    <script type="text/javascript">
      var slideshow = remark.create();
    </script>
`
}
