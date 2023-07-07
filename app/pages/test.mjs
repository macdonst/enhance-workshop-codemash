// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state

  return html`<enhance-page-container>
  <main>
<form action="/test" method="post">
        <input name=thing.foo type=number step=any value=2.1 />
        <input name=thing.bar type=number value=2 />
          <input name=bar value="one"/>
          <input name=bar value="two"/>
          <input name=bar value="three"/>
          <input name=foo[0] value="one"/>
          <input name=foo[1] value="two"/>
          <input name=foo[2] value="three"/>
          <input name=addr.foo[0].fname value="firstname"/>
          <input name=addr.foo[1].fname value="firstname"/>
          <input name=addr.foo[2].fname value="firstname"/>
          <input name=addr.foo[0].last value="lastname"/>
          <input name=addr.foo[1].last value="lastname"/>
          <input name=addr.foo[2].last value="lastname"/>
          <input name=on-radio type="radio" checked />
          <input name=off-radio type="radio" />
        <button type=submit>Submit</button>
        </form>
  </main>
</enhance-page-container>
    <script>
// wait 1 second to make sure the DOM is ready
// setTimeout(()=>{
  const form = document.querySelector('form')
  const formData = new FormData(form)
  const obj = Object.fromEntries(formData)
  console.log(formData.getAll('bar'))
  console.log(formData.getAll('foo[0]'))
  console.log(obj)
// for (const key of formData.keys()) {
//     console.log("key ",key);
//     console.log("value ",formData.get(key));
//   }
// }, 1000)
  </script>
  `
}
