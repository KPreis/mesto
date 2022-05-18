import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/consts.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const galary = document.querySelector('.galary');
const cardsContainer = galary.querySelector('.galary__cards-list');

const profilePopup = document.querySelector('#profileEditPopup');
const cardAddPopup = document.querySelector('#cardAddPopup');

const validatorProfilePopup = new FormValidator(validationConfig, profilePopup);

const validatorCardAddPopup = new FormValidator(validationConfig, cardAddPopup);

const personalProfile = new UserInfo('.profile__name', '.profile__description');

const popupEditProfilePopup = new PopupWithForm(
  '#profileEditPopup',
  (formData) => {
    personalProfile.setUserInfo(formData);
  }
);
popupEditProfilePopup.setEventListeners();

const popupImage = new PopupWithImage('#imagePopup');
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('#cardAddPopup', (formData) => {
  const card = new Card(
    {
      data: formData,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
    },
    '#card'
  );
  const newCard = card.createCard();
  cardList.addItem(newCard);
});
popupAddCard.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (name, link) => {
            popupImage.open(name, link);
          },
        },
        '#card'
      );
      const newCard = card.createCard();
      cardsContainer.append(newCard);
    },
  },
  '.galary__cards-list'
);

cardList.renderItems();

function saveProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = fieldNamePopup.value;
  profileDescription.textContent = fieldDescriptionPopup.value;

  closePopup(profilePopup);
  validatorProfilePopup.resetValidation();
}

cardAddButton.addEventListener('click', () => {
  validatorCardAddPopup.enableValidation();
  popupAddCard.open();
});

profileEditButton.addEventListener('click', () => {
  validatorProfilePopup.enableValidation();
  popupEditProfilePopup.open();
  popupEditProfilePopup.setInputValues();
});
