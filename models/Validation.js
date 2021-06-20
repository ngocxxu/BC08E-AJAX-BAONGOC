function Validation() {
	this.kiemTraRong = function (value, selectorError, name) {
		if (value.trim() === '') {
			document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống';
			return false;
		}
		document.querySelector(selectorError).innerHTML = '';
		return true;
	};
	this.kiemTraKyTu = function (value, selectorError, name) {
		var regexAllLetter = /^[A-Z a-z]+$/;
		if (regexAllLetter.test(value)) {
			document.querySelector(selectorError).innerHTML = '';
			return true;
		}
		document.querySelector(selectorError).innerHTML = name + ' phải là ký tự';
		return false;
	};
	this.tatCaSo = function (value, selectorError, name) {
		var regexNumber = /^[0-9]+$/;
		if (regexNumber.test(value)) {
			document.querySelector(selectorError).innerHTML = '';
			return true;
		}
		document.querySelector(selectorError).innerHTML = name + ' phải là số';
		return false;
	};
	this.kiemTraDoDai = function (value, selectorError, minLength, maxLength, name) {
		if (value.length < minLength || value.length > maxLength) {
			document.querySelector(selectorError).innerHTML = `
            ${name} phải từ ${minLength} đến ${maxLength} ký tự!`;
			return false;
		}
		document.querySelector(selectorError).innerHTML = '';
		return true;
	};
	this.kiemTraGiaTri = function (value, selectorError, minValue, maxValue, name) {
		if (value < minValue || value > maxValue) {
			document.querySelector(selectorError).innerHTML = `
            ${name} phải từ ${minValue} đến ${maxValue}`;
			return false;
		}
		document.querySelector(selectorError).innerHTML = '';
		return true;
	};
}
