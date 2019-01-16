'use strict';
(function () {


  var getElementFromTemplate = function (templateId, templateClassName) {
    var templateElem = $($(templateId).html());
    if(templateClassName !== undefined) {
      templateElem = templateElem.find(templateClassName).first();
//    console.log(templateElem);
    }
    return templateElem;
  };


  var addChildElements = function (arrArg, parentElement, getElement, countArg) {
    //var fragment = document.createDocumentFragment();
    var fragment = $(document.createDocumentFragment());
    var count = (countArg && countArg < arrArg.length) ? countArg : arrArg.length;
    for (var i = 0; i < count; i++) {
      var element = getElement(arrArg[i]);
      if (element) {
        //fragment.appendChild(element);
        fragment.append(element);
      }
    }
    //parentElement.appendChild(fragment);
    parentElement.append(fragment);
  };


  var removeChildElements = function (element) {
    if (element) {
      element.innerHTML = '';
    }
  };

  var removeElements = function (elements) {
    if (elements.length > 0) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
  };

  var getIndexElement = function (element, elements) {
    var indexElement = -1;
    for (var i = 0; i < elements.length; i++) {
      if (element === elements[i]) {
        indexElement = i;
        break;
      }
    }
    return indexElement;
  };

  window.domUtil = {
    addChildElements: addChildElements,
    removeChildElements: removeChildElements,
    removeElements: removeElements,
    getIndexElement: getIndexElement,
    getElementFromTemplate: getElementFromTemplate
  };
})();
