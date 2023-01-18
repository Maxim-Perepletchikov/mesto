import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cardsData, obj } from "./data.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const userInfo = new UserInfo('.profile__title-name', '.profile__profession')
console.log(userInfo.getUserInfo());

const popupForImage = new PopupWithImage(".popup_type-image");




popupForImage.setEventListeners();

// Popups
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type-edit");
const popupAdd = document.querySelector(".popup_type-add");
const popupImage = document.querySelector(".popup_type-image");

// Кнопки закрытия popup
// const buttonCloseList = document.querySelectorAll(".popup__close-button");

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
// const gallery = document.querySelector(".gallery");
const cardListSelector = ".gallery";

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
  popupForImage.open(title, path);
};

const createCard = (data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
};

// Экземпляр класса Section
const cardList = new Section(
  {
    items: cardsData,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  cardListSelector
);

// Отрисовка начальных карточек
cardList.renderItems();

const popupAddCard = new PopupWithForm(".popup_type-add", {
  handleSubmitForm: ({title_input, path_input}) => {
    const card = createCard({
      cardName: title_input,
      path: path_input
    })
    cardList.addItemPrep(card);
  },
});
popupAddCard.setEventListeners();

const popupEditProf = new PopupWithForm(".popup_type-edit", {
  handleSubmitForm: ({name_input, job_input}) => {
    userInfo.setUserInfo({
      userName: name_input,
      about: job_input
    })
  }
});
popupEditProf.setEventListeners();

// Функция для отправки формы для карточки
const handleFormSubmitImage = (evt) => {
  evt.preventDefault();

  const card = {
    cardName: cardTitle.value,
    path: pathImage.value,
  };

  renderCard(card);
  closePopup(popupAdd);
};

// Слушатель формы для добавления карточки
// formAddCard.addEventListener("submit", handleFormSubmitImage);

// Слушатель кнопки добавить изображение
popupAddButton.addEventListener("click", () => {
  formValidAddCard.resetValidation(true);
  popupAddCard.open();
});

// Слушатель кнопки редактирования профиля
popupEditButton.addEventListener("click", () => {
  // nameInput.value = profileTitleName.textContent;
  // jobInput.value = profileProfession.textContent;
  formValidProfile.resetValidation(false);
  // openPopup(popupEdit);
  popupEditProf.open()
});

// Слушатель формы на отправку данных профиля
formProfile.addEventListener("submit", handleFormSubmitProfile);

formValidProfile.enableValidation();
formValidAddCard.enableValidation();
