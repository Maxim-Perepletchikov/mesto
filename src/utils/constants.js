export const cardsData = [
  {
    cardName: "Архыз",
    path: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    cardName: "Челябинская область",
    path: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    cardName: "Иваново",
    path: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    cardName: "Камчатка",
    path: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    cardName: "Холмогорский район",
    path: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    cardName: "Байкал",
    path: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error",
};

// Popups
export const popupEdit = document.querySelector(".popup_type-edit");
export const popupAdd = document.querySelector(".popup_type-add");

// Profile
export const popupEditButton = document.querySelector(".profile__edit");
export const popupAddButton = document.querySelector(".profile__add-button");

// Form profile
export const formProfile = popupEdit.querySelector(".form");
export const nameInput = formProfile.querySelector("#name-input");
export const jobInput = formProfile.querySelector("#job-input");
// Form add card
export const formAddCard = popupAdd.querySelector(".form");

// Gallery
export const cardListSelector = ".gallery";
