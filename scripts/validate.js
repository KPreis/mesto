//Show error message
const showInputError = (formElement, inputItem, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
  const buttonSave = formElement.querySelector(".form__save-button");

  buttonSave.classList.add("form__save-button_disabled");
  inputItem.classList.add("form__item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__item-error_active");
};

//Hide error message
const hideInputError = (formElement, inputItem) => {
  const errorElement = formElement.querySelector(`.${inputItem.id}-error`);

  inputItem.classList.remove("form__item_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__item-error_active");
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
    buttonElement.classList.add("form__save-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__save-button_disabled");
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
    formElement.querySelectorAll(".form__item")
  );
  const buttonSave = formElement.querySelector(".form__save-button");

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

const enableValidationForm = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidationForm();
