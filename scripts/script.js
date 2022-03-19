
const profileInfo = document.querySelector('.profile__info'); //find profile__info on the page
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');

const editPopUp = document.querySelector('.pop-up'); 
const closeButtonPopUp = editPopUp.querySelector('.edit-form__close-button');
let editNameField = editPopUp.querySelector('#name-field');
let editDescriptionField = editPopUp.querySelector('#description-field');

const galary = document.querySelector('.galary');
const cardList = galary.querySelector('.galary__cards-list');

const initialCards = [
  {
    name: 'Таганай',
    link: 'https://mesto.kpreis.ru/images/taganay.jpeg'
  },
  {
    name: 'Двуглавая сопка',
    link: 'https://mesto.kpreis.ru/images/dvuglavaya-sopka.jpeg'
  },
  {
    name: 'Откликной Гребень',
    link: 'https://mesto.kpreis.ru/images/otkliknoy-greben.jpeg'
  },
  {
    name: 'Круглица',
    link: 'https://mesto.kpreis.ru/images/kruglitsa.webp'
  },
  {
    name: 'Большая Каменная Река',
    link: 'https://mesto.kpreis.ru/images/kamennaya-reka.jpeg'
  },
  {
    name: 'Метеостанция',
    link: 'https://mesto.kpreis.ru/images/meteostanciya-taganay.jpeg'
  }
];

function addCard(name='', link='') {
  const cardTemplate = document.querySelector('#card').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__img').src = link;
  newCard.querySelector('.card__img').alt = name;
  newCard.querySelector('.card__name').textContent = name;
  return cardList.append(newCard);
}

initialCards.forEach(element => {
  addCard(element.name, element.link) 
});

function openEditPopUp() {
  editNameField.value = profileName.textContent;
  editDescriptionField.value = profileDescription.textContent;
  editPopUp.classList.add('pop-up_opened');
}

function closeEditPopUp() {
  editPopUp.classList.remove('pop-up_opened');
}

function saveEditData(evt) {
  evt.preventDefault()
  profileName.textContent = editNameField.value;
  profileDescription.textContent = editDescriptionField.value;
  closeEditPopUp();
}


editProfileButton.addEventListener('click', openEditPopUp);
closeButtonPopUp.addEventListener('click', closeEditPopUp);
editPopUp.addEventListener('submit', saveEditData, false);
