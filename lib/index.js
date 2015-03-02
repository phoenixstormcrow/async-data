/* async-data.js */
var request = require('browser-request').defaults({
      method: 'GET'
    }),
    events = require('./event'),
    AsyncDataProto = Object.create(HTMLElement.prototype);

function checkStatus(code) {
  'use strict';
  return ((code >= 200 && code < 300) ||
           code === 304);
}

AsyncDataProto.get = function getData() {
  'use strict';
  var options = {
        url: this.src,
        //json: this.type === 'json' ? true : false
      },
      responseHandler = (function (elem) {
        return function (err, response, body) {
          /* jshint shadow: true */
          let status;
          if (err) {
            elem.error = err;
            elem.dispatchEvent(events.errorEvent(err));
            return;
          }

          status = response.statusCode;
          if (!checkStatus(status)) {
            let err = new Error(status+ ' ' + response.statusText);
            elem.error = err;
            elem.dispatchEvent(events.errorEvent(err));
            return;
          }

          // everything worked, cache the data and emit event
          elem.error = null;
          elem.value = body;
          elem.dispatchEvent(events.dataEvent(body));
        };
      })(this);

  if (!options.url) {
    console.log("Error: invalid src attribute.");
    this.value = null;
    return;
  }

  request(options, responseHandler);

};

AsyncDataProto.createdCallback = function () {
  'use strict';
  var autoHandler = (function (obj) {
    return function autoHandler() {
      if (document.readyState === 'complete') {
        obj.get();
      }
    };
  })(this);

  this.auto = this.hasAttribute('auto');
  this.src = this.getAttribute('src');
  this.type = this.getAttribute('type');

  if (this.auto) {
    document.addEventListener('readystatechange', autoHandler);
  }

  global.a = this; // for testing in browser console
};

AsyncDataProto.attributeChangedCallback = function (attr, oldval, newval) {
  'use strict';
  var attrs = (function (elem) {
        return {
          'auto': function () { elem.auto = elem.hasAttribute('auto'); },
          'src' : function () {
            /* jshint curly: false */
            update(attr, newval);
            if (elem.auto) elem.get();
          }
        };
      })(this),
      update = (function (elem) {
        return function (attr, val) {
          elem[attr] = val;
        };
      })(this);

  if (attr in attrs) {
    attrs[attr]();
  } else {
    update(attr, newval);
  }
};

document.registerElement('async-data',
  { prototype: AsyncDataProto }
);
