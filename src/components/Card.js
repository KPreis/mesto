export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      isCreator,
      currentUserId,
      handleDeleteCardClick,
      handleLikeClick,
    },
    cardSelector
  ) {
    this._data = data;
    this._name = data['name'];
    this._link = data['link'];
    this._isCreator = isCreator;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  /*
  _handleLikeClick() {
    this._card
      .querySelector('.card__like')
      .classList.toggle('card__like_active');
  }
*/
  removeCard = () => {
    this._card.remove();
  };

  _setEventListeners() {
    this._card.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._card.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick(this._card, this._data);
    });
    this._card.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteCardClick(this._data['_id']);
    });
  }

  createCard() {
    this._card = this._getTemplate();
    this._like = this._card.querySelector('.card__like');
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._imgCard = this._card.querySelector('.card__img');
    this._trashCard = this._card.querySelector('.card__delete');

    if (this._isCreator) {
      this._trashCard.classList.add('card__delete_visible');
    }

    this._data['likes'].forEach((item) => {
      if (item['_id'] === this._currentUserId) {
        this._like.classList.add('card__like_active');
      }
    });

    this._likeCounter.textContent = this._data['likes'].length;
    this._imgCard.alt = this._name;
    this._imgCard.src = this._link;

    this._card.querySelector('.card__name').textContent = this._name;
    this._setEventListeners();

    return this._card;
  }
}