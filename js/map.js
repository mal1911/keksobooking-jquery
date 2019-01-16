'use strict';
(function () {
  var mapElement = $('.map');

  var enable = function () {
    if (mapElement.hasClass('map--faded')) {
      mapElement.removeClass('map--faded');
    }
  };

  var disable = function () {
    if (!mapElement.hasClass('map--faded')) {
      mapElement.addClass('map--faded');
    }
  };

  var onActivatePin = function (pin) {
    window.card.open(pin);
  };

  mapElement.bind('click', function (evt) {
    window.pins.activatePin(evt.target, onActivatePin);
  });

  mapElement.bind('keydown', function (evt) {
    if (evt.keyCode === window.keyUtil.ENTER_KEYCODE) {
      window.pins.activatePin($(evt.target), onActivatePin);
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
