const profileInfo = document.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');

const editPopUp = document.querySelector('.pop-up');
const closeButtonPopUp = editPopUp.querySelector('.pop-up__close-button');
const saveButtonPopUp = editPopUp.querySelector('.pop-up__save-button');
let editNameField = editPopUp.querySelector('.pop-up__name-field');
let editDescriptionField = editPopUp.querySelector('.pop-up__description-field');

function openEditPopUp() {
  editNameField.value = profileName.outerText;
  editDescriptionField.value = profileDescription.textContent;
  editPopUp.classList.toggle('popup_opened');
}

function closeEditPopUp() {
  editPopUp.classList.toggle('popup_opened');
}

function saveEditData() {
  profileName.childNodes[0].data = editNameField.value;
  profileDescription.textContent = editDescriptionField.value;
  closeEditPopUp();
}


editProfileButton.addEventListener('click', openEditPopUp);
closeButtonPopUp.addEventListener('click', closeEditPopUp);
saveButtonPopUp.addEventListener('click', saveEditData);
