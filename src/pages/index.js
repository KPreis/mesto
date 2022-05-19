import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/consts.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const galary = document.querySelector('.galary');
const cardsContainer = galary.querySelector('.galary__cards-list');

const profilePopup = document.querySelector('#profileEditPopup');
const cardAddPopup = document.querySelector('#cardAddPopup');

const validatorProfilePopup = new FormValidator(validationConfig, profilePopup);

const validatorCardAddPopup = new FormValidator(validationConfig, cardAddPopup);

const personalProfile = new UserInfo('.profile__name', '.profile__description');

const initialCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
    },
    '#card'
  );
  const newCard = card.createCard();

  return newCard;
};

const popupEditProfilePopup = new PopupWithForm(
  '#profileEditPopup',
  (formData) => {
    personalProfile.setUserInfo(formData);
    popupEditProfilePopup.close();
  }
);
popupEditProfilePopup.setEventListeners();

const popupImage = new PopupWithImage('#imagePopup');
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('#cardAddPopup', (formData) => {
  cardList.addItem(initialCard(formData));
  popupAddCard.close();
});
popupAddCard.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsContainer.append(initialCard(item));
    },
  },
  '.galary__cards-list'
);

cardList.renderItems();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  validatorCardAddPopup.resetValidation();
});

profileEditButton.addEventListener('click', () => {
  popupEditProfilePopup.open();
  popupEditProfilePopup.setInputValues(personalProfile.getUserInfo());
  validatorProfilePopup.resetValidation();
});

validatorProfilePopup.enableValidation();
validatorCardAddPopup.enableValidation();
