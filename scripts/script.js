
const profileInfo = document.querySelector('.profile__info'); //find profile__info on the page
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');

const editPopUp = document.querySelector('.pop-up'); 
const closeButtonPopUp = editPopUp.querySelector('.edit-form__close-button');
let editNameField = editPopUp.querySelector('#name-field');
let editDescriptionField = editPopUp.querySelector('#description-field');

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
