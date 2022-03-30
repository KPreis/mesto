const selectorList = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};

//Show error message
const showInputError = (formElement, inputItem, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
  const buttonSave = formElement.querySelector(
    selectorList.submitButtonSelector
  );

  buttonSave.classList.add(selectorList.inactiveButtonClass);
  inputItem.classList.add(selectorList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorList.errorClass);
};

//Hide error message
const hideInputError = (formElement, inputItem) => {
  const errorElement = formElement.querySelector(`.${inputItem.id}-error`);

  inputItem.classList.remove(selectorList.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectorList.errorClass);
};

//Get validity status of form's fields
const hasInvalidInput = (inputItemsList) => {
  return inputItemsList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};

//Change save button state
const changeButtonState = (inputItemsList, buttonElement) => {
  if (hasInvalidInput(inputItemsList)) {
    buttonElement.classList.add(selectorList.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectorList.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Valitating inputs of form
const isValid = (formElement, inputItem) => {
  if (!inputItem.validity.valid) {
    showInputError(formElement, inputItem, inputItem.validationMessage);
  } else {
    hideInputError(formElement, inputItem);
  }
};

const setEventListeners = (formElement) => {
  const inputItemsList = Array.from(
    formElement.querySelectorAll(selectorList.inputSelector)
  );
  const buttonSave = formElement.querySelector(
    selectorList.submitButtonSelector
  );

  if (formElement.id === "newCardAddForm") {
    changeButtonState(inputItemsList, buttonSave);
  }

  inputItemsList.forEach((inputItem) => {
    inputItem.addEventListener("input", (event) => {
      event.preventDefault();
      isValid(formElement, inputItem);
      changeButtonState(inputItemsList, buttonSave);
    });
  });
};

const enableValidationForm = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidationForm(selectorList);
