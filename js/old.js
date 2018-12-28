'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var PINS_COUNT = 8;

var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 100;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getMixArray = function (arr) {
  return arr.slice().sort(function () {
    return 0.5 - Math.random();
  });
};

var getClipArray = function (arr, count) {
  return arr.slice(0, count - 1);
};

var getAvatar = function (i) {
  return 'img/avatars/user0' + ++i + '.png';
};

var getTitle = function (i) {
  return getMixArray(TITLES)[i];
};

var getFeatures = function () {
  return getClipArray(getMixArray(FEATURES), getRandomInt(0, FEATURES.length));
};

// пересчитаем координаты
var getPinCoordinats = function (location) {
  return {x: location.x + PIN_WIDTH / 2, y: location.y - PIN_HEIGHT};
};

var getElementFromTemplate = function (templateId, templateClassName) {
  var templateElem = $($(templateId).html());
  if(templateClassName !== undefined) {
    templateElem = templateElem.find(templateClassName).first();
//    console.log(templateElem);
  }
  return templateElem;
};

var removeChildElements = function (parentElement) {
  //console.log(parentElement);
  parentElement.empty();
};

var addChildElements = function (arr, parentElement, getElement) {
  var fragment = $(document.createDocumentFragment());
  for (var i = 0; i < arr.length; i++) {
    fragment.append(getElement(arr[i]));
  }
  parentElement.append(fragment);
};

var getPinElement = function (pin) {
  var pinElement = getElementFromTemplate('#pin');
  var location = getPinCoordinats(pin.location);
  pinElement.css('left', location.x + 'px');
  pinElement.css('top', location.y + 'px');
  pinElement.children('img').attr('src', pin.author.avatar);
  pinElement.children('img').attr('alt', pin.offer.title);
  return pinElement;
};

var getPhotoElement = function (photo) {
  var photoElement = getElementFromTemplate('#card', '.popup__photo');
  photoElement.attr('src', photo);
  return photoElement;
};

var getFeatureElement = function (feature) {
  var featureElement = getElementFromTemplate('#card', '.popup__feature');
  if (feature !== 'wifi') {
    featureElement.removeClass('popup__feature--wifi');
    featureElement.addClass('popup__feature--' + feature);
  }
  return featureElement;
};

var getCardElement = function (pin) {
  var cardElement = getElementFromTemplate('#card');

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
  removeChildElements(featureListElement);
  addChildElements(pin.offer.features, featureListElement, getFeatureElement);

  cardElement.children('.popup__description').text(pin.offer.description);

  var photoListElement =  cardElement.find('.popup__photos').first();
  removeChildElements(photoListElement);
  addChildElements(pin.offer.photos, photoListElement, getPhotoElement);

  return cardElement;
};

var getPins = function (pinsCount) {
  var arr = [];
  for (var i = 0; i < pinsCount; i++) {
    var x = getRandomInt(MIN_X, MAX_X - PIN_HEIGHT);
    var y = getRandomInt(MIN_Y, MAX_Y);

    arr[i] = {
      author: {
        avatar: getAvatar(i),
      },

      offer: {
        title: getTitle(i),
        address: x + ',' + y,
        price: getRandomInt(MIN_PRICE, MAX_PRICE),
        type: TYPES[getRandomInt(0, TYPES.length - 1)],
        rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
        checkin: CHECK[getRandomInt(0, CHECK.length - 1)],
        checkout: CHECK[getRandomInt(0, CHECK.length - 1)],
        features: getFeatures(),
        description: '',
        photos: getMixArray(PHOTOS),
      },

      location: {
        x: x,
        y: y,
      },
    };
  }
  return arr;
};

var pins = getPins(PINS_COUNT);

addChildElements(pins, $('.map__pins'), getPinElement);
$('.map__filters-container').before(getCardElement(pins[0]));
$('.map').removeClass('map--faded');
