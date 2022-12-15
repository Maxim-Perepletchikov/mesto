// Функция, которая добавляет класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(errorClass);
};

const resetValidation = (popup) => {
  const inputs = popup.querySelectorAll(".form__input");
  inputs.forEach((input) => {
    const formError = popup.querySelector(`.${input.id}-error`);
    input.classList.remove("popup__input_type_error");
    formError.textContent = "";
    formError.classList.remove("form__input-error");
  });
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

// Функция, которая проверяет все поля input
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция, которая отключает и включает кнопку
const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Функция, которая добавит обработчики сразу всем полям формы
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

// Функцию, которая найдёт и переберёт все формы на странице
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = [...document.querySelectorAll(formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error",
});
