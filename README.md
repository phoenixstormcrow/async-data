# async-data
A web component for async data retrieval.

## usage
`<async-data src='https://someapi.com'></async-data>`

Data is fetched from the resource indicated by the "src" attribute. This is triggered by the elements createdCallback, when the src attribute is changed, and can be triggered by calling the element's `.get()` method.

The element uses XMLHttpRequest to fetch the data. When done, it emits a 'data' event, which bubbles. The element's `.value` property holds the requested data.

See index.html for an example.

Feedback is welcome.
