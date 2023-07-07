// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  const workshop = store.workshop || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">${workshop.title || ''}</h1>
      <article class="mb2 p-1 border1 border-current radius2 grid col-2">
        <div class="col-span-2">
          <p class="pb-2">${workshop?.description || ''}</p>
        </div>
        <div>
          <p class="pb-2"><strong class="capitalize">location: </strong>${workshop?.location || ''}</p>
          <p class="pb-2"><strong class="capitalize">start date: </strong>${workshop?.start_date || ''}</p>
          <p class="pb-2"><strong class="capitalize">end date: </strong>${workshop?.end_date || ''}</p>
          <p class="pb-2"><strong class="capitalize">capacity: </strong>${workshop?.capacity || ''}</p>
          <p class="pb1"><strong class="capitalize">enrolled: </strong>${workshop?.number_enrolled || ''}</p>
          <form action="/workshops/${workshop.key}" method="POST">
            <div class=" grid gap2  col-2 ">
              <label>Seats
                <input class="border1 border-solid border-current p-3" name=seats type=number value=1 />
              </label>
              <button type=submit class="border-solid border1 border-current pr-1 pl-1 pt-4 pb-4">Add to Cart</button>
            </div>
          </form>
        </div>
        <div>
          <img src="${workshop?.image_url || ''}" alt="${workshop?.title || ''}" class="radius2" />
        </div>
      </article>
  </main>
</enhance-page-container>`
}
