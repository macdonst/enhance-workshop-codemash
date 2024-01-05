---
title: "Appendix 1: Forms and the Shadow DOM"
layout: default
---

[Module Index](/enhance-workshop-codemash)


# Module B1: HTML Forms (~30min)

We discussed in Module 3 some of the reasons that we recommend avoiding the Shadow DOM.

* HTML forms do a lot for us in the platform as we showed in the previous module.
* They manage a lot of internal state.
* Values are passed from many different form control elements to be sent to the server.
* Validation information is shared between individual input and the whole form.

* The Shadow DOM breaks nearly all of this built in behavior.
* If a simple checkbox is placed in a component with the Shadow DOM it takes a lot of code to restore the needed behavior.
* In Browser land these type of Custom Elements that work as form controls are called "Form Associated Custom Elements" (FACE).
* The `elementInternals` API supplies the low level methods to make this possible.


* **Custom Element as Submit Button**: `requestSubmit()` has shipped for all major browsers making custom element submit button easier. A custom element can call `ElementInternals.form.requestSubmit()`. Proposals for a full solution are discussed in the problems section below.
* **Shared `name` bug:** reported in previous report has been fixed ([https://github.com/whatwg/html/issues/5891](https://github.com/whatwg/html/issues/5891))


## **Form Behaviors**

The following is a partial list of the behaviors to consider when creating a custom element for a form.

* Set form values -> form:  `ElementInternals.setFormValue()`
* Form validation: `ElementInternals.setValidity()` …
* Custom submit button: `eventListener` calls  `myForm.requestSubmit()`
* Implicit Submit: `eventListeners('keypress',...)` ->  `myForm.requestSubmit()`
* Focus management: `attachShadowroot({mode: 'open', delegatesFocus: true})`
* Autocomplete: `formStateRestoreCallback()`
* Reset form: `formResetCallback()`
* Click label to focus input: listen to label events then call focus on CE
* Click label to change state (checkbox): listen to label events then change state
* Label implicit association: ??
* Label explicit association: ??
* Accessibility (aria etc.): `ElementInternals.role`, `.ariaChecked`, …


## **User Recommendations**

Creating Form Associated Custom Elements with the Shadow DOM and ElementInternals requires properly handling dozens of behaviors that application developers normally get for free with HTML. This is often not apparent from simple examples where only `setFormValue()` is shown. This specification is a valuable tool for library authors and people building design systems. But partial implementation leaves inaccessible forms. Below is a minimal example of a checkbox with and without the shadowDOM. It takes roughly 80 lines of code to put back **most**, not all, of the behavior the Shadow DOM breaks. Here is a codepen with this example [https://codepen.io/rbethel/pen/zYMeZEd](https://codepen.io/rbethel/pen/zYMeZEd).


```html
<form>
  <label for="light1">light checkbox </label>
  <light-check name="light" input-id="light1"></light-check>
  <label for="shadow1">shadow checkbox</label>
  <shadow-check  name="shadow" id="shadow1"></shadow-check>
  <button type=submit>Submit</button>
  <button type=reset>Reset</button>
</form>

<script>
class LightCheck extends HTMLElement {
  static get observedAttributes() {
    return ['input-id', 'name'];
  }

  constructor() {
    super();
    this.innerHTML = ' <input type="checkbox" /> '
    this.checkbox = this.querySelector('input');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'input-id') {
      this.checkbox.id = newValue;
    }
    if (name === 'name') {
      this.checkbox.setAttribute('name', newValue)
    }
  }

}

class ShadowCheck extends HTMLElement {
  static formAssociated = true;
  #internals;
  #shadowroot;

  constructor() {
    super();
    this.#shadowroot = this.attachShadow({ mode: 'open' });
    this.#internals = this.attachInternals();
    this.#internals.setFormValue('false');

    this.#internals.role = "checkbox"
    this.#internals.ariaChecked = "false"

    this.#shadowroot.innerHTML = ' <input type="checkbox" /> '
    this.checkbox = this.#shadowroot.querySelector('input');
    this.onChange = this.onChange.bind(this);

    this.handleImplicitSubmit = this.handleImplicitSubmit.bind(this);
    this.checkbox.addEventListener('keypress', this.handleImplicitSubmit)
    this.toggle = this.toggle.bind(this);

    this.checkbox.addEventListener('change', this.onChange);
    document.querySelector('label[for=' + this.id + ']').addEventListener('click', this.toggle)
    this.#internals.setValidity({
      customError: true
      }, 'You must check this box', this.checkbox);

  }

  formResetCallback(){
    this.checkbox.checked = false
    this.#internals.setFormValue('');
    this.#internals.setValidity({
      customError: true
      }, 'You must check this box', this.checkbox);
  }

  onChange() {
    if (this.checkbox.checked) {
      this.#internals.setFormValue(this.checkbox.value || 'on');
    } else {
      this.#internals.setFormValue('');
    }


    if (this.checkbox.checked) {
      this.#internals.ariaChecked = "true"
    } else {
      this.#internals.ariaChecked = "false"
    }

    if (this.checkbox.checked) {
      this.#internals.setValidity({});
    } else {
      this.#internals.setValidity({
        customError: true
        }, 'You must check this box', this.checkbox);
    }
  }

  handleImplicitSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.#internals.form.requestSubmit();
    }
  }

  toggle() {
    this.checkbox.checked = !this.checkbox.checked
    this.onChange()
  }


}

  customElements.define('shadow-check', ShadowCheck);
  customElements.define('light-check', LightCheck);

  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log(Array.from(formData.entries()));
  });
</script>
```


## **Problems/Concerns**



* **Requires a lot of code:** A common use case for FACE is to wrap an existing form control to extend behavior in some way. For instance to package a checkbox or text input and add a label to it requires a lot of boilerplate to add back the existing behavior of a checkbox.
* **Nesting controls in shadow DOM**: A nested form in a custom element can set multiple values by using `FormData` and handle validation. But having any intermediate shadow DOM causes problems. The intermediate custom element would need to have a form element to consolidate the contained forms inputs back into FormData and then that object could be passed on. Otherwise, the inputs would have to be handled and passed with ElementInternals individually. Here is a codepen demonstrating this issue ([https://codepen.io/rbethel/pen/jOQdmxY](https://codepen.io/rbethel/pen/jOQdmxY))
* **Slotting native form controls**: Slotting native form controls into custom elements leaves the light DOM controls active in the form. For example: `<my-input><input required></my-input>`  causes unexpected behavior where the light DOM input and the custom element input are both active. Here is a codepen demonstrating the issue ([https://codepen.io/rbethel/pen/KKrJmRQ](https://codepen.io/rbethel/pen/KKrJmRQ))
* **Label Association:** It is difficult without workarounds to associate a label with an input inside the Shadow DOM. One solution is to leave the leave the input in the Light DOM as discussed above by slotting it in. (i.e. `<label for="firstname">First Name</label><my-input><input id="firstname"></my-input>`). This solves the label association but has other downsides discussed above and it may not be the preferred way to structure the Custom Element. The Element Handles proposal may help solve this problem ([https://github.com/behowell/aom/blob/element-handles-explainer/element-handles-explainer.md](https://github.com/behowell/aom/blob/element-handles-explainer/element-handles-explainer.md)).
* **CE as submit button:** As noted in recent changes the addition of `requestSubmit()` shipping to all browsers makes this much easier. Implicit submit is still not handled well. The proposal ([https://github.com/WICG/webcomponents/issues/814](https://github.com/WICG/webcomponents/issues/814)) to add `this.#internals.submitButton = true` seems to solve most use cases.
* **Firefox properties not implemented yet:** They do not support role, and aria properties.

    ([https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals#browser_compatibility](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals#browser_compatibility))




## **References/Resources**



* [https://web.dev/more-capable-form-controls/](https://web.dev/more-capable-form-controls/)
* [https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/)
* [https://w3c.github.io/webcomponents-cg/2022.html](https://w3c.github.io/webcomponents-cg/2022.html)
* [https://w3c.github.io/webcomponents-cg/2022.html#form-associated-custom-elements](https://w3c.github.io/webcomponents-cg/2022.html#form-associated-custom-elements)
* [https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/)

