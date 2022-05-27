(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var n,r;return n=t,(r=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"sendNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:"".concat(e.name),link:"".concat(e.link)})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"getProfile",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"setProfile",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:"".concat(e.name),about:"".concat(e.description)})}).then(this._checkResponse)}},{key:"setAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:"".concat(e)})}).then(this._checkResponse)}},{key:"setLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){var r=t.data,o=t.handleCardClick,i=t.isCreator,a=t.currentUserId,c=t.handleDeleteCardClick,u=t.setLike,s=t.deleteLike;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data=r,this._name=r.name,this._link=r.link,this._isCreator=i,this._currentUserId=a,this._cardSelector=n,this._handleCardClick=o,this._handleDeleteCardClick=c,this._setLike=u,this._deleteLike=s}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_handleLikeClick",value:function(){var e=this;this._like.classList.contains("card__like_active")?this._deleteLike(this._data._id).then((function(t){e._likeCounter.textContent=t,e._like.classList.remove("card__like_active")})).catch((function(e){console.log(e)})):this._setLike(this._data._id).then((function(t){e._likeCounter.textContent=t,e._like.classList.add("card__like_active")})).catch((function(e){console.log(e)}))}},{key:"_setEventListeners",value:function(){var e=this;this._imgCard.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)})),this._like.addEventListener("click",(function(){e._handleLikeClick()})),this._trashCard.addEventListener("click",(function(){e._handleDeleteCardClick(e._data._id,e._card)}))}},{key:"createCard",value:function(){var e=this;return this._card=this._getTemplate(),this._like=this._card.querySelector(".card__like"),this._likeCounter=this._card.querySelector(".card__like-counter"),this._imgCard=this._card.querySelector(".card__img"),this._trashCard=this._card.querySelector(".card__delete"),this._isCreator&&this._trashCard.classList.add("card__delete_visible"),this._data.likes.forEach((function(t){t._id===e._currentUserId&&e._like.classList.add("card__like_active")})),this._likeCounter.textContent=this._data.likes.length,this._imgCard.alt=this._name,this._imgCard.src=this._link,this._card.querySelector(".card__name").textContent=this._name,this._setEventListeners(),this._card}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(this,"_showInputError",(function(e,t){r._errorElement=r._formElement.querySelector(".".concat(e.id,"-error")),e.classList.add(r._inputErrorClass),r._errorElement.textContent=t,r._errorElement.classList.add(r._errorClass)})),this._popup=n,this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass}var t,n;return t=e,(n=[{key:"_hideInputError",value:function(e){this._errorElement=this._formElement.querySelector(".".concat(e.id,"-error")),e.classList.remove(this._inputErrorClass),this._errorElement.textContent="",this._errorElement.classList.remove(this._errorClass)}},{key:"_hasInvalidInput",value:function(){return this._inputItemsList.some((function(e){return!e.validity.valid}))}},{key:"_changeButtonState",value:function(){this._hasInvalidInput(this._inputItemsList)?(this._buttonSave.classList.add(this._inactiveButtonClass),this._buttonSave.disabled=!0):(this._buttonSave.classList.remove(this._inactiveButtonClass),this._buttonSave.disabled=!1)}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_handleInputChange",value:function(){var e=this;this._inputItemsList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonSave=this._formElement.querySelector(this._submitButtonSelector),this._inputItemsList.forEach((function(t){t.addEventListener("input",(function(n){n.preventDefault(),e._isValid(t),e._changeButtonState()}))}))}},{key:"_handleSubmitForm",value:function(){this._formElement=this._popup.querySelector(this._formSelector),this._formElement.addEventListener("submit",(function(e){e.preventDefault()}))}},{key:"_setEventListeners",value:function(){this._handleSubmitForm(),this._handleInputChange()}},{key:"enableValidation",value:function(){this._setEventListeners(),this._changeButtonState()}},{key:"resetValidation",value:function(){var e=this;this._changeButtonState(),this._inputItemsList.forEach((function(t){e._hideInputError(t)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),a={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__save-button",inactiveButtonClass:"form__save-button_disabled",inputErrorClass:"form__item_type_error",errorClass:"form__item-error_active"};function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"_handleClickToOverlay",(function(e){e.target.classList.contains("pop-up_opened")&&n.close()})),l(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".pop-up__close-button")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("pop-up_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("pop-up_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._closeButton.addEventListener("click",(function(){e.close()})),this._popup.addEventListener("click",this._handleClickToOverlay)}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}function d(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _(e)}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=v(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},y.apply(this,arguments)}function v(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(i,e);var t,n,r,o=(n=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(n);if(r){var o=b(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return d(this,e)});function i(e,t){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),m(_(a=o.call(this,e)),"open",(function(e,t){a._cardId=e,a._card=t,y((n=_(a),b(i.prototype)),"open",n).call(n)})),m(_(a),"setEventListeners",(function(){a._form.addEventListener("submit",(function(e){e.preventDefault(),a._handleFormSubmit(a._cardId,a._card)})),y((r=_(a),b(i.prototype)),"setEventListeners",r).call(r)})),a._form=a._popup.querySelector(".form"),a._handleFormSubmit=t,a}return t=i,Object.defineProperty(t,"prototype",{writable:!1}),t}(f);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}function C(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return E(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=O(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function O(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=L(e)););return e}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(i,e);var t,n,r,o=(n=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=L(n);if(r){var o=L(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return C(this,e)});function i(e){var t,n,r,a,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),c=function(e,r){n._popupImage.src=r,n._popupImage.alt=e,n._popupImageLabel.textContent=e,S((t=E(n),L(i.prototype)),"open",t).call(t)},(a="open")in(r=E(n=o.call(this,e)))?Object.defineProperty(r,a,{value:c,enumerable:!0,configurable:!0,writable:!0}):r.open=c,n._popupImage=n._popup.querySelector(".pop-up__image"),n._popupImageLabel=n._popup.querySelector(".pop-up__label"),n}return t=i,Object.defineProperty(t,"prototype",{writable:!1}),t}(f);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},R(e,t)}function q(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return T(e)}function T(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function U(){return U="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=x(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},U.apply(this,arguments)}function x(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=B(e)););return e}function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},B(e)}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&R(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=B(r);if(o){var n=B(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return q(this,e)});function a(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),D(T(r=i.call(this,e)),"_getInputValues",(function(){var e={};return r._inputList.forEach((function(t){e[t.name]=t.value})),e})),D(T(r),"setInputValues",(function(e){r._inputList.forEach((function(t){t.value=e[t.name]}))})),D(T(r),"setEventListeners",(function(){r._form.addEventListener("submit",(function(e){e.preventDefault(),r._handleFormSubmit(r._getInputValues())})),U((n=T(r),B(a.prototype)),"setEventListeners",n).call(n)})),r._handleFormSubmit=t,r._form=r._popup.querySelector(".form"),r._inputList=r._form.querySelectorAll(".form__item"),r}return t=a,(n=[{key:"close",value:function(){this._form.reset(),U(B(a.prototype),"close",this).call(this)}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(f);function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(e,t,n){return t&&V(e.prototype,t),n&&V(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var J=N((function e(t,n,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),F(this,"getUserInfo",(function(){return{name:o._fieldName.textContent,description:o._fieldDescriptions.textContent}})),F(this,"setUserInfo",(function(e){o._fieldName.textContent=e.name,o._fieldDescriptions.textContent=e.about})),F(this,"setAvatar",(function(e){o._avatar.src=e})),this._fieldName=document.querySelector(t),this._fieldDescriptions=document.querySelector(n),this._avatar=document.querySelector(r)}));function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var H=document.querySelector(".profile__info"),M=document.querySelector(".profile__avatar"),z=H.querySelector(".profile__edit-button"),$=document.querySelector(".profile__add-button"),K=(document.querySelector(".galary"),document.querySelector("#profileEditPopup")),Q=document.querySelector("#cardAddPopup"),W=document.querySelector("#avatarUpdatePopup"),X="",Y=new u({renderer:function(e){Y.appendItem(ie(e))}},".galary__cards-list"),Z=new i(a,K),ee=new i(a,Q),te=new i(a,W),ne=new J(".profile__name",".profile__description",".profile__avatar"),re=function(e){var t=e.querySelector(".form__save-button");"Сохранить"===t.textContent?t.textContent="Сохранение...":t.textContent="Сохранить"},oe=new t({baseUrl:"https:///mesto.nomoreparties.co/v1/".concat("cohort-41"),headers:{authorization:"".concat("eb3b2bc4-a18d-46ae-aeed-207ad13f265c"),"Content-Type":"application/json"}});Promise.all([oe.getInitialCards(),oe.getProfile()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];ne.setUserInfo(i),ne.setAvatar(i.avatar),X=i._id,Y.renderItems(o)})).catch((function(e){console.log(e)}));var ie=function(e){return new r({data:e,handleCardClick:function(e,t){ue.open(e,t)},isCreator:X==e.owner._id,currentUserId:X,handleDeleteCardClick:function(e,t){le.open(e,t)},setLike:function(e){return oe.setLike(e).then((function(e){return e.likes.length}))},deleteLike:function(e){return oe.deleteLike(e).then((function(e){return e.likes.length}))}},"#card").createCard()},ae=new A("#profileEditPopup",(function(e){re(K),oe.setProfile(e).then((function(e){ne.setUserInfo(e)})).then((function(){ae.close()})).catch((function(e){console.log(e)})).finally((function(){re(K)}))}));ae.setEventListeners();var ce=new A("#avatarUpdatePopup",(function(e){re(W),oe.setAvatar(e.link).then((function(e){ne.setAvatar(e.avatar)})).then((function(){ce.close()})).catch((function(e){console.log(e)})).finally((function(){re(W)}))}));ce.setEventListeners();var ue=new P("#imagePopup");ue.setEventListeners();var se=new A("#cardAddPopup",(function(e){re(Q),oe.sendNewCard(e).then((function(e){Y.addItem(ie(e))})).then((function(){se.close()})).catch((function(e){console.log(e)})).finally((function(){re(Q)}))}));se.setEventListeners();var le=new k("#cardConfirmDeletePopup",(function(e,t){oe.deleteCard(e).then((function(e){"Пост удалён"===e.message&&(le.close(),t.remove())})).catch((function(e){console.error(e)}))}));le.setEventListeners(),$.addEventListener("click",(function(){se.open(),ee.resetValidation()})),z.addEventListener("click",(function(){ae.open(),ae.setInputValues(ne.getUserInfo()),Z.resetValidation()})),M.addEventListener("click",(function(){ce.open(),te.resetValidation()})),Z.enableValidation(),ee.enableValidation(),te.enableValidation()})();