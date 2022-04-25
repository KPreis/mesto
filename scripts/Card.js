export class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    return document
      .querySelector("#card")
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeClick() {
    this._card
      .querySelector(".card__like")
      .classList.toggle("card__like_active");
  }

  _handleRemoveClick() {
    this._card.querySelector(".card__delete").closest(".card").remove();
  }

  _setEventListeners() {
    this._card.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._card.querySelector(".card__delete").addEventListener("click", () => {
      this._handleRemoveClick();
    });
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._imgCard = this._card.querySelector(".card__img");

    this._imgCard.alt = this._name;
    this._imgCard.src = this._link;

    this._card.querySelector(".card__name").textContent = this._name;

    return this._card;
  }
}
