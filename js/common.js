(function(){
	'use strict';


	var getQRUrl = function(text, ecc, size){
		var url = 'http://chart.apis.google.com/chart?cht=qr&chs={s}x{s}&chld={e}|0&chl={t}';

		ecc = ecc || 'L';
		size = size || 200;
		text = encodeURIComponent(text).replace(/'/g,"%27").replace(/"/g,"%22");

		url = url.replace(/\{s\}/g, size).replace(/\{e\}/, ecc).replace(/\{t\}/, text);

		return url;
	};


	window.onload = function(){

		var form = document.getElementById('form'),
			info = document.getElementById('info'),
			qr = document.getElementById('qr');

		qr.onload = function(){
			this.style.display = 'block';
			info.innerText = '';
		};

		qr.onerror = function(){
			info.innerText = info.attributes['data-error'].value;
		};

		form.onsubmit = function(){

			info.innerText = info.attributes['data-loading'].value;
			qr.style.display = 'none';
			qr.src = '';

			var text = this.text.value;
			if (typeof ''.trim != 'undefined') {
				text = text.trim();
			}
			qr.src = getQRUrl(text, this.ecc.value, this.size.value);

			return false;
		};

		form.text.oninvalid = function () {

			info.innerText = this.validationMessage;
			this.focus();

			return false;
		};

	};


}());