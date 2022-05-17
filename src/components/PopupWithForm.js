import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('#profileEditForm');
    this._fieldName = this._form.querySelector('#profileNameEditField');
    this._fieldDescription = this._form.querySelector(
      '#profileDescriptionEditField'
    );
  }

  _getInputValues = () => {
    const values = {
      name: this._fieldName.value,
      description: this._fieldDescription.value,
    };

    return values;
  };

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  };

  close = () => {
    super.close();
    this._form.removeEventListener('submit', this._submitForm);
    this._form.reset();
  };
}
