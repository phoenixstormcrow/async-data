/* async-data.js */
var AsyncDataProto = Object.create(HTMLElement.prototype),
    dataEvent = new Event('data', {'bubbles' : true});

function get(url) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

}

AsyncDataProto.get = function getData() {
  var xhr = new XMLHttpRequest(),
      url = this.src,
      that = this;

  if (!url) {
    console.log("Error: invalid src attribute.");
    return;
  }

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      status = xhr.status;

      if ((status >= 200 && status < 300)
           || status === 304 || status === 0) {
        response = xhr.response || xhr.responseText;
        that.value = response;
        that.dispatchEvent(dataEvent);
      } else {
        var msg = "Error: XMLHttpRequest status " + status,
            e = new ErrorEvent('error', {'bubbles': true, 'message': msg});
        console.log(msg);
        that.dispatchEvent(e);
      }
    }
  };

  xhr.send();
};

AsyncDataProto.createdCallback = function () {
  console.log('created');
  this.defer = !!this.getAttribute('defer');
  this.src = this.getAttribute('src');
};

AsyncDataProto.attachedCallback = function () {
  console.log('attached');
  if (this.defer) {
  }
  if (this.src) {
    this.get();
  }
};

AsyncDataProto.attributeChangedCallback = function (attr, oldval, newval) {
  if (attr === 'src' && newval) {
    this.src = newval;
    this.get();
  }
};

var AsyncData = document.registerElement('async-data', { prototype: AsyncDataProto });
