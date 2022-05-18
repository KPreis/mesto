import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.pop-up__image');
    this._popupImageLabel = this._popup.querySelector('.pop-up__label');
  }

  open = (name, link) => {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageLabel.textContent = name;
    super.open();
  };
}
