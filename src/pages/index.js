import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, authConfig } from '../utils/consts.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const profileInfo = document.querySelector('.profile__info');
const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const galary = document.querySelector('.galary');

const profilePopup = document.querySelector('#profileEditPopup');
const cardAddPopup = document.querySelector('#cardAddPopup');
const avatarPopup = document.querySelector('#avatarUpdatePopup');

let userID = '';

const cardList = new Section('.galary__cards-list');

const validatorProfilePopup = new FormValidator(validationConfig, profilePopup);

const validatorCardAddPopup = new FormValidator(validationConfig, cardAddPopup);

const validatorAvatarEditPopup = new FormValidator(
  validationConfig,
  avatarPopup
);

const personalProfile = new UserInfo(
  '.profile__name',
  '.profile__description',
  '.profile__avatar'
);

const changeTextOnSaveButton = (popup) => {
  const submitButton = popup.querySelector('.form__save-button');
  if (submitButton.textContent === 'Сохранить') {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
};

const api = new Api({
  baseUrl: `https:///mesto.nomoreparties.co/v1/${authConfig.cohortId}`,
  headers: {
    authorization: `${authConfig.token}`,
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, userData]) => {
    cards.forEach((card) => {
      cardList.addItem(initialCard(card));
    });
    personalProfile.setUserInfo(userData);
    personalProfile.setAvatar(userData['avatar']);
    userID = userData['_id'];
  })
  .catch((error) => {
    console.log(error);
  });

const initialCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
      isCreator: userID == data['owner']['_id'],
      currentUserId: userID,
      handleDeleteCardClick: (cardId) => {
        popupConfirmDeleteCard.open(cardId);
      },
      handleLikeClick: (cardLiking, cardData) => {
        const like = cardLiking.querySelector('.card__like');
        const likeCounter = cardLiking.querySelector('.card__like-counter');

        if (like.classList.contains('card__like_active')) {
          like.classList.remove('card__like_active');
          api.deleteLike(cardData['_id']).then((result) => {
            likeCounter.textContent = result['likes'].length;
          });
        } else {
          like.classList.add('card__like_active');
          api.setLike(cardData['_id']).then((result) => {
            likeCounter.textContent = result['likes'].length;
          });
        }
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
    api
      .setProfile(formData)
      .then((result) => {
        changeTextOnSaveButton(profilePopup);
        return result;
      })
      .then((result) => {
        personalProfile.setUserInfo(result);
      })
      .then(() => {
        popupEditProfilePopup.close();
        changeTextOnSaveButton(profilePopup);
      });
  }
);
popupEditProfilePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm('#avatarUpdatePopup', (data) => {
  api
    .setAvatar(data['link'])
    .then((result) => {
      changeTextOnSaveButton(avatarPopup);
      return result;
    })
    .then((result) => {
      personalProfile.setAvatar(result['link']);
    })
    .then(() => {
      popupEditAvatar.close();
      changeTextOnSaveButton(avatarPopup);
    });
});
popupEditAvatar.setEventListeners();

const popupImage = new PopupWithImage('#imagePopup');
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('#cardAddPopup', (formData) => {
  api
    .sendNewCard(formData)
    .then((result) => {
      changeTextOnSaveButton(cardAddPopup);
      return result;
    })
    .then((result) => {
      cardList.addItem(initialCard(result));
    })
    .then(() => {
      popupAddCard.close();
      changeTextOnSaveButton(cardAddPopup);
    });
});
popupAddCard.setEventListeners();

const popupConfirmDeleteCard = new PopupWithConfirmation(
  '#cardConfirmDeletePopup',
  (cardId) => {
    console.log(cardId);
    api.deleteCard(cardId).then((result) => {
      if (result['message'] == 'Пост удалён') {
        popupConfirmDeleteCard.close();
      }
    });
  }
);
popupConfirmDeleteCard.setEventListeners();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  validatorCardAddPopup.resetValidation();
});

profileEditButton.addEventListener('click', () => {
  popupEditProfilePopup.open();
  popupEditProfilePopup.setInputValues(personalProfile.getUserInfo());
  validatorProfilePopup.resetValidation();
});

profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  validatorAvatarEditPopup.resetValidation();
});

validatorProfilePopup.enableValidation();
validatorCardAddPopup.enableValidation();
validatorAvatarEditPopup.enableValidation();
