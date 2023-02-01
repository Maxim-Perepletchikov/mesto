import {
  cardsData,
  validationConfig,
  popupEditButton,
  popupAddButton,
  formProfile,
  nameInput,
  jobInput,
  formAddCard,
  cardListSelector
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";

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

const api = new Api()

const cardsSection = new Section(
  {
    // items: cardsData,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  cardListSelector
);

api.getInitialCards().then(res => cardsSection.renderItems(res))


// Экземпляр класса для добавления новой карточки из формы
const popupAddCard = new PopupWithForm(".popup_type-add", {
  handleSubmitForm: ({ titleInput, pathInput }) => {
    const card = createCard({
      name: titleInput,
      link: pathInput,
    });
    cardsSection.addItemPrep(card);
    popupAddCard.close();
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
    popupEditProf.close();
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


// fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
//   headers: {
//     authorization: '30812f22-45b0-4eb1-a698-1f92d9f66ac5'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// });


fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
  headers: {
    authorization: '30812f22-45b0-4eb1-a698-1f92d9f66ac5'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });


