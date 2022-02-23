const profileInfo = document.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');

const editModalWindow = document.querySelector('.modal');
const closeButtonModalWindow = editModalWindow.querySelector('.modal__close-button');
const saveButtonModalWindow = editModalWindow.querySelector('.modal__save-button');
let editNameField = editModalWindow.querySelector('.modal__name-field');
let editDescriptionField = editModalWindow.querySelector('.modal__description-field');

function openEditModal() {
  editNameField.value = profileName.outerText;
  editDescriptionField.value = profileDescription.textContent;
  editModalWindow.setAttribute('style', 'display: flex');
}

function closeEditModal() {
  editModalWindow.setAttribute('style', 'display: none');
}

function saveEditData() {
  profileName.childNodes[0].data = editNameField.value;
  profileDescription.textContent = editDescriptionField.value;
  closeEditModal();
  console.dir(editProfileButton);
}


editProfileButton.addEventListener('click', openEditModal);
closeButtonModalWindow.addEventListener('click', closeEditModal);
saveButtonModalWindow.addEventListener('click', saveEditData);
