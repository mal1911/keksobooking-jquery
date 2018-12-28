'use strict';
(function () {
  var activatePage = function () {
    window.map.enable();
    window.form.enable();
  };

  var resetPage = function () {
    window.map.reset();
    window.map.disable();
    window.form.disable();
    window.form.setAddress(window.mainPin.getDefaultCoordinats());
  };

  var activateMainPinHandler = function (coordinats) {
    activatePage();
    window.form.setAddress(coordinats);
  };

  var resetFormHandler = function () {
    resetPage();
  };

  window.map.initialize(activateMainPinHandler);
  window.form.initialize(resetFormHandler);
  resetPage();

})();
