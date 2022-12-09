// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form__input-error");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  formError.textContent = "";
  formError.classList.remove("form__input-error");
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция, которая добавит обработчики сразу всем полям формы
const setEventListeners = (formElement) => {
  const inputList = [...formElement.querySelectorAll(".form__input")];

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
    });
  });
};

// Функцию, которая найдёт и переберёт все формы на странице
const enableValidation = () => {
  const formList = [...document.querySelectorAll(".form")];

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
