'use strict';
(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 22
  };

  var mainPinElement = $('.map__pin--main');

  var getCoordinatsFromPosition = function (position) {
    return {
      x: Math.floor(position.x + MainPin.WIDTH / 2),
      y: Math.floor(position.y + MainPin.HEIGHT + MainPin.POINTER_HEIGHT)
    };
  };

  var getDefaultCoordinats = function () {
    return {x: 100, y: 50};
    //return getCoordinatsFromPosition(window.dragEndDrop.getDefaultPosition());
  };

  var getMainPinValidPosition = function () {
    var parentElement = $('.map__pins').first();
    console.log(parentElement.top);
    console.log(parentElement.left);
    return [window.pinsArea.minX + parentElement.left,
      window.pinsArea.minY - (MainPin.HEIGHT + MainPin.POINTER_HEIGHT) + parentElement.top,
      window.pinsArea.maxX - MainPin.WIDTH + parentElement.left,
      window.pinsArea.maxY - (MainPin.HEIGHT + MainPin.POINTER_HEIGHT)] + parentElement.top;
  };

  var initialize = function (onActivateMainPin) {
    var stopDragginElement = function (evt, ui) {
      //onActivateMainPin(getCoordinatsFromPosition(position));
      console.log(ui.offset.top + ' ' + ui.offset.left);
    };

    console.log(getMainPinValidPosition());

    mainPinElement.draggable({
      cancel: false,
      containment: [0,0, 1000, 500],//getMainPinValidPosition(),
      stop: stopDragginElement
    });

    //  window.dragEndDrop.initialize(mainPinElement, mainPinValidPosition, activateElementHandler);


  };

  var setDefaults = function () {
    //window.dragEndDrop.setDefaults();
  };

  window.mainPin = {
    initialize: initialize,
    setDefaults: setDefaults,
    getDefaultCoordinats: getDefaultCoordinats
  };
})();
