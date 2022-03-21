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

const cardAddPopup = document.querySelector("#cardAddPopup");
const imagePopup = document.querySelector("#imagePopup");

const galary = document.querySelector(".galary");
const cardList = galary.querySelector(".galary__cards-list");

const cardTemplate = document.querySelector("#card").content;

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

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
}

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
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
    const imageFigure = imagePopup.querySelector(".pop-up__image");
    imageFigure.src = evt.target.src;
    imageFigure.alt = evt.target.alt;
    imagePopup.querySelector(".pop-up__label").textContent = evt.target.alt;
    openPopup(imagePopup);
    const buttonClose = imagePopup.querySelector(".pop-up__close-button");
    buttonClose.addEventListener("click", (event) => {
      closePopup(event.target.closest(".pop-up"));
    });
  });
  return newCard;
}

initialCards.forEach((element) => {
  cardList.append(addCard(element.name, element.link));
});

function saveProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = fieldNamePopup.value;
  profileDescription.textContent = fieldDescriptionPopup.value;

  closePopup(evt.target.closest(".pop-up"));
}

function addNewCard(evt) {
  evt.preventDefault();

  const name = evt.target.querySelector("#cardNameField").value;
  const link = evt.target.querySelector("#cardLinkField").value;

  cardList.prepend(addCard(name, link));

  closePopup(evt.target.closest(".pop-up"));
}

profileEditButton.addEventListener("click", () => {
  fieldNamePopup.value = profileName.textContent;
  fieldDescriptionPopup.value = profileDescription.textContent;

  openPopup(profilePopup);

  profilePopup.addEventListener("submit", saveProfileData, false);
  const buttonClose = profilePopup.querySelector(".pop-up__close-button");
  buttonClose.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".pop-up"));
  });
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);

  cardAddPopup.addEventListener("submit", addNewCard, false);
  const buttonClose = cardAddPopup.querySelector(".pop-up__close-button");
  buttonClose.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".pop-up"));
  });
});
