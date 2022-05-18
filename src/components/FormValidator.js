export default class FormValidator {
  constructor(obj, popup) {
    this._popup = popup;
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
  }

  _showInputError = (inputItem, errorMessage) => {
    this._errorElement = this._formElement.querySelector(
      `.${inputItem.id}-error`
    );
    this._buttonSave = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._buttonSave.classList.add(this._inactiveButtonClass);
    inputItem.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputItem) {
    this._errorElement = this._formElement.querySelector(
      `.${inputItem.id}-error`
    );
    inputItem.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._inputItemsList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  _changeButtonState() {
    if (this._hasInvalidInput(this._inputItemsList)) {
      this._buttonSave.classList.add(this._inactiveButtonClass);
      this._buttonSave.disabled = true;
    } else {
      this._buttonSave.classList.remove(this._inactiveButtonClass);
      this._buttonSave.disabled = false;
    }
  }

  _isValid(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _handleInputChange() {
    this._inputItemsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonSave = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputItemsList.forEach((inputItem) => {
      inputItem.addEventListener('input', (event) => {
        event.preventDefault();
        this._isValid(inputItem);
        this._changeButtonState();
      });
    });
  }
  _handleSubmitForm() {
    this._formElement = this._popup.querySelector(this._formSelector);
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
  _setEventListeners() {
    this._handleSubmitForm();
    this._handleInputChange();
  }

  enableValidation() {
    this._setEventListeners();
    this._changeButtonState();
  }

  resetValidation() {
    this._changeButtonState();
    this._inputItemsList.forEach((inputItem) => {
      this._hideInputError(inputItem);
    });
  }
}
