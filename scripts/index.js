// Popups
const popupEditElement = document.querySelector(".popup_type-edit");
const popupAddElement = document.querySelector(".popup_type-add");
const popupImageElement = document.querySelector(".popup_type-image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");

// Кнопка закрытия popup
const popupCloseImageElement = popupImageElement.querySelector(
  ".popup__close-button"
);
const popupCloseButtonElement = popupEditElement.querySelector(
  ".form__close-button"
);

// Profile
const profileTitleName = document.querySelector(".profile__title-name");
const profileProfession = document.querySelector(".profile__profession");
const popupEditButtonElement = document.querySelector(".profile__edit");
const popupAddButtonElement = document.querySelector(".profile__add-button");

// Form profile
const formProfileElement = popupEditElement.querySelector(".form");
const nameInput = formProfileElement.querySelector("#nameInput");
const jobInput = formProfileElement.querySelector("#jobInput");
// Form add card
const formAddCardElement = popupAddElement.querySelector(".form");
const cardTitle = popupAddElement.querySelector("#cardTitle");
const pathImage = popupAddElement.querySelector("#pathImage");
const closeButtonAddCard = popupAddElement.querySelector(".form__close-button");

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
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEditElement);
};

// Функция закрытия popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

// Функция создания карточки
const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.path;
  cardImage.alt = data.cardName;
  cardElement.querySelector(".card__title").textContent = data.cardName;

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  cardImage.addEventListener("click", () => {
    openPopup(popupImageElement);
    popupImage.src = data.path;
    popupImage.alt = data.cardName;
    popupImageTitle.textContent = data.cardName;
  });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });

  return cardElement;
};

// Функция добавления карточки
const renderCard = (data) => {
  const card = createCard(data);
  gallery.prepend(card);
};

// Функция для отправки формы для карточки
const formSubmitHandlerImage = (evt) => {
  evt.preventDefault();

  const card = {
    cardName: cardTitle.value,
    path: pathImage.value,
  };

  renderCard(card);
  closePopup(popupAddElement);
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
cardsData.forEach((item) => {
  renderCard(item);
});

popupCloseImageElement.addEventListener("click", () =>
  closePopup(popupImageElement)
);

// Слушатель формы для добавления карточки
formAddCardElement.addEventListener("submit", formSubmitHandlerImage);

// Слушатель кнопки добавить изображение
popupAddButtonElement.addEventListener("click", () => {
  cardTitle.value = "Название";
  pathImage.value = "Ссылка на картинку";
  openPopup(popupAddElement);
});

closeButtonAddCard.addEventListener("click", () => {
  closePopup(popupAddElement);
});

// Слушатель кнопки редактирования профиля
popupEditButtonElement.addEventListener("click", () => {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEditElement);
});

// Слушатель кнопки закрытия popup
popupCloseButtonElement.addEventListener("click", () =>
  closePopup(popupEditElement)
);

// Слушатель формы на отправку данных профиля
formProfileElement.addEventListener("submit", formSubmitHandler);
