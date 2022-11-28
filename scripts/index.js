// import cardsData from "./cardsArray.js";

// Popups
const popupEdit = document.querySelector(".popup_type-edit");
const popupAdd = document.querySelector(".popup_type-add");
const popupImage = document.querySelector(".popup_type-image");
const popupFullImage = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

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
const nameInput = formProfile.querySelector("#nameInput");
const jobInput = formProfile.querySelector("#jobInput");
// Form add card
const formAddCard = popupAdd.querySelector(".form");
const cardTitle = popupAdd.querySelector("#cardTitle");
const pathImage = popupAdd.querySelector("#pathImage");
const closeButtonAddCard = popupAdd.querySelector(".form__close-button");

// Gallery
const gallery = document.querySelector(".gallery");

// Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Функция открытия popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
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
};

// Функция создания карточки
const createCard = ({ cardName, path }) => {
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".card__image");

  cardImage.src = path;
  cardImage.alt = cardName;
  card.querySelector(".card__title").textContent = cardName;

  card.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  cardImage.addEventListener("click", () => {
    openPopup(popupImage);
    popupFullImage.src = path;
    popupFullImage.alt = cardName;
    popupImageTitle.textContent = cardName;
  });

  card.querySelector(".card__delete-button").addEventListener("click", () => {
    card.remove();
  });

  return card;
};

// Функция добавления карточки
const renderCard = (data) => {
  const card = createCard(data);
  gallery.prepend(card);
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

const cardsData = [
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

// Создание 6 начальных карточек
cardsData.forEach(renderCard);

popupCloseImage.addEventListener("click", () => closePopup(popupImage));

// Слушатель формы для добавления карточки
formAddCard.addEventListener("submit", formImageSubmitHandler);

// Слушатель кнопки добавить изображение
popupAddButton.addEventListener("click", () => {
  cardTitle.value = "";
  pathImage.value = "";
  openPopup(popupAdd);
});

closeButtonAddCard.addEventListener("click", () => {
  closePopup(popupAdd);
});

// Слушатель кнопки редактирования профиля
popupEditButton.addEventListener("click", () => {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEdit);
});

// Слушатель кнопки закрытия popup
popupCloseButtonEdit.addEventListener("click", () => closePopup(popupEdit));

// Слушатель формы на отправку данных профиля
formProfile.addEventListener("submit", formSubmitHandlerProfile);
