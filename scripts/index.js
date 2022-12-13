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
const nameInput = formProfile.querySelector("#name-input");
const jobInput = formProfile.querySelector("#job-input");
// Form add card
const formAddCard = popupAdd.querySelector(".form");
const cardTitle = popupAdd.querySelector("#title-input");
const pathImage = popupAdd.querySelector("#path-input");
const closeButtonAddCard = popupAdd.querySelector(".form__close-button");

// Gallery
const gallery = document.querySelector(".gallery");

// Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Функция закрытия popup по Escape
const handlerKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
};

// Функция открытия popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");

  document.addEventListener("keyup", handlerKeyUp);
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
  document.removeEventListener("keyup", handlerKeyUp);
};

// Функция закрытия popup по клюку
const closeClickPopup = (popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
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
    closeClickPopup(popupImage);
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

// Создание 6 начальных карточек
cardsData.forEach(renderCard);

popupCloseImage.addEventListener("click", () => closePopup(popupImage));

// Слушатель формы для добавления карточки
formAddCard.addEventListener("submit", formImageSubmitHandler);

// Слушатель кнопки добавить изображение
popupAddButton.addEventListener("click", () => {
  cardTitle.value = "";
  pathImage.value = "";
  const formSaveButton = popupAdd.querySelector(".form__save-button");
  formSaveButton.classList.add("form__save-button_disabled");
  formSaveButton.disabled = true;
  openPopup(popupAdd);
  closeClickPopup(popupAdd);
});

closeButtonAddCard.addEventListener("click", () => {
  closePopup(popupAdd);
});

// Слушатель кнопки редактирования профиля
popupEditButton.addEventListener("click", () => {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
  const formSaveButton = popupEdit.querySelector(".form__save-button");
  formSaveButton.classList.remove("form__save-button_disabled");
  formSaveButton.disabled = false;
  openPopup(popupEdit);
  closeClickPopup(popupEdit);
});

// Слушатель кнопки закрытия popup
popupCloseButtonEdit.addEventListener("click", () => closePopup(popupEdit));

// Слушатель формы на отправку данных профиля
formProfile.addEventListener("submit", formSubmitHandlerProfile);
