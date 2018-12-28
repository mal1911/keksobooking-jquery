'use strict';
(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 75,
    COUNT: 5
  };

  var PriceLimit = {
    LOW: 10000,
    HIGH: 50000
  };

  var pins;
  var filter;
  var mapElement = document.querySelector('.map');

  var getPositionFromPinCoordinats = function (coordinats) {
    return {x: coordinats.x - Pin.WIDTH / 2, y: coordinats.y - Pin.HEIGHT};
  };

  var isShow = function () {
    return mapElement.querySelector('.map__pin:not(.map__pin--main)');
  };

  var getPinElement = function (pin, template) {
    if (pin.offer) {
      var pinElement = template.cloneNode(true);
      var location = getPositionFromPinCoordinats(pin.location);
      pinElement.style.left = location.x + 'px';
      pinElement.style.top = location.y + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      pinElement.tabIndex = '0';
      return pinElement;
    } else {
      return false;
    }
  };

  var setFilter = function (arrArg) {
    if (filter) {
      return arrArg.filter(function (pin) {
        var isIncludePrice = function (price) {
          var retVal = true;
          switch (price) {
            case 'middle': {
              retVal = pin.offer.price >= PriceLimit.LOW && pin.offer.price <= PriceLimit.HIGH;
              break;
            }
            case 'low': {
              retVal = pin.offer.price < PriceLimit.LOW;
              break;
            }
            case 'high': {
              retVal = pin.offer.price > PriceLimit.HIGH;
              break;
            }
          }
          return retVal;
        };

        var isIncludeFeatures = function (features) {
          var retVal = true;
          features.forEach(function (feature) {
            if (pin.offer.features.indexOf(feature) === -1) {
              retVal = false;
            }
          });
          return retVal;
        };

        var type = (filter.type === 'any' ? true : pin.offer.type === filter.type);
        var rooms = (filter.rooms === 'any' ? true : pin.offer.rooms === parseInt(filter.rooms, 10));
        var guests = (filter.guests === 'any' ? true : pin.offer.guests === parseInt(filter.guests, 10));

        return type && isIncludePrice(filter.price) && rooms && guests && isIncludeFeatures(filter.features);
      });
    } else {
      return arrArg;
    }
  };

  var show = function () {
    var successHandler = function (arrArg) {
      pins = setFilter(arrArg);
      var pinListElement = mapElement.querySelector('.map__pins');
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      window.domUtil.addChildElements(pins, pinListElement, pinTemplate, getPinElement, Pin.COUNT);
    };

    var errorHandler = function (errorMessage) {
      var repeatHandler = function () {
        show();
      };
      hide();
      window.msg.showError(errorMessage, repeatHandler);
    };

    if (!isShow()) {
      window.backend.load(window.url.LOAD, successHandler, errorHandler);
    }
  };

  var hide = function () {
    var elements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.domUtil.removeElements(elements);
  };

  var setActivePin = function (element) {
    var oldActiveElememt = mapElement.querySelector('.map__pin--active');
    if (oldActiveElememt) {
      oldActiveElememt.classList.remove('map__pin--active');
    }
    element.classList.add('map__pin--active');
  };

  var activatePin = function (element, onActivatePin) {
    element = element.closest('.map__pin:not(.map__pin--main)');
    var pinElements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (element) {
      setActivePin(element);
      onActivatePin(pins[window.domUtil.getIndexElement(element, pinElements)]);
    }
  };

  var addFilter = function (filterArg) {
    filter = filterArg;
    hide();
    show();
  };

  window.pins = {
    show: show,
    hide: hide,
    addFilter: addFilter,
    activatePin: activatePin
  };
})();
