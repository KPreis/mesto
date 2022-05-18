import Popup from './Popup.js';
import UserInfo from './UserInfo.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.pop-up__form');
    this._inputList = this._form.querySelectorAll('.form__item');
  }

  _getInputValues = () => {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  setInputValues = () => {
    const personalProfile = new UserInfo(
      '.profile__name',
      '.profile__description'
    );
    this._inputList.forEach((input) => {
      input.value = personalProfile.getUserInfo()[input.name];
    });
  };

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  };

  close() {
    this._form.reset();
    super.close();
  }
}
