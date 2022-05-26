export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      isCreator,
      currentUserId,
      handleDeleteCardClick,
      setLike,
      deleteLike,
      // handleLikeClick,
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
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    //this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    if (this._like.classList.contains('card__like_active')) {
      this._deleteLike(this._data['_id'])
        .then((result) => {
          this._likeCounter.textContent = result;
          this._like.classList.remove('card__like_active');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this._setLike(this._data['_id'])
        .then((result) => {
          this._likeCounter.textContent = result;
          this._like.classList.add('card__like_active');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  _setEventListeners() {
    this._imgCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._trashCard.addEventListener('click', () => {
      this._handleDeleteCardClick(this._data['_id'], this._card);
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
