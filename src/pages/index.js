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

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.appendItem(createCard(item));
    },
  },
  '.galary__cards-list'
);

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
    personalProfile.setUserInfo(userData);
    personalProfile.setAvatar(userData['avatar']);
    userID = userData['_id'];

    cardList.renderItems(cards);
  })
  .catch((error) => {
    console.log(error);
  });

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
      isCreator: userID == data['owner']['_id'],
      currentUserId: userID,
      handleDeleteCardClick: (cardDeleteId, cardDelete) => {
        popupConfirmDeleteCard.open(cardDeleteId, cardDelete);
      },
      setLike: (cardId) => {
        return api.setLike(cardId).then((result) => {
          return result['likes'].length;
        });
      },
      deleteLike: (cardId) => {
        return api.deleteLike(cardId).then((result) => {
          return result['likes'].length;
        });
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
    changeTextOnSaveButton(profilePopup);
    api
      .setProfile(formData)
      .then((result) => {
        personalProfile.setUserInfo(result);
      })
      .then(() => {
        popupEditProfilePopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        changeTextOnSaveButton(profilePopup);
      });
  }
);
popupEditProfilePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm('#avatarUpdatePopup', (data) => {
  changeTextOnSaveButton(avatarPopup);
  api
    .setAvatar(data['link'])
    .then((result) => {
      personalProfile.setAvatar(result['avatar']);
    })
    .then(() => {
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      changeTextOnSaveButton(avatarPopup);
    });
});
popupEditAvatar.setEventListeners();

const popupImage = new PopupWithImage('#imagePopup');
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('#cardAddPopup', (formData) => {
  changeTextOnSaveButton(cardAddPopup);
  api
    .sendNewCard(formData)
    .then((result) => {
      cardList.addItem(createCard(result));
    })
    .then(() => {
      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      changeTextOnSaveButton(cardAddPopup);
    });
});
popupAddCard.setEventListeners();

const popupConfirmDeleteCard = new PopupWithConfirmation(
  '#cardConfirmDeletePopup',
  (cardId, card) => {
    api
      .deleteCard(cardId)
      .then((result) => {
        if (result['message'] === 'Пост удалён') {
          popupConfirmDeleteCard.close();
          card.remove();
        }
      })
      .catch((error) => {
        console.error(error);
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
