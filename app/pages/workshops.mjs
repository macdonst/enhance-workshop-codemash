// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  let workshops = store.workshops || []

  return html`
<style>
</style>
<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Enhance Web Development Workshops</h1>
    ${workshops.map(item => `
      <article class="mb2 p-1 border1 border-current radius2 grid col-2">
        <div class="col-span-2">
          <h2 class="pb-2 text2"><strong>${item?.title || ''}</strong></h2>
          <p class="pb-2">${item?.description || ''}</p>
        </div>
        <div>
          <p class="pb-2"><strong class="capitalize">location: </strong>${item?.location || ''}</p>
          <p class="pb-2"><strong class="capitalize">start date: </strong>${item?.start_date || ''}</p>
          <p class="pb-2"><strong class="capitalize">end date: </strong>${item?.end_date || ''}</p>
          <p class="pb-2"><strong class="capitalize">capacity: </strong>${item?.capacity || ''}</p>
          <p class="pb1"><strong class="capitalize">enrolled: </strong>${item?.number_enrolled || ''}</p>
        <form action="/workshops/${item.key}" method="POST">
        <div class=" grid gap2  col-2 ">
          <label>Seats
            <input class="border1 border-solid border-current p-3" name=seats type=number value=1 />
          </label>
          <button type=submit class="border-solid border1 border-current pr-1 pl-1 pt-4 pb-4">Add to Cart</button>
            </div>
        </form>
          <a href="/workshops/${item.key}" class="border-solid border1 border-current pr-1 pl-1 pt-4 pb-4">More Details</a>
        </div>
        <div>
          <img src="${item?.image_url || ''}" alt="${item?.title || ''}" class="radius2" />
        </div>
      </article>
    `).join('\n')}
  </main>
</enhance-page-container>
  `
}
