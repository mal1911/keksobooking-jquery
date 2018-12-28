'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeElement = filterForm.querySelector('#housing-type');
  var priceElement = filterForm.querySelector('#housing-price');
  var roomsElement = filterForm.querySelector('#housing-rooms');
  var guestsElement = filterForm.querySelector('#housing-guests');
  var featureElements = filterForm.querySelectorAll('input');

  var getFilter = function () {
    var getFilterFeatures = function () {
      var features = [];
      for (var i = 0; i < featureElements.length; i++) {
        if (featureElements[i].checked) {
          features.push(featureElements[i].value);
        }
      }
      return features;
    };
    return {
      type: typeElement.value,
      price: priceElement.value,
      rooms: roomsElement.value,
      guests: guestsElement.value,
      features: getFilterFeatures()
    };
  };

  var onChangeFilter = function () {
    return window.debounce(function () {
      window.card.close();
      window.pins.addFilter(getFilter());
    });
  };

  filterForm.addEventListener('change', onChangeFilter);
})();
