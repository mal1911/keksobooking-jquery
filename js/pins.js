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
  var mapElement = $('.map');

  var getPositionFromCoordinats = function (coordinats) {
    return {x: coordinats.x - Pin.WIDTH / 2, y: coordinats.y - Pin.HEIGHT};
  };

  var isShow = function () {
    //console.log($('.map__pin:not(.map__pin--main)'));
    //return mapElement.querySelector('.map__pin:not(.map__pin--main)');
    return $('.map__pin:not(.map__pin--main)').length;
  };

  /*  var getPinElement = function (pin, template) {
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
  */
  var getPinElement = function (pin) {
    if (pin.offer) {
      var pinElement = window.domUtil.getElementFromTemplate('#pin');
      var location = getPositionFromCoordinats(pin.location);
      pinElement.css('left', location.x + 'px');
      pinElement.css('top', location.y + 'px');
      pinElement.children('img').attr('src', pin.author.avatar);
      pinElement.children('img').attr('alt', pin.offer.title);
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
      //var pinListElement = mapElement.querySelector('.map__pins');
      //var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      //addChildElements(pins, $('.map__pins'), getPinElement);
      window.domUtil.addChildElements(pins, $('.map__pins'), getPinElement, Pin.COUNT);
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
    var elements = $('.map__pin:not(.map__pin--main)');
    window.domUtil.removeElements(elements);
  };

  var setActivePin = function (element) {
    var oldActiveElememt = $('.map__pin--active');
    if (oldActiveElememt.length) {
      oldActiveElememt.removeClass('map__pin--active');
    }
    element.addClass('map__pin--active');
  };

  var activatePin = function (element, onActivatePin) {
    //element = element.closest('.map__pin:not(.map__pin--main)');
    element = $(element).closest('.map__pin:not(.map__pin--main)');
    var pinElements = $('.map__pin:not(.map__pin--main)');
    if (element) {
      setActivePin(element);
      //console.log(element);
      //console.log(pinElements);
      //console.log(window.domUtil.getIndexElement(element[0], pinElements));
      var index = window.domUtil.getIndexElement(element[0], pinElements);
      if (index > -1) {
        onActivatePin(pins[index]);
      }
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
