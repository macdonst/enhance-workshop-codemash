---
title: "Module 6: HTML Forms"
layout: default
---

[Module Index](/enhance-workshop)


# Module 6: HTML Forms (~30min)



* Forms are a basic building block of the web.
    * They have been present from the early days of HTML.
    * They are a reliable way to collect data from users
    * But many modern JavaScript frameworks throw out the built-in form handling and rebuild it from scratch.
    * We will spend some time going through the fundamentals of HTML forms so that we can fully use what the platform already provides.
* The `<form>` tag:
    * A container for form elements
    * All form inputs in the container will be sent by default with a form submission
*  `<form>` attributes:
    * `action` : the path to send the form data (i.e. `action="/data"`)
    * `method`: the HTTP method to use. Browsers only understand `get` and `post`.
        * Get: Adds the form data to the URL
        * Post: Adds the data to the request body
* `<input>` types:
    * `text` (`<input type="text"/>`):
    * `password`: obscured on input, and back/forward cache does not restore
    * `checkbox`
    * `radio`
    * `submit`: button to submit form
    * and many more types of inputs added to the platform in the past few years.
    * Have you agonized about implementing a range slider recently?
      <div>
        <input type="range" id="volume" name="volume" min="0" max="11" />
        <label for="volume">Volume</label>
      </div>

* `name` attribute:
    * String that is the property name for the data sent.
    * i.e. `<input type="text" name="first-name">`
* Submit Button:
    * Signal form submission
    * `<button>Submit</button>` inside the form
    * Or `<button type="submit">Submit</button>`
    * `<input type="submit" value="Submit">`
* Organization (fieldset, legend, label)
    * `<fieldset>`: Groups inputs together
    * `<legend>`: Labels a fieldset
    * Fieldset and legend give useful context information for the form.
    * `<label>`: Labels an input
    * Inputs should have a label associated with them for accessibility.
    * The label is associated by wrapping the input:
        * `<label>First Name: <input type="text" name="first"></label>`
    * Or with a `for` attribute on the label that matches the `id` of the input:
        * `<label for="first">First:</label><input id="first" name="first-name">`
* Now lets make a basic form for a user profile.
* Modify the page at `/app/pages/data.html` with the following:




```html
<!-- /app/pages/data.html-->
<nav-bar></nav-bar>

<h1>Data</h1>
<h2> Previous Data </h2>
<show-data></show-data>

<h2> Send New Data </h2>
<form action="/data" method="post">

  <fieldset>
    <legend>Personal Information:</legend>

    <label for="fname">First Name:</label><br>
    <input type="text" id="fname" name="fname"><br>

    <label for="lname">Last Name:</label><br>
    <input type="text" id="lname" name="lname"><br>

    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email"><br>

    <label for="dob">Date of Birth:</label><br>
    <input type="date" id="dob" name="dob"><br>
  </fieldset>

  <button type="submit">Register</button>
</form>
```



## Validation:



* Validating form data is critical.
* Some forms are used for very trivial interactions with the server with a low consequence for incorrect data.
* One example of this might be a toggle for light/dark mode.


### Client-side vs server-side validation



* Client-side validation is immediate, saving round trips to the server.
* Some things can only be checked on the server like the uniqueness of a username.
* Client-side validation can be bypassed so validating on the server is essential.


### Built-in vs custom client-side validation



* Many validations are built into HTML so they are very easy to perform.
* Using JavaScript it is possible to customize when validation is checked, and how the warnings display.
* It is also possible to check more complicated logic across multiple fields like either a phone number or email is required, but not both.


### HTML built-in validation



* The HTML-first approach is to build a form using as much of the built-in validation features as possible. Then we can add additional features later if needed.
* Here are some of the most important built-in validation features:
  * `required` Attribute: Marks an input as required.
  * Input types: The type attribute also signals how to validate certain inputs:
    * email
    * url: Full URL (i.e. https://google.com)
    * number
  *  `min`, `max`, and `maxlength` Attributes
  * `pattern` Attribute: Regular expression test


### Skipping validation



* Once validation attributes are set a form cannot be submitted if any inputs are not valid.
* Sometimes it is necessary to submit a partial form with some incomplete or invalid values.
* Luckily HTML has thought about that use case and provides the `formnovalidate` attribute to be able to submit a form without validation.
* Here is an example with a “Submit” button and a “Save” button where save will skip validation:

```html
<form action="/data" method="post">
  <label for="fname">First Name:</label><br>
  <input type="text" id="fname" name="fname"><br>

  <button type="submit">Register</button>
  <button type="submit" formaction="/data?saveonly" formnovalidate >Save</button>
</form>
```

* The save button uses `formaction` to change the submission url and `formnovalidate` to turn off validation for the save.


## Custom Validation (Progressive Enhancement)

The built-in validation will accomplish a lot, but in a complex form, there may be a few rules that need to be customized.

For example what if we want to confirm a password before registering a new user account?

First, lets create a new file `app/elements/registration-form.mjs` with the following contents.

```javascript
// /app/elements/registration-form.mjs
export default function Registration({ html }) {
return html`
<form id="registrationForm">
  <label for="password">Password:</label><br>
  <input type="password" id="password" name="password" required><br>

  <label for="cpassword">Confirm Password:</label><br>
  <input type="password" id="cpassword" name="cpassword" required><br>

  <input type="submit" value="Register">
</form>

<script type=module>
  const password = document.getElementById('password');
  const confirm_password = document.getElementById('cpassword');

  function validatePasswords(){
    if (password.value !== confirm_password.value) {
      confirm_password.setCustomValidity('Passwords do not match!');
    } else {
      confirm_password.setCustomValidity('')
    }
    confirm_password.reportValidity()
  }

  confirm_password.addEventListener('input', validatePasswords);
  password.addEventListener('input', validatePasswords);
</script>
`}
```




* `setCustomValidity` will report a validation message.
* Must be set to an empty string for the input to be valid
* `reportValidity` must be called to set the validity


## Form Data Structure



* Form submission with GET method will put data in the URL as query parameters:
    * i.e. <code>GET /data?email=bob@example.com&password=123</code>
    * Get requests are often cached and the url is less secure than the body
* Form submission with POST method puts data in the body of the request encoded as URL parameters:

```bash
POST / HTTP/2.0
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 34

email=bob@example.com&password=123&item=one&item=two
```


* Names are strings: The parameter names are plain strings that are read into a simple object by most servers.
* For example, the above POST request received by the server for an Enhance app will produce the following object:

```javascript
console.log(req.body)
// {email:"bob@example.com", password:"123", item: ["one", "two"]}
```


* Values are strings: All the values above are read as strings.
* This includes the password “123” above.
* Lists: The multiple values with the same name “item” are read into an array.
* Some servers have special treatment of dots(.) or braces([]) in order to create nested objects and arrays, but this is up to server implementation (i.e. user.firstname, or class[ ], or class[1])
* Booleans(checkboxes): Check box inputs return their value if checked but they are omitted completely from the response if not checked.
    * By default if a checkbox has no value attribute it will return a value of “on” to the server.
    * If you expect a boolean value the server needs to check for the name in the body returned and s
* Radio buttons: Radio buttons will return the value of the selected input as the value for the radio group.
* Default selected for checkboxes and radio buttons are set with a <code>checked</code> attribute

```html
<form method="POST" action="/submit-form">
  <input type="checkbox" name="agree" checked value="yes">
  <input type="radio" name="gender" value="male">
  <input type="radio" name="gender" checked value="female">
  <input type="number" name="age">
  <input type="checkbox" checked name="newsletter">
  <input type="checkbox" name="attending">
  <input type="text" name="name">
  <input type="submit" value="Submit">
</form>
```



```bash
POST /submit-form HTTP/1.1
Host: www.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 55

agree=yes&gender=female&age=25&name=Jane&newsletter=on
```




## Server Normalization and Validation



* Now that we have a baseline understanding of what the raw HTTP response from a form looks like we can decide how best to validate and normalize that data on the server.
* For this we are going to look at the [begin validator](https://github.com/beginner-corp/validator/blob/main/README.md).
* It is a small package specifically built to normalize form data and help with server-side validation. All servers handle this problem differently and you can opt out of using it entirely. But it gives an example of what you can do.
* First install the validator: `npm i @begin/validator`
* Then include it in an API route: `import validator from '@begin/validator'`
* The validator handles three problems for us.
    * Creates nested objects based on naming conventions
    * Changes string values to desired types based on schema
    * Validates data based on schema


### Create a Nested Object



* . (dots) expand into objects (i.e. `'user.addr'` -> `{ user: { addr: 'value' } }` )
* [1] Bracket notation converts to arrays with order. Missing indexes are squashed.
* [ ] Empty brackets convert to arrays, but can only be used at the end of keys. (i.e. 'foo[ ]' , not 'bar[ ].something')


### Expected Data Types from Strings



* Forms return all values as strings. Including boolean and number values. In addition false booleans (i.e. radio button not checked) will not be included in the submitted form data.
* There is no way to know for sure what what type the data was without some kind of schema.
* If a schema is used these types (and missing booleans) can be coerced into the expected types.
* For a schema we will use a simple [JSON schema](https://json-schema.org/).
* The example below shows the type conversion.




```javascript
import formEncodingToSchema from '@begin/validator'

const formValues = {
    'anInteger': '3',
    'aFloat': '3.1',
    'aBooleanTrue': 'on'
    // 'aRadioFalse':'' // false boolean won't show up in form output
  }

  const Schema = {
    'id': 'ComplexSchema',
    'type': 'object',
    'properties': {
      'aFloat': { 'type': 'number' },
      'anInteger': { 'type': 'integer' },
      'aBooleanTrue': { 'type': 'boolean' },
      'aBooleanFalse': { 'type': 'boolean' },
    }
  }

  console.log(formEncodingToSchema(formValues, Schema))
  // { aBooleanTrue: true, aBooleanFalse: false, anInteger: 3, aFloat: 3.1 }
```



### Validation

With a schema in place we can validate the data in addition to setting types on the ambiguous string values.



* The validator function with take the request body and convert it to a nested object, coerce the types according to the schema, and check that the data matches the schema rules (i.e. ID is required).
* If it is not found to be valid the `valid` property is set to false and the `problems` object will contain an object with errors for each part of the schema.

```javascript
import validator from '@begin/validator'

const Book = {
    id: 'Book',
    type: 'object',
    required: ['ID'],
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        publication_date: { type: 'integer' },
        ID: { type: 'string' }
    }
}

export async function post(request) {
    let {valid, problems, data} = validator(request, Book)
    if (!result.valid) {
        return {
            json: { problems, book:data }
        }
    }
    // Data is valid!
}
```




### JavaScript `new FormData()`

HTML forms are often all you need. They should be the baseline starting point for an app. But sometimes as a progressive enhancement it is useful to submit the form with JavaScript.



* The `FormData` object is key to capturing the form state in JavaScript.

```javascript
<form id="myForm">
  <input type="text" name="username" placeholder="Username" required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit">Submit</button>
</form>

<script>
  async function handleSubmit(event) {
    event.preventDefault()
    let formData = new FormData(this);
    try {
      let response = await fetch('https://example.com/api/endpoint', {
        method: 'POST',
        body: formData
      })
      let data = await response.json()
      console.log(data)
    } catch (error) {
      console.log('There was a problem: ' + error.message);
    }
  })
  document.getElementById('myForm').addEventListener('submit', handleSubmit)
</script>
```


*  `FormData` creates an interable object of key value pairs.
* The server puts duplicate key/value pairs into an array.
* In order to get the full array of duplicate key/values with FormData use the `getAll` method (i.e.  `formData.getAll(key)`)

```html
<form>
  <input name=bar value=one/>
  <input name=bar value=two/>
  <input name=bar value=three/>
</form>
<script>
  const form = document.querySelector('form')
  const fromData = new FormData(form)
  console.log(Object.entries(formData))
  // {bar:"three"}
  console.log(formData.getAll('bar'))
  // ['one','two','three']
</script>
```


* The `@begin/validator` will normalize the FormData the same as the request object for consistency.
* To deal with the ambiguity of duplicate keys it is recommended to use the bracket notation (i.e. `name=` `bar[]` or `bar[1]` instead of `bar`)
* Alternatively there is a `{ duplicateKeys: [ 'bar' ] }` configuration option ([https://github.com/beginner-corp/validator/blob/main/README.md](https://github.com/beginner-corp/validator/blob/main/README.md))


## Multi-part Form Data and File Uploads



* Multi-part form data is for uploading files from client or encoding binary.
* The handling of these forms is different
* Here is a blog series on sending multipart forms using Enhance ([https://begin.com/blog/posts/2023-02-08-upload-files-in-forms-part-1)](https://begin.com/blog/posts/2023-02-08-upload-files-in-forms-part-1))
