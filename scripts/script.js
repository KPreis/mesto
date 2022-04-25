import { Card } from "./Card.js";

const profileInfo = document.querySelector(".profile__info"); //find profile__info on the page
const profileName = profileInfo.querySelector(".profile__name");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profileEditPopup");
const fieldNamePopup = profilePopup.querySelector("#profileNameEditField");
const fieldDescriptionPopup = profilePopup.querySelector(
  `#profileDescriptionEditField`
);
const buttonCloseEditProfile = profilePopup.querySelector(
  ".pop-up__close-button"
);

const cardAddPopup = document.querySelector("#cardAddPopup");
const cardNameField = cardAddPopup.querySelector("#cardNameField");
const cardLinkField = cardAddPopup.querySelector("#cardLinkField");
const buttonCloseAddCard = cardAddPopup.querySelector(".pop-up__close-button");
const buttonSaveAddCard = cardAddPopup.querySelector(".form__save-button");

const imagePopup = document.querySelector("#imagePopup");
const imageFigure = imagePopup.querySelector(".pop-up__image");
const imageLabel = imagePopup.querySelector(".pop-up__label");
const buttonCloseImage = imagePopup.querySelector(".pop-up__close-button");

const galary = document.querySelector(".galary");
const cardsContainer = galary.querySelector(".galary__cards-list");

const keyHandler = (evt) => {
  const popupOpened = document.querySelector(".pop-up_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
};

const clickHandler = (evt) => {
  if (evt.target.classList.contains("pop-up_opened")) {
    closePopup(evt.target);
  }
};

const clearImagePopup = () => {
  imageFigure.src = "";
  imageFigure.alt = "";
  imageLabel.textContent = "";
};

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keydown", keyHandler);
  popup.addEventListener("click", clickHandler);
}

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", keyHandler);
  popup.removeEventListener("click", clickHandler);
}

initialCards.forEach((element) => {
  const card = new Card(element);
  const newCard = card.createCard();
  cardsContainer.append(newCard);
});

function saveProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = fieldNamePopup.value;
  profileDescription.textContent = fieldDescriptionPopup.value;

  closePopup(profilePopup);
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = cardNameField.value;
  cardData.link = cardLinkField.value;

  const card = new Card(cardData);
  cardsContainer.prepend(card.createCard());

  closePopup(cardAddPopup);

  cardNameField.value = "";
  cardLinkField.value = "";
}

profileEditButton.addEventListener("click", () => {
  fieldNamePopup.value = profileName.textContent;
  fieldDescriptionPopup.value = profileDescription.textContent;

  openPopup(profilePopup);
});

profilePopup.addEventListener("submit", saveProfileData, false);

cardAddButton.addEventListener("click", () => {
  const inputItemsList = Array.from(
    cardAddPopup.querySelectorAll(selectorList.inputSelector)
  );
  changeButtonState(inputItemsList, buttonSaveAddCard);

  openPopup(cardAddPopup);
});

cardAddPopup.addEventListener("submit", addNewCard, false);

buttonCloseEditProfile.addEventListener("click", () => {
  closePopup(profilePopup);
});

buttonCloseAddCard.addEventListener("click", () => {
  closePopup(cardAddPopup);
});

buttonCloseImage.addEventListener("click", () => {
  clearImagePopup();
  closePopup(imagePopup);
});
