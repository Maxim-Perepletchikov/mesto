import {
  cardsData,
  validationConfig,
  popupEditButton,
  popupAddButton,
  formProfile,
  nameInput,
  jobInput,
  formAddCard,
  cardListSelector,
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

const api = new Api();

// Создание карточки
const createCard = (data) => {
  const card = new Card(data, "#card-template", {
    handleImageClick,
    handleLikeClick: () => {
      api
        .setLike(data._id)
        .then((res) =>
          card.setCounterLikes(res.likes.length));
    },
    handleDeleteLikeClick: () => {
      api.deleteLike(data._id)
        .then(res =>
          card.setCounterLikes(res.likes.length))
    }
  });
  return card.generateCard();
};

// Функция для показа полноразмерной картинки
const handleImageClick = (title, path) => {
  popupForImage.open(title, path);
};

//
const cardsSection = new Section(
  {
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  cardListSelector
);

Promise.all([api.getInfoProfile(), api.getInitialCards()]).then(
  ([info, res]) => {
    userInfo.setUserInfo(info);
    cardsSection.renderItems(res);
  }
);
// |
// v

// api.getInfoProfile().then((info) => userInfo.setUserInfo(info));
// api.getInitialCards().then((res) => cardsSection.renderItems(res));

// Экземпляр класса для добавления новой карточки из формы
const popupAddCard = new PopupWithForm(".popup_type-add", {
  handleSubmitForm: ({ titleInput, pathInput }) => {
    api
      .setCard({ name: titleInput, link: pathInput })
      .then((cardInfo) => {
        const card = createCard(cardInfo);
        cardsSection.addItemPrep(card);
        popupAddCard.close();
      })
      .catch(console.log);
  },
});
popupAddCard.setEventListeners();

// Экземпляр класса для редактирования профиля
const popupEditProf = new PopupWithForm(".popup_type-edit", {
  handleSubmitForm: ({ titleNameInput, aboutInput }) => {
    api
      .setInfoProfile({ name: titleNameInput, about: aboutInput })
      .then((user) => {
        userInfo.setUserInfo(user);
        popupEditProf.close();
      })
      .catch(console.log);
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
