export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._closeButton = this._popup.querySelector('.pop-up__close-button');
  }

  open() {
    this._popup.classList.add('pop-up_opened');
  }

  close = () => {
    this._popup.classList.remove('pop-up_opened');
  };

  _clickHandler = (evt) => {
    if (evt.target.classList.contains('pop-up_opened')) {
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (
      this._popup.classList.contains('pop-up_opened') &&
      evt.key === 'Escape'
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._clickHandler);
  }
}
