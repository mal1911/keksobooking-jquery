'use strict';
(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 22
  };

  var mainPinElement = $('.map__pin--main');
  var defaultPosition;
  var currentPosition;
  var onNewActivateMainPin;

  var getCoordinatsFromPosition = function (position) {
    return {
      x: Math.floor(position.x + MainPin.WIDTH / 2),
      y: Math.floor(position.y + MainPin.HEIGHT + MainPin.POINTER_HEIGHT)
    };
  };

  var getDefaultCoordinats = function () {
    return getCoordinatsFromPosition(defaultPosition);
  };

  var getElementPosition = function () {
    return {
      x: Math.floor(parseInt(mainPinElement.css('left'), 10)),
      y: Math.floor(parseInt(mainPinElement.css('top'), 10))
    };
  };

  var setElementPosition = function (position) {
    mainPinElement.css('left', position.x + 'px');
    mainPinElement.css('top', position.y + 'px');
  };

  var setDefaults = function () {
    setElementPosition(defaultPosition);
  };


  var isValidPosition = function (position) {
    var mainPinValidPosition = {
      minX: window.pinsArea.minX,
      maxX: window.pinsArea.maxX - MainPin.WIDTH,
      minY: window.pinsArea.minY - (MainPin.HEIGHT + MainPin.POINTER_HEIGHT),
      maxY: window.pinsArea.maxY - (MainPin.HEIGHT + MainPin.POINTER_HEIGHT)
    };
    return (position.x >= mainPinValidPosition.minX && position.x <= mainPinValidPosition.maxX
      && position.y >= mainPinValidPosition.minY && position.y <= mainPinValidPosition.maxY);
  };

  mainPinElement.bind('mousedown', function (evt) {
    evt.preventDefault();

    var startPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };

    $(document).bind('mousemove', function (moveEvt) {
      evt.preventDefault();

      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY,
      };
      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var tempPosition = {
        x: mainPinElement[0].offsetLeft - shift.x,
        y: mainPinElement[0].offsetTop - shift.y
      };
      if (isValidPosition(tempPosition)) {
        currentPosition = tempPosition;
        setElementPosition(currentPosition);
      }
    });

    $(document).bind('mouseup', function () {
      $(document).unbind('mousemove');
      $(document).unbind('mouseup');
      onNewActivateMainPin(getCoordinatsFromPosition(currentPosition));
    });

  });

  var initialize = function (onActivateMainPin) {
    onNewActivateMainPin = onActivateMainPin;
    defaultPosition = getElementPosition();
  };

  window.mainPin = {
    initialize: initialize,
    setDefaults: setDefaults,
    getDefaultCoordinats: getDefaultCoordinats
  };
})();
