'use strict';

(function () {
  var Image = {
    WIDTH: '70',
    HEIGHT: '70',
    MARGIN_RIGHT: '10px'
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form-header__input[type=file]');
  var photoChooser = document.querySelector('.ad-form__input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoBlockElement = document.querySelector('.ad-form__photo');
  photoBlockElement.style.display = 'flex';

  var addImage = function (fileChooserArg, imgElementArg) {
    loadImage(fileChooserArg.files[0], imgElementArg);
  };

  var loadImage = function (fileArg, imgElementArg) {

    var fileName = fileArg.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgElementArg.src = reader.result;
      });
      reader.readAsDataURL(fileArg);
    }
  };

  var createImage = function (blockElementArg) {
    var imageElement = blockElementArg.appendChild(document.createElement('IMG'));
    imageElement.width = Image.WIDTH;
    imageElement.height = Image.HEIGHT;
    imageElement.style.marginRight = Image.MARGIN_RIGHT;
    return imageElement;
  };

  avatarChooser.addEventListener('change', function (evt) {
    addImage(evt.target, avatarPreview);
  });

  photoChooser.addEventListener('change', function (evt) {
    addImage(evt.target, createImage(photoBlockElement));
  });
})();
