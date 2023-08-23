export async function get() {
  return {
    json: {
      page: {
        title: 'Themes',
        description: 'Custom properties and calc'
      },
      links: [
        {
          text: 'Custom properties',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/--*'
        },

        {
          text: 'Calc',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/calc'
        },

        {
          text: 'Creating color themes with custom properties',
          url: 'https://css-tricks.com/creating-color-themes-with-custom-properties-hsl-and-a-little-calc/'
        },

        {
          text: 'Theming with CSS Custom Properties (variables) and calc()',
          url: 'https://itnext.io/theming-with-css-custom-properties-variables-and-calc-a89b37ad0013'
        },

        {
          text: 'Calculating Color: Dynamic Color Theming with Pure CSS',
          url: 'https://una.im/css-color-theming/'
        }
      ]
    }
  }
}
