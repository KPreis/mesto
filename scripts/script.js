/**
 * File: script.js
 *
 * Copyright:
 * Copyright 2022-2022. Konstantin Preis. All Rights Reserved.
 *
 */


const profileInfo = document.querySelector('.profile__info'); //find profile__info on the page
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');

const editPopUp = document.querySelector('.pop-up'); 
const closeButtonPopUp = editPopUp.querySelector('.pop-up__close-button');
let editNameField = editPopUp.querySelector('.pop-up__name-field');
let editDescriptionField = editPopUp.querySelector('.pop-up__description-field');

function openEditPopUp() {
  editNameField.value = profileName.textContent;
  editDescriptionField.value = profileDescription.textContent;
  editPopUp.classList.add('popup_opened');
}

function closeEditPopUp() {
  editPopUp.classList.remove('popup_opened');
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
