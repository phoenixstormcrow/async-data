/* event.js

   helper factories for constructing events used by async-data.
*/
'use strict';

module.exports = {
  dataEvent: function (detail) {
    return new CustomEvent('data', {
      'detail': detail,
      'bubbles': true
    });
  },
  errorEvent: function (detail) {
    return new CustomEvent('error', {
      'detail': detail,
      'bubbles': true
    });
  }
};
