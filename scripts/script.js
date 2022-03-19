const profileInfo = document.querySelector(".profile__info"); //find profile__info on the page
let profileName = profileInfo.querySelector(".profile__name");
let profileDescription = profileInfo.querySelector(".profile__description");
const editProfileButton = profileInfo.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editPopUp = document.querySelector(".pop-up");

const formTemplate = document.querySelector("#form").content;

const galary = document.querySelector(".galary");
const cardList = galary.querySelector(".galary__cards-list");

const initialCards = [
  {
    name: "Таганай",
    link: "https://mesto.kpreis.ru/images/taganay.jpeg",
  },
  {
    name: "Двуглавая сопка",
    link: "https://mesto.kpreis.ru/images/dvuglavaya-sopka.jpeg",
  },
  {
    name: "Откликной Гребень",
    link: "https://mesto.kpreis.ru/images/otkliknoy-greben.jpeg",
  },
  {
    name: "Круглица",
    link: "https://mesto.kpreis.ru/images/kruglitsa.webp",
  },
  {
    name: "Большая Каменная Река",
    link: "https://mesto.kpreis.ru/images/kamennaya-reka.jpeg",
  },
  {
    name: "Метеостанция",
    link: "https://mesto.kpreis.ru/images/meteostanciya-taganay.jpeg",
  },
];

function addCard(name = "", link = "") {
  const cardTemplate = document.querySelector("#card").content;
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  newCard.querySelector(".card__img").src = link;
  newCard.querySelector(".card__img").alt = name;
  newCard.querySelector(".card__name").textContent = name;
  newCard.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });
  newCard.querySelector(".card__delete").addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  return newCard;
}

function liked() {}
initialCards.forEach((element) => {
  cardList.append(addCard(element.name, element.link));
});

function saveEditData(evt) {
  evt.preventDefault();
  profileName.textContent = editPopUp.querySelector("#name-field").value;
  profileDescription.textContent =
    editPopUp.querySelector("#description-field").value;
  closeEditPopUp();
}

function openEditPopUp() {
  const editForm = formTemplate.querySelector(".form").cloneNode(true);
  editForm.querySelector(".form__header").textContent = "Редактировать профиль";

  const editNameField = editForm.querySelectorAll(".form__item")[0];
  editNameField.value = profileName.textContent;
  editNameField.id = "name-field";
  editNameField.name = "profileName";

  const editDescriptionField = editForm.querySelectorAll(".form__item")[1];
  editDescriptionField.value = profileDescription.textContent;
  editDescriptionField.id = "description-field";
  editDescriptionField.name = "profileDescription";

  const closeButtonPopUp = editForm.querySelector(".form__close-button");
  closeButtonPopUp.addEventListener("click", closeEditPopUp);

  editPopUp.querySelector(".pop-up__form").append(editForm);
  editPopUp.classList.add("pop-up_opened");
  editPopUp.addEventListener("submit", saveEditData, false);
}

function addNewCard(evt) {
  evt.preventDefault();
  const name = editPopUp.querySelector("#name-field").value;
  const link = editPopUp.querySelector("#link-field").value;
  cardList.prepend(addCard(name, link));
  closeEditPopUp();
}

function openAddCardPopUp() {
  const editForm = formTemplate.querySelector(".form").cloneNode(true);
  editForm.querySelector(".form__header").textContent = "Новое место";

  const nameField = editForm.querySelectorAll(".form__item")[0];
  nameField.value = "";
  nameField.placeholder = "Название";
  nameField.id = "name-field";
  nameField.name = "name";

  const linkField = editForm.querySelectorAll(".form__item")[1];
  linkField.value = "";
  linkField.placeholder = "Ссылка на картинку";
  linkField.id = "link-field";
  linkField.name = "link";

  const closeButtonPopUp = editForm.querySelector(".form__close-button");
  closeButtonPopUp.addEventListener("click", closeEditPopUp);

  editPopUp.querySelector(".pop-up__form").append(editForm);
  editPopUp.classList.add("pop-up_opened");
  editPopUp.addEventListener("submit", addNewCard, false);
}

function closeEditPopUp() {
  editPopUp.querySelector(".form").remove();
  editPopUp.classList.remove("pop-up_opened");
}

editProfileButton.addEventListener("click", openEditPopUp);
addCardButton.addEventListener("click", openAddCardPopUp);
