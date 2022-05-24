import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open = (cardId, card) => {
    this._cardId = cardId;
    this._card = card;
    super.open();
  };

  setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._card);
    });
    super.setEventListeners();
  };
}
