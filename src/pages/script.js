import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/consts.js';
import Section from '../components/Section.js';

const profileInfo = document.querySelector('.profile__info'); //find profile__info on the page
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('#profileEditPopup');
const fieldNamePopup = profilePopup.querySelector('#profileNameEditField');
const fieldDescriptionPopup = profilePopup.querySelector(
  `#profileDescriptionEditField`
);
const buttonCloseEditProfile = profilePopup.querySelector(
  '.pop-up__close-button'
);

const cardAddPopup = document.querySelector('#cardAddPopup');
const cardNameField = cardAddPopup.querySelector('#cardNameField');
const cardLinkField = cardAddPopup.querySelector('#cardLinkField');
const buttonCloseAddCard = cardAddPopup.querySelector('.pop-up__close-button');
const buttonSaveAddCard = cardAddPopup.querySelector('.form__save-button');

const imagePopup = document.querySelector('#imagePopup');
const imageFigure = imagePopup.querySelector('.pop-up__image');
const imageLabel = imagePopup.querySelector('.pop-up__label');
const buttonCloseImage = imagePopup.querySelector('.pop-up__close-button');

const galary = document.querySelector('.galary');
const cardsContainer = galary.querySelector('.galary__cards-list');

const validatorProfilePopup = new FormValidator(validationConfig, profilePopup);

const validatorCardAddPopup = new FormValidator(validationConfig, cardAddPopup);

const keyHandler = (evt) => {
  const popupOpened = document.querySelector('.pop-up_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
};

const clickHandler = (evt) => {
  if (evt.target.classList.contains('pop-up_opened')) {
    closePopup(evt.target);
  }
};

const setImageAttributes = (name, link) => {
  imageFigure.src = link;
  imageFigure.alt = name;
  imageLabel.textContent = name;
  openPopup(imagePopup);
};

function openPopup(popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', keyHandler);
  popup.addEventListener('click', clickHandler);
}

function closePopup(popup) {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('click', clickHandler);
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card', setImageAttributes);
      const newCard = card.createCard();
      cardsContainer.append(newCard);
    },
  },
  '.galary__cards-list'
);

cardList.renderItems();

initialCards.forEach((element) => {
  const card = new Card(element, '#card', setImageAttributes);
  const newCard = card.createCard();
  cardsContainer.append(newCard);
});

function saveProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = fieldNamePopup.value;
  profileDescription.textContent = fieldDescriptionPopup.value;

  closePopup(profilePopup);
  validatorProfilePopup.resetValidation();
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameField.value,
    link: cardLinkField.value,
  };

  const card = new Card(cardData, '#card', setImageAttributes);
  cardsContainer.prepend(card.createCard());

  closePopup(cardAddPopup);

  validatorCardAddPopup.resetValidation();
  cardAddPopup.querySelector('#newCardAddForm').reset();
}

profileEditButton.addEventListener('click', () => {
  fieldNamePopup.value = profileName.textContent;
  fieldDescriptionPopup.value = profileDescription.textContent;
  validatorProfilePopup.enableValidation();
  openPopup(profilePopup);
});

profilePopup.addEventListener('submit', saveProfileData);

cardAddButton.addEventListener('click', () => {
  validatorCardAddPopup.enableValidation();
  openPopup(cardAddPopup);
});

cardAddPopup.addEventListener('submit', addNewCard, false);

buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(profilePopup);
  validatorProfilePopup.resetValidation();
});

buttonCloseAddCard.addEventListener('click', () => {
  validatorCardAddPopup.resetValidation();
  closePopup(cardAddPopup);
});

buttonCloseImage.addEventListener('click', () => {
  closePopup(imagePopup);
});
