import {
  validationConfig,
  popupEditButton,
  popupAddButton,
  formProfile,
  formAvatar,
  nameInput,
  jobInput,
  formAddCard,
  cardListSelector,
  popupAvatarProfile,
  options,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

// Экземпляры класса FormValidator
const formValidProfile = new FormValidator(validationConfig, formProfile);
const formValidAddCard = new FormValidator(validationConfig, formAddCard);
const formValidAvatar = new FormValidator(validationConfig, formAvatar);

// Экземпляр класса для управления данныи профиля
const userInfo = new UserInfo({
  userNameSelector: ".profile__title-name",
  aboutSelector: ".profile__profession",
});

const api = new Api(options);

// Создание карточки
const createCard = (data) => {
  const card = new Card(data, "#card-template", {
    handleImageClick,
    handleLikeClick: () => {
      api
        .setLike(data._id)
        .then((res) => card.setCounterLikes(res.likes.length));
    },
    handleDeleteLikeClick: () => {
      api
        .deleteLike(data._id)
        .then((res) => card.setCounterLikes(res.likes.length));
    },
    handleDeleteCard: () => {
      popupDeleteCard.open();
      popupDeleteCard.submit(() => {
        api.deleteCard(data._id).then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        });
      });
    },
  });
  return card.generateCard();
};

// Функция для показа полноразмерной картинки
const handleImageClick = (title, path) => {
  popupForImage.open(title, path);
};

// Экземпляр класса для вставки элемента
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
    cardsSection.renderItems(res, userInfo);
  }
);

// api.getInfoProfile().then((info) => userInfo.setUserInfo(info));
// api.getInitialCards().then((res) => cardsSection.renderItems(res));

// Экземпляр класса для добавления новой карточки из формы
const popupAddCard = new PopupWithForm(".popup_type-add", {
  handleSubmitForm: ({ titleInput, pathInput }) => {
    popupAddCard.renderLoading(true);
    api
      .setCard({ name: titleInput, link: pathInput })
      .then((cardInfo) => {
        const card = createCard({...cardInfo, owner: userInfo.id});
        cardsSection.addItemPrep(card);
        popupAddCard.close();
      })
      .catch(console.log)
      .finally(() => popupAddCard.renderLoading(false));
  },
});
popupAddCard.setEventListeners();

// Экземпляр класса для редактирования профиля
const popupEditProf = new PopupWithForm(".popup_type-edit", {
  handleSubmitForm: ({ titleNameInput, aboutInput }) => {
    popupEditProf.renderLoading(true)
    api
      .setInfoProfile({ name: titleNameInput, about: aboutInput })
      .then((user) => {
        userInfo.setUserInfo(user);
        popupEditProf.close();
      })
      .catch(console.log)
      .finally(() => popupEditProf.renderLoading(false))
  },
});
popupEditProf.setEventListeners();

// Экземпляр класса для редактирования аватарки
const popupAvatar = new PopupWithForm(".popup_type-avatar", {
  handleSubmitForm: ({ pathAvatar }) => {
    popupAvatar.renderLoading(true)
    api
      .setAvatar({ avatar: pathAvatar })
      .then((user) => {
        userInfo.setUserInfo(user);
        popupAvatar.close();
      })
      .catch(console.log)
      .finally(() => popupAvatar.renderLoading(false))
  },
});
popupAvatar.setEventListeners();

// Экземпляр класса для открытия попапа с картинкой
const popupForImage = new PopupWithImage(".popup_type-image");
popupForImage.setEventListeners();

// Экземпляр класса для подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation(".popup_delete-card");
popupDeleteCard.setEventListeners();

// Слушатель кнопки сменить аватарку
popupAvatarProfile.addEventListener("click", () => {
  formValidAvatar.resetValidation(true);
  popupAvatar.open();
});

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
formValidAvatar.enableValidation();
