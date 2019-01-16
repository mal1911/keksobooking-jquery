'use strict';
(function () {
  var mapElement = $('.map');

  var onEscPress = function (evt) {
    if (evt.keyCode === window.keyUtil.ESC_KEYCODE) {
      close();
    }
  };

  /*var getPhotoElement = function (photo, template) {
    var photoElement = template.cloneNode(true);
    photoElement.src = photo;
    return photoElement;
  };*/

  var getPhotoElement = function (photo) {
    var photoElement = window.domUtil.getElementFromTemplate('#card', '.popup__photo');
    photoElement.attr('src', photo);
    return photoElement;
  };

  var getFeatureElement = function (feature) {
    var featureElement = window.domUtil.getElementFromTemplate('#card', '.popup__feature');
    if (feature !== 'wifi') {
      featureElement.removeClass('popup__feature--wifi');
      featureElement.addClass('popup__feature--' + feature);
    }
    return featureElement;
  };

/*
  var getFeatureElement = function (feature, template) {
    var featureElement = template.cloneNode(true);
    featureElement.classList.add('popup__feature--' + feature);
    return featureElement;
  };
*/

/*
  var getCardElement = function (pin, template) {
    var cardElement = template.cloneNode(true);
    if (pin.offer.title) {
      cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    } else {
      cardElement.querySelector('.popup__title').style.display = 'none';
    }

    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    var carType = cardElement.querySelector('.popup__type');
    switch (pin.offer.type) {
      case 'flat':
        carType.textContent = 'Квартира';
        break;
      case 'bungalo':
        carType.textContent = 'Бунгало';
        break;
      case 'house':
        carType.textContent = 'Дом';
        break;
      case 'palace':
        carType.textContent = 'Дворец';
        break;
    }
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ',  выезд до ' + pin.offer.checkout;

    var featureListElement = cardElement.querySelector('.popup__features');
    var featureTemplate = cardElement.querySelector('.popup__feature');
    featureTemplate.classList.remove('popup__feature--wifi');
    window.domUtil.removeChildElements(featureListElement);

    if (pin.offer.features.length === 0) {
      featureListElement.style.display = 'none';
    } else {
      window.domUtil.addChildElements(pin.offer.features, featureListElement, featureTemplate, getFeatureElement);
    }

    if (pin.offer.description) {
      cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    } else {
      cardElement.querySelector('.popup__description').style.display = 'none';
    }

    var photoListElement = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');
    window.domUtil.removeChildElements(photoListElement);

    if (pin.offer.photos.length === 0) {
      photoListElement.style.display = 'none';
    } else {
      window.domUtil.addChildElements(pin.offer.photos, photoListElement, photoTemplate, getPhotoElement);
    }

    cardElement.querySelector('img').src = pin.author.avatar;

    return cardElement;
  };

*/

  var getCardElement = function (pin) {
    var cardElement = window.domUtil.getElementFromTemplate('#card');

    cardElement.children('.popup__title').text(pin.offer.title);
    cardElement.children('.popup__text--address').text(pin.offer.address);
    cardElement.children('.popup__text--price').text(pin.offer.price + '₽/ночь');

    var carType = cardElement.children('.popup__type');
    switch (pin.offer.type) {
      case 'flat':
        carType.text('Квартира');
        break;
      case 'bungalo':
        carType.text('Бунгало');
        break;
      case 'house':
        carType.text('Дом');
        break;
      case 'palace':
        carType.text('Дворец');
        break;
    }
    cardElement.children('.popup__text--capacity').text(pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей');
    cardElement.children('.popup__text--time').text('Заезд после ' + pin.offer.checkin + ',  выезд до ' + pin.offer.checkout);

    var featureListElement = cardElement.find('.popup__features').first();
    window.domUtil.removeChildElements(featureListElement);
    window.domUtil.addChildElements(pin.offer.features, featureListElement, getFeatureElement);

    cardElement.children('.popup__description').text(pin.offer.description);

    var photoListElement = cardElement.find('.popup__photos').first();
    window.domUtil.removeChildElements(photoListElement);
    window.domUtil.addChildElements(pin.offer.photos, photoListElement, getPhotoElement);

    return cardElement;
  };

  var close = function () {
    var deletedElement = $('.map__card');
    if (deletedElement.length) {
      $(document).unbind('keydown', onEscPress);
      deletedElement.remove();
    }
  };

  var open = function (pin) {
    close();
    $('.map__filters-container').before(getCardElement(pin));
    $(document).bind('keydown', onEscPress);
    $('.popup__close').bind('click', close);
  };

  window.card = {
    open: open,
    close: close
  };
})();
