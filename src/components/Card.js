export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._card
      .querySelector('.card__like')
      .classList.toggle('card__like_active');
  }

  _handleRemoveClick() {
    this._card.remove();
  }

  _setEventListeners() {
    this._card.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._card.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._card.querySelector('.card__delete').addEventListener('click', () => {
      this._handleRemoveClick();
    });
  }

  createCard() {
    this._card = this._getTemplate();

    this._imgCard = this._card.querySelector('.card__img');

    this._imgCard.alt = this._name;
    this._imgCard.src = this._link;

    this._card.querySelector('.card__name').textContent = this._name;
    this._setEventListeners();

    return this._card;
  }
}
