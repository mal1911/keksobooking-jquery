'use strict';
(function () {
  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var onResetForm;
  var formElement = document.querySelector('.ad-form');
  var inputElements = formElement.querySelectorAll('input');
  var typeElement = formElement.querySelector('#type');
  var priceElement = formElement.querySelector('#price');
  var timeinElement = formElement.querySelector('#timein');
  var timeoutElement = formElement.querySelector('#timeout');
  var roomNumberElement = formElement.querySelector('#room_number');
  var capacityElement = formElement.querySelector('#capacity');
  var featureElements = formElement.querySelectorAll('.feature__checkbox');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoBlockElement = document.querySelector('.ad-form__photo');


  var isEnabled = function () {
    return !formElement.classList.contains('ad-form--disabled');
  };

  var disable = function () {
    if (isEnabled()) {
      formElement.classList.add('ad-form--disabled');
    }
    var fieldsets = formElement.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var enable = function () {
    if (!isEnabled()) {
      formElement.classList.remove('ad-form--disabled');
    }
    var fieldsets = formElement.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };

  var setCustomValidity = function (evt) {
    var element = evt.target;
    if (element.validity.tooShort) {
      element.setCustomValidity('Мало символов.');
    } else if (element.validity.tooLong) {
      element.setCustomValidity('Много символов.');
    } else if (element.validity.valueMissing) {
      element.setCustomValidity('Вообще не ввели.');
    } else if (element.validity.rangeUnderflow) {
      element.setCustomValidity('Меньше минимального.');
    } else if (element.validity.rangeOverflow) {
      element.setCustomValidity('Больше минимального.');
    } else {
      element.setCustomValidity('');
    }
  };

  var setPriceElementMinValue = function (value) {
    var price = Price.BUNGALO;
    switch (value) {
      case 'bungalo':
        break;
      case 'flat':
        price = Price.FLAT;
        break;
      case 'house':
        price = Price.HOUSE;
        break;
      case 'palace':
        price = Price.PALACE;
        break;
    }
    priceElement.setAttribute('min', price);
    priceElement.setAttribute('placeholder', price);
    priceElement.checkValidity();
  };

  var onTypeChange = function (evt) {
    setPriceElementMinValue(evt.target.value);
  };

  typeElement.addEventListener('change', onTypeChange);

  var timeSynchronization = function (sourceElement, recipientElement) {
    recipientElement.value = sourceElement.value;
  };

  timeinElement.addEventListener('change', function (evt) {
    timeSynchronization(evt.target, timeoutElement);
  });

  timeoutElement.addEventListener('change', function (evt) {
    timeSynchronization(evt.target, timeinElement);
  });

  var getCapacityRule = function (value) {
    var rule = [];
    switch (value) {
      case '1':
        rule = [1];
        break;
      case '2':
        rule = [1, 2];
        break;
      case '3':
        rule = [1, 2, 3];
        break;
      case '100':
        rule = [0];
        break;
    }
    return rule;
  };

  var getCapacityInvalidMessage = function (value) {
    var message = 'Выберете количество гостей из перечня: ';
    var rule = getCapacityRule(value);
    for (var i = 0; i < rule.length; i++) {
      message += ' ' + capacityElement.querySelector('option[value="' + rule[i] + '"]').textContent + ';';
    }
    message = message.substring(0, message.length - 1) + '.';
    return message;
  };

  var isCapacityValid = function (value, rule) {
    var result = false;
    if (rule.indexOf(parseInt(value, 10)) !== -1) {
      result = true;
    }
    return result;
  };

  var setCapacityValues = function (element) {
    var getOptionStyle = function () {
      return isCapacityValid(elements[i].value, rule) ? 'inline' : 'none';
    };

    var elements = capacityElement.querySelectorAll('option');
    var rule = getCapacityRule(element.value);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = getOptionStyle();
    }
    setCapacityCustomValidate(capacityElement);
  };

  var setCapacityCustomValidate = function (element) {
    var getInvalidMessage = function () {
      return !isCapacityValid(value, rule) ? getCapacityInvalidMessage(roomNumberElement.value) : '';
    };

    var value = element.value;
    var rule = getCapacityRule(roomNumberElement.value);
    element.setCustomValidity(getInvalidMessage());
  };

  roomNumberElement.addEventListener('change', function (evt) {
    setCapacityValues(evt.target);
  });

  capacityElement.addEventListener('change', function (evt) {
    setCapacityCustomValidate(evt.target);
  });

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('invalid', function (evt) {
      setCustomValidity(evt);
    });
    inputElements[i].addEventListener('input', function (evt) {
      var element = evt.target;
      element.checkValidity();
    });
  }

  var setAddress = function (coordinats) {
    formElement.querySelector('#address').value = coordinats.x + ',' + coordinats.y;
  };

  var save = function () {
    var successHandler = function () {
      reset();
      window.msg.showSuccess('Операция успешно выполнена', false);
    };

    var errorHandler = function (errorMessage) {
      var repeatHandler = function () {
        save();
      };
      window.msg.showError(errorMessage, repeatHandler);
    };
    window.backend.save(new FormData(formElement), window.url.SAVE, successHandler, errorHandler);
  };

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    save();
  });

  var reset = function () {
    for (i = 0; i < inputElements.length; i++) {
      inputElements[i].value = '';
    }
    typeElement.value = 'flat';
    roomNumberElement.value = '1';
    capacityElement.value = '3';
    timeinElement.value = '12:00';
    timeoutElement.value = '12:00';
    avatarPreview.src = 'img/muffin-grey.svg';
    photoBlockElement.innerHTML = '';

    for (i = 0; i < featureElements.length; i++) {
      featureElements[i].checked = false;
    }
    onResetForm();
  };

  formElement.addEventListener('reset', function (evt) {
    evt.preventDefault();
    reset();
  });

  var initialize = function (resetFormHandler) {
    onResetForm = resetFormHandler;
  };

  setPriceElementMinValue(typeElement.value);
  setCapacityValues(roomNumberElement);

  window.form = {
    initialize: initialize,
    enable: enable,
    disable: disable,
    setAddress: setAddress
  };
})();
