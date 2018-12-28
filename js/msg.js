'use strict';
(function () {

  var showMsg = function (msgText, onRepeat, type) {

    var template = document.querySelector('#' + type).content.querySelector('.' + type);
    var element = template.cloneNode(true);
    element.querySelector('.' + type + '__message').textContent = msgText;
    document.querySelector('main').appendChild(element);

    var onEscPress = function (evt) {
      if (evt.keyCode === window.keyUtil.ESC_KEYCODE) {
        close();
      }
    };

    var close = function () {
      var deletedElement = document.querySelector('.' + type);
      if (deletedElement) {
        document.removeEventListener('keydown', onEscPress);
        document.removeEventListener('click', close);
        deletedElement.remove();
      }
    };

    var repeat = function () {
      close();
      if (onRepeat) {
        onRepeat();
      }
    };
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', close);
    if (type === 'error') {
      element.querySelector('.error__button').addEventListener('click', repeat);
    }
  };

  var showError = function (msgText, onRepeat) {
    showMsg(msgText, onRepeat, 'error');
  };

  var showSuccess = function (msgText, onRepeat) {
    showMsg(msgText, onRepeat, 'success');
  };

  window.msg = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
