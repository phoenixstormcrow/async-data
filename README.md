# async-data
Declarative ajax.

## install

`npm install async-data`

## usage

First, load the polyfill:
`<script src='node_modules/webcomponents.js/webcomponents.js`

Import the element:
`<link rel="import" href="component/async-data.html">`

Instantiate it:
`<async-data src='https://someapi.com'></async-data>`

Data is fetched from the resource indicated by the `src` attribute.

If the element has an `auto` attribute, the request is made as soon as `document.readyState === 'complete'` is `true`, and whenever the `src` attribute is changed. Otherwise, the request can be triggered by calling the element's `.get` method, which takes no arguments.

The element uses the browser-request package to fetch the data. When done, it emits a 'data' event. An 'error' event is emitted if there is an error,
be it a network error, or a 404. Both events are instances of `CustomEvent`.
The `.detail` property is set to the value of the data, on success, or the error object, in case of error.

The element's `.value` property holds the requested data, if the call succeeds, and it's `.error` property holds an error object if there was an error making the request.

See [index.html](https://github.com/phoenixstormcrow/async-data/blob/master/index.html) for an example.

**Feedback is welcome.** For instance, is it efficient to pass the retrieved data as the `.detail` property of the data event? Listeners can of course query `event.target.detail` to get the same data. I'm not familiar with the way memory is handled in this case, and so would welcome any input.
