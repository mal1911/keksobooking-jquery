'use strict';
(function () {
  var mapElement = document.querySelector('.map');

  var enable = function () {
    if (mapElement.classList.contains('map--faded')) {
      mapElement.classList.remove('map--faded');
    }
  };

  var disable = function () {
    if (!mapElement.classList.contains('map--faded')) {
      mapElement.classList.add('map--faded');
    }
  };

  var onActivatePin = function (pin) {
    window.card.open(pin);
  };

  mapElement.addEventListener('click', function (evt) {
    window.pins.activatePin(evt.target, onActivatePin);
  });

  mapElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyUtil.ENTER_KEYCODE) {
      window.pins.activatePin(evt.target, onActivatePin);
    }
  });

  var initialize = function (onActivateMainPin) {
    var activateMainPinHandler = function (coordinats) {
      window.pins.show();
      onActivateMainPin(coordinats);
    };
    window.mainPin.initialize(activateMainPinHandler);
  };

  var reset = function () {
    window.mainPin.setDefaults();
    window.card.close();
    window.pins.hide();
  };

  window.map = {
    initialize: initialize,
    reset: reset,
    enable: enable,
    disable: disable
  };
})();
