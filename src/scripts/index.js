import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cardsData, validationConfig } from "./data.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import '../pages/index.css'

// Popups
const popupEdit = document.querySelector(".popup_type-edit");
const popupAdd = document.querySelector(".popup_type-add");

// Profile
const popupEditButton = document.querySelector(".profile__edit");
const popupAddButton = document.querySelector(".profile__add-button");

// Form profile
const formProfile = popupEdit.querySelector(".form");
const nameInput = formProfile.querySelector("#name-input");
const jobInput = formProfile.querySelector("#job-input");
// Form add card
const formAddCard = popupAdd.querySelector(".form");

// Gallery
const cardListSelector = ".gallery";

// Экземпляры класса FormValidator
const formValidProfile = new FormValidator(validationConfig, formProfile);
const formValidAddCard = new FormValidator(validationConfig, formAddCard);

// Экземпляр класса для управления данныи профиля
const userInfo = new UserInfo({
  userNameSelector: ".profile__title-name",
  aboutSelector: ".profile__profession",
});

// Создание карточки
const createCard = (data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
};

// Функция для показа полноразмерной картинки
const handleImageClick = (title, path) => {
  popupForImage.open(title, path);
};

// Экземпляр класса Section для вставки элементов
const cardsSection = new Section(
  {
    items: cardsData,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  cardListSelector
);
// Отрисовка начальных карточек
cardsSection.renderItems();

// Экземпляр класса для добавления новой карточки из формы
const popupAddCard = new PopupWithForm(".popup_type-add", {
  handleSubmitForm: ({ titleInput, pathInput }) => {
    const card = createCard({
      cardName: titleInput,
      path: pathInput,
    });
    cardsSection.addItemPrep(card);
    popupAddCard.close()
  },
});
popupAddCard.setEventListeners();

// Экземпляр класса для редактирования профиля
const popupEditProf = new PopupWithForm(".popup_type-edit", {
  handleSubmitForm: ({ titleNameInput, aboutInput }) => {
    userInfo.setUserInfo({
      userName: titleNameInput,
      about: aboutInput,
    });
    popupEditProf.close()
  },
});
popupEditProf.setEventListeners();

// Экземпляр класса для открытия попапа с картинкой
const popupForImage = new PopupWithImage(".popup_type-image");
popupForImage.setEventListeners();

// Слушатель кнопки добавить карточку
popupAddButton.addEventListener("click", () => {
  formValidAddCard.resetValidation(true);
  popupAddCard.open();
});

// Слушатель кнопки редактирования профиля
popupEditButton.addEventListener("click", () => {
  const { userName, about } = userInfo.getUserInfo();
  nameInput.value = userName;
  jobInput.value = about;
  formValidProfile.resetValidation(false);
  popupEditProf.open();
});

// Включение валидации форм
formValidProfile.enableValidation();
formValidAddCard.enableValidation();
