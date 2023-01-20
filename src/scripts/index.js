import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cardsData, obj } from "./data.js";
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
const formValidProfile = new FormValidator(obj, formProfile);
const formValidAddCard = new FormValidator(obj, formAddCard);

// Экземпляр класса для управления данныи профиля
const userInfo = new UserInfo({
  userName: ".profile__title-name",
  about: ".profile__profession",
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

// Экземпляр класса для добавления новой карточки из формы
const popupAddCard = new PopupWithForm(".popup_type-add", {
  handleSubmitForm: ({ title_input, path_input }) => {
    const card = createCard({
      cardName: title_input,
      path: path_input,
    });
    cardList.addItemPrep(card);
  },
});
popupAddCard.setEventListeners();

// Экземпляр класса для редактирования профиля
const popupEditProf = new PopupWithForm(".popup_type-edit", {
  handleSubmitForm: ({ name_input, job_input }) => {
    userInfo.setUserInfo({
      userName: name_input,
      about: job_input,
    });
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
