// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  let workshops = store.workshops || []
  const workshop = store.workshop || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Workshops page</h1>
    ${workshops.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">title: </strong>${item?.title || ''}</p>
  <p class="pb-2"><strong class="capitalize">description: </strong>${item?.description || ''}</p>
  <p class="pb-2"><strong class="capitalize">image_url: </strong>${item?.image_url || ''}</p>
  <p class="pb-2"><strong class="capitalize">location: </strong>${item?.location || ''}</p>
  <p class="pb-2"><strong class="capitalize">start_date: </strong>${item?.start_date || ''}</p>
  <p class="pb-2"><strong class="capitalize">end_date: </strong>${item?.end_date || ''}</p>
  <p class="pb-2"><strong class="capitalize">capacity: </strong>${item?.capacity || ''}</p>
  <p class="pb-2"><strong class="capitalize">number_enrolled: </strong>${item?.number_enrolled || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/admin/workshops/${item.key}">Edit this workshop</enhance-link>
</p>
<form action="/admin/workshops/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this workshop</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New workshop</summary>
    <enhance-form
  action="/admin/workshops/${workshop.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Workshop">
  <enhance-text-input label="Title" type="text" id="title" name="title" value="${workshop?.title}" errors="${problems?.title?.errors}"></enhance-text-input>
  <enhance-text-input label="Description" type="text" id="description" name="description" value="${workshop?.description}" errors="${problems?.description?.errors}"></enhance-text-input>
  <enhance-text-input label="Image_url" type="text" id="image_url" name="image_url" value="${workshop?.image_url}" errors="${problems?.image_url?.errors}"></enhance-text-input>
  <enhance-text-input label="Location" type="text" id="location" name="location" value="${workshop?.location}" errors="${problems?.location?.errors}"></enhance-text-input>
  <enhance-text-input label="Start_date" type="text" id="start_date" name="start_date" value="${workshop?.start_date}" errors="${problems?.start_date?.errors}"></enhance-text-input>
  <enhance-text-input label="End_date" type="text" id="end_date" name="end_date" value="${workshop?.end_date}" errors="${problems?.end_date?.errors}"></enhance-text-input>
  <enhance-text-input label="Capacity" type="number" id="capacity" name="capacity" value="${workshop?.capacity}" errors="${problems?.capacity?.errors}"></enhance-text-input>
  <enhance-text-input label="Number_enrolled" type="number" id="number_enrolled" name="number_enrolled" value="${workshop?.number_enrolled}" errors="${problems?.number_enrolled?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${workshop?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
  `
}
