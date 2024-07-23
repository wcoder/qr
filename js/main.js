(function(){
  'use strict';

  var QRCode = require('qrcode');

  window.onload = () => {

    var form = document.getElementById('form'),
      info = document.getElementById('info'),
      qr = document.getElementById('qr');

    form.onsubmit = function () {
      _resetQR();

      var text = this.text.value.trim();

      QRCode.toCanvas(
        qr,
        text,
        {
          errorCorrectionLevel: this.ecc.value,
          width: this.size.value,
          margin: 2,
        },
        function (error) {
          if (error) {
            info.innerText = error;
            return
          }
          info.innerText = '';
          qr.classList.add('image');
        });

      return false;
    };

    form.text.oninvalid = function () {
      _resetQR();

      info.innerText = this.validationMessage;
      this.focus();

      return false;
    };

    function _resetQR() {
      _clearCanvas(qr);
      qr.classList.remove('image');
    }
  };

  function _clearCanvas(canvas) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

}());
