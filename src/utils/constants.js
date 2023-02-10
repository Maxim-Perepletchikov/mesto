export const optionsApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
    "Content-Type": "application/json",
  },
};

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
export const popupAvatarProf = document.querySelector(".popup_type-avatar");

// Profile
export const popupEditButton = document.querySelector(".profile__edit");
export const popupAvatarProfile = document.querySelector(".profile__avatar");
export const popupAddButton = document.querySelector(".profile__add-button");

// Form profile
export const formProfile = popupEdit.querySelector(".form");
export const formAvatar = popupAvatarProf.querySelector(".form");
export const nameInput = formProfile.querySelector("#name-input");
export const jobInput = formProfile.querySelector("#job-input");
// Form add card
export const formAddCard = popupAdd.querySelector(".form");

// Gallery
export const cardListSelector = ".gallery";
