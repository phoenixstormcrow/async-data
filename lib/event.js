/* event.js

   helper factories for constructing events used by async-data.
*/
'use strict';

module.exports = {
  dataEvent: function (data) {
    return new MessageEvent('data', {
      'data': data,
      'bubbles': true
    });
  },
  errorEvent: function (error) {
    return new ErrorEvent('error', {
      'message': error.message,
      'error': error,
      'bubbles': true
    });
  }
};
