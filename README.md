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

Data is fetched from the resource indicated by the `src` attribute. This is triggered by the element's `.attachedCallback`, when the `src` attribute is changed, and can be triggered by calling the element's `.get()` method.

The element uses XMLHttpRequest to fetch the data. When done, it emits a 'data' event. An 'error' event, which is an instance of ErrorEvent, is emitted if there is an error, such as a 404.

The element's `.value` property holds the requested data, if the call succeeds.

See [index.html](https://github.com/phoenixstormcrow/async-data/blob/master/index.html) for an example.

Feedback is welcome.
