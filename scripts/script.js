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

const cardTemplate = document.querySelector("#card").content;

const keyHandler = (evt) => {
  const popupOpened = document.querySelector(".pop-up_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
    clearImagePopup();
  }
};

const clickHandler = (evt) => {
  if (evt.target.classList.contains("pop-up_opened")) {
    closePopup(evt.target);
    clearImagePopup();
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
  const inputItemsList = Array.from(
    popup.querySelectorAll(selectorList.inputSelector)
  );
  changeButtonState(inputItemsList, buttonSaveAddCard);
}

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", keyHandler);
  popup.removeEventListener("click", clickHandler);
}

function addCard(name = "", link = "") {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const imageNewCard = newCard.querySelector(".card__img");

  imageNewCard.src = link;
  imageNewCard.alt = name;
  newCard.querySelector(".card__name").textContent = name;

  newCard.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  newCard.querySelector(".card__delete").addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });

  imageNewCard.addEventListener("click", (evt) => {
    imageFigure.src = evt.target.src;
    imageFigure.alt = evt.target.alt;
    imageLabel.textContent = evt.target.alt;
    openPopup(imagePopup);
  });
  return newCard;
}

initialCards.forEach((element) => {
  cardsContainer.append(addCard(element.name, element.link));
});

function saveProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = fieldNamePopup.value;
  profileDescription.textContent = fieldDescriptionPopup.value;

  closePopup(profilePopup);
}

function addNewCard(evt) {
  evt.preventDefault();

  cardsContainer.prepend(addCard(cardNameField.value, cardLinkField.value));

  closePopup(cardAddPopup);

  cardNameField.value = "";
  cardLinkField.value = "";

  buttonSaveAddCard.classList.add("form__save-button_disabled");
}

profileEditButton.addEventListener("click", () => {
  fieldNamePopup.value = profileName.textContent;
  fieldDescriptionPopup.value = profileDescription.textContent;

  openPopup(profilePopup);
});

profilePopup.addEventListener("submit", saveProfileData, false);

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);

  cardAddPopup.addEventListener("submit", addNewCard, false);
});

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
