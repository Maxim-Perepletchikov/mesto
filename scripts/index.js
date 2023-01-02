import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cardsData, obj } from "./data.js";

// Popups
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type-edit");
const popupAdd = document.querySelector(".popup_type-add");
const popupImage = document.querySelector(".popup_type-image");

// Кнопки закрытия popup
const buttonCloseList = document.querySelectorAll(".popup__close-button");

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
const popupImageCaption = popupImage.querySelector(".popup__image-title");
const popupImageFull = popupImage.querySelector(".popup__image");

// Gallery
const gallery = document.querySelector(".gallery");

// Экземпляры класса FormValidator
const formValidProfile = new FormValidator(obj, formProfile);
const formValidAddCard = new FormValidator(obj, formAddCard);

// Функция закрытия popup по Escape
const handleEscButton = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// Функция открытия popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");

  document.addEventListener("keyup", handleEscButton);
};

// Функция сохранения профиля
const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEdit);
};

// Функция закрытия popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEscButton);
};

const handleImageClick = (title, path) => {
  popupImageFull.src = path;
  popupImageFull.alt = title;
  popupImageCaption.textContent = title;
  openPopup(popupImage);
};

// Функция добавления карточки
const renderCard = (data) => {
  const card = new Card(data, "#card-template", handleImageClick);
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

// Слушатель формы для добавления карточки
formAddCard.addEventListener("submit", formImageSubmitHandler);

// Слушатель кнопки добавить изображение
popupAddButton.addEventListener("click", () => {
  formAddCard.reset();
  formValidAddCard.resetValidation(true);
  openPopup(popupAdd);
});

// Слушатель кнопки редактирования профиля
popupEditButton.addEventListener("click", () => {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
  formValidProfile.resetValidation(false);
  openPopup(popupEdit);
});

// Слушатель формы на отправку данных профиля
formProfile.addEventListener("submit", handleFormSubmitProfile);

// Слушатели кнопки закрытия popup
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

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
