// Popup
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(
  ".form__close-button"
);

// Profile
const profileTitleName = document.querySelector(".profile__title-name");
const profileProfession = document.querySelector(".profile__profession");
const popupEditButtonElement = document.querySelector(".profile__edit");
const popupAddButtonElement = document.querySelector(".profile__add-button");

// Form
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector("#nameInput");
const jobInput = formElement.querySelector("#jobInput");

// Clone popup
const footer = document.querySelector(".footer");
const popup2 = popupElement.cloneNode(true);
const formImage = popup2.querySelector(".form");
popup2.querySelector(".form__title").textContent = "Новое место";
const nameInput2 = popup2.querySelector("#nameInput");
const jobInput2 = popup2.querySelector("#jobInput");
popup2.querySelector(".form__save-button").textContent = "Создать";
popup2.querySelector(".form__close-button").addEventListener("click", () => {
  closePopup(popup2);
});
footer.after(popup2);

// Gallery
const gallery = document.querySelector(".gallery");

// Функция открытия popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

// Функция сохранения профиля
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupElement);
};

// Функция закрытия popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

// Функция создания карточки
const createCard = (cardName, path, des) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = path;
  cardElement.querySelector(".card__image").alt = des;
  cardElement.querySelector(".card__title").textContent = cardName;

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  gallery.prepend(cardElement);
};

// Функция добавления карточки
const formSubmitHandlerImage = (evt) => {
  evt.preventDefault();

  createCard(nameInput2.value, jobInput2.value, nameInput2.value);

  closePopup(popup2);
};

const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Создание 6 начальных карточек
cards.forEach((item) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  gallery.prepend(cardElement);
});

// Слушатель формы для добавления карточки
formImage.addEventListener("submit", formSubmitHandlerImage);

// Слушатель кнопки добавить изображение
popupAddButtonElement.addEventListener("click", () => {
  nameInput2.value = "Название";
  jobInput2.value = "Ссылка на картинку";
  openPopup(popup2);
});

// Слушатель кнопки редактирования
popupEditButtonElement.addEventListener("click", () => {
  openPopup(popupElement);
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
});

// Слушатель кнопки закрытия popup
popupCloseButtonElement.addEventListener("click", () =>
  closePopup(popupElement)
);

// Слушатель формы на отправку данных профиля
formElement.addEventListener("submit", formSubmitHandler);
