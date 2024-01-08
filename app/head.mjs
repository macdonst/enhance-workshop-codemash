// /app/head.mjs
import { getStyles }  from '@enhance/arc-plugin-styles'

const { linkTag } = getStyles

export default function Head(state) {
  const { store = {} } = state
  const { pageTitle = 'Enhance Starter Project' } = store
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="og:type" content="website" />
      <link rel="icon" href="/_public/favicon.svg">
      <title>Axol Lotl: ${pageTitle}</title>
      <meta name="description" content="Portfolio for Axol Lotl, Senior Developer" />
      ${linkTag()}

      <style>
        @font-face {
          font-family: "HK Grotesk";
          font-weight: 300;
          src: url("/_public/fonts/HKGrotesk-Light.woff2") format("woff2")
        }

        @font-face {
          font-family: "HK Grotesk";
          font-weight: 400;
          src: url("/_public/fonts/HKGrotesk-Regular.woff2") format("woff2")
        }

        @font-face {
          font-family: "HK Grotesk";
          font-weight: 600;
          src: url("/_public/fonts/HKGrotesk-SemiBold.woff2") format("woff2")
        }

        body {
          color: black;
          background-color: white;
          text-rendering: optimizeLegibility;
        }

        a {
          text-decoration: underline;
          text-decoration-thickness: 0.0625em;
          text-underline-offset: 0.0625em;
        }
      </style>
    </head>
    <body class='font-sans'>
`
}
