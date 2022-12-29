import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cardsData, obj } from "./data.js";

// Popups
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type-edit");
const popupAdd = document.querySelector(".popup_type-add");
const popupImage = document.querySelector(".popup_type-image");

// Кнопка закрытия popup
const popupCloseImage = popupImage.querySelector(".popup__close-button");
const popupCloseButtonEdit = popupEdit.querySelector(".form__close-button");

// Profile
const profileTitleName = document.querySelector(".profile__title-name");
const profileProfession = document.querySelector(".profile__profession");
const popupEditButton = document.querySelector(".profile__edit");
const popupAddButton = document.querySelector(".profile__add-button");

// Form profile
const formProfile = popupEdit.querySelector(".form");
const nameInput = formProfile.querySelector("#name-input");
const jobInput = formProfile.querySelector("#job-input");
// Form add card
const formAddCard = popupAdd.querySelector(".form");
const cardTitle = popupAdd.querySelector("#title-input");
const pathImage = popupAdd.querySelector("#path-input");
const closeButtonAddCard = popupAdd.querySelector(".form__close-button");

// Gallery
const gallery = document.querySelector(".gallery");

// Экземпляры класса FormValidator
const formValidProfile = new FormValidator(obj, formProfile);
const formValidAddCard = new FormValidator(obj, formAddCard);

// Функция закрытия popup по Escape
const handlerKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
};

// Функция открытия popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");

  document.addEventListener("keyup", handlerKeyUp);
};

// Функция сохранения профиля
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEdit);
};

// Функция закрытия popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handlerKeyUp);
};

// Функция добавления карточки
const renderCard = (data) => {
  const card = new Card(data, "#card-template");
  gallery.prepend(card.generateCard());
};

// Функция для отправки формы для карточки
const formImageSubmitHandler = (evt) => {
  evt.preventDefault();

  const card = {
    cardName: cardTitle.value,
    path: pathImage.value,
  };

  renderCard(card);
  closePopup(popupAdd);
};

// Создание 6 начальных карточек
cardsData.forEach(renderCard);

popupCloseImage.addEventListener("click", () => closePopup(popupImage));

// Слушатель формы для добавления карточки
formAddCard.addEventListener("submit", formImageSubmitHandler);

// Слушатель кнопки добавить изображение
popupAddButton.addEventListener("click", () => {
  formAddCard.reset();
  formValidAddCard.resetValidation(formAddCard);
  const formSaveButton = popupAdd.querySelector(".form__save-button");
  formSaveButton.classList.add("form__save-button_disabled");
  formSaveButton.disabled = true;
  openPopup(popupAdd);
});

closeButtonAddCard.addEventListener("click", () => {
  closePopup(popupAdd);
});

// Слушатель кнопки редактирования профиля
popupEditButton.addEventListener("click", () => {
  formValidProfile.resetValidation(formProfile);
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
  const formSaveButton = popupEdit.querySelector(".form__save-button");
  formSaveButton.classList.remove("form__save-button_disabled");
  formSaveButton.disabled = false;
  openPopup(popupEdit);
});

// Слушатель кнопки закрытия popup
popupCloseButtonEdit.addEventListener("click", () => closePopup(popupEdit));

// Слушатель формы на отправку данных профиля
formProfile.addEventListener("submit", formSubmitHandlerProfile);

// Закрытие popup кликом мыши
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

formValidProfile.enableValidation();
formValidAddCard.enableValidation();
