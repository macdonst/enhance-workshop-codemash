// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html({ html, state }) {
  const { store } = state
  const workshop = store.workshop || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
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
</enhance-page-container>`
}
